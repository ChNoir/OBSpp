import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import express from "express";
import open , {AppName} from "open";
import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { Credentials, OptionOAuth2Manager, TokenData } from "./type";
import { ConsoleLogger } from "../ConsoleLogger.shared";
import { PerformanceProfiler } from "../PerformanceProfiler/PerformanceProfiler.shared";
import { InitsClass } from "../InitsClass.shared";




export class OAuth2Manager  extends DOMStyleEmitter<OAuth2Manager_EventMap> {
    private credentials: Credentials;
    private tokenPath: string;
    private token?: TokenData;
    private option : OptionOAuth2Manager
    private state : string | undefined

    private status : boolean = false;
    private autoRefreshID: NodeJS.Timeout | undefined

    public  console: ConsoleLogger;
    static #I18n: I18nColdContext<OAuth2Manager_I18nMap> 


    constructor ( Option : OptionOAuth2Manager ) {
        super()
        this.credentials = JSON.parse(fs.readFileSync(Option.credentialsPath, "utf-8"));
        this.tokenPath = Option.tokenPath ?? path.resolve(__dirname, "token.json");
        this.option = Option
        this.console = ConsoleLogger.getInstance(Option.logInstanceName)
    }

    static #_init() { // Anti circular dependency
        OAuth2Manager.#I18n = I18n.createColdContext<OAuth2Manager_I18nMap>()
    }

    static { InitsClass.register(OAuth2Manager.#_init) }


    @PerformanceProfiler.decorator()
    public run() {
        this.loadToken(); 
        if (this.token) {

            if (this.isRefreshTokenExpired()) {
                return this.Auth()
            }


            if (this.isTokenExpired()) { this.refreshAccessToken() } // refresh si la dure de vie est inférieur a 1 min
            else {
                const dif = Date.now() - this.token.created_at 
                const delay = Math.max((this.token.expires_in * 1000) - 60000 - dif, 5000);
                this.autoRefreshID = setTimeout(() => this.refreshAccessToken(), delay);
                this.dispatchEvent("Authorized" , {})
                this.status = true;
            }
        }
        else {
            this.Auth()
        }
    }

    private loadToken() {
        if (fs.existsSync(this.tokenPath)) {
            this.token = JSON.parse(fs.readFileSync(this.tokenPath, "utf-8"));
        }
    }

    private saveToken(token: TokenData) {
        fs.writeFileSync(this.tokenPath, JSON.stringify(token, null, 2));
        this.token = token;
    }

    public getAuthUrl( ): string {
        const { auth_uri, client_id, redirect_uris, scopes , extra_params } = this.credentials;
        this.state = uuidv4()
        const params = new URLSearchParams({
            response_type: "code",
            client_id,
            redirect_uri : redirect_uris[0],
            scope : scopes.join(" ") ,
            state :this.state,
            
        });

        if (extra_params) {
            for (const [key, value] of Object.entries(extra_params)) {
                params.append(key, value);
            }
        }
        return `${auth_uri}?${params.toString()}`;
       
    }

    public async exchangeCodeForToken(code: string): Promise<TokenData> {
        const { client_id, client_secret, redirect_uris, token_uri } = this.credentials;

        const response = await fetch(token_uri, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body : new URLSearchParams({
                code,
                client_id,
                client_secret,
                redirect_uri : redirect_uris[0],
                grant_type: "authorization_code"
            }).toString()
        });

        if (!response.ok) {
            const text = await response.text(); // <-- lis le corps d'erreur
            this.console.fatalError(new Error( OAuth2Manager.#I18n.get("OAuth2Manager_exchange_code_to_token_failed")) , response.status, text)
        }

        const token: TokenData = {
            ...(await response.json()),
            created_at: Date.now()
        };
        this.saveToken(token);
        if (this.autoRefreshID) clearTimeout(this.autoRefreshID);
        this.autoRefreshID = setTimeout( ()=> { this.refreshAccessToken() } , (this.token!.expires_in * 1000) - 60000)
        return token;
    }

    public isTokenExpired(): boolean {
        if (!this.token) return true;
        const expiresAt = this.token.created_at + this.token.expires_in * 1000;
        return Date.now() > expiresAt - 60000; // rafraîchir 1 min avant expiration
    }

    public isRefreshTokenExpired(): boolean {
        if (!this.token) return true;
        if (!this.token.refresh_token_expires_in) return false;
        const expiresAt = this.token.created_at + this.token.refresh_token_expires_in * 1000;
        return Date.now() > expiresAt - 60000;
    }

    public async getAccessToken(): Promise<string> {
        if (!this.token)  this.console.fatalError( new Error( OAuth2Manager.#I18n.get("OAuth2Manager_token_unfound")));

        if (this.isTokenExpired()) {
            if (this.token.refresh_token) {
                await this.refreshAccessToken();
            } else {
                this.console.fatalError( new Error( OAuth2Manager.#I18n.get("OAuth2Manager_token_expired_and_refresh_token_available")));
            }
        }

        return this.token!.access_token;
    }


    public async refreshAccessToken(): Promise<void> {
        const { client_id, client_secret, token_uri } = this.credentials;
        if (!this.token?.refresh_token) this.console.fatalError( new Error( OAuth2Manager.#I18n.get("OAuth2Manager_refresh_token_available")));

        const response = await fetch(token_uri, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body :  new URLSearchParams({
                client_id,
                client_secret,
                refresh_token: this.token.refresh_token,
                grant_type: "refresh_token"
            }).toString()
        });

        if (!response.ok) { this.console.fatalError(new Error(OAuth2Manager.#I18n.get("OAuth2Manager_refresh_token_failed")));}

        const data = await response.json();

        const newToken: TokenData = {
            ...this.token, 
            ...data,
            refresh_token: data.refresh_token ?? this.token.refresh_token, // Recuper l'ancien refresh_token si il y a pas dans le nouveaux token
            created_at: Date.now()
        };

        this.saveToken(newToken);
        this.dispatchEvent("Authorized" , {})
        this.status = true;
        if (this.autoRefreshID) clearTimeout(this.autoRefreshID);

        // si c'est pas un token “infini"
        if (newToken.expires_in) { 
            this.autoRefreshID = setTimeout( ()=> { this.refreshAccessToken() } , (newToken.expires_in * 1000) - 60000)
        }
    }

    public Auth() {
        const app = express();
        let server: import("http").Server | null = null;
        
        const timeout = setTimeout(() => {
            this.dispatchEvent("Error" , {})
             this.status = false;
            if (server) server.close();
        }, 5 * 60 * 1000);
        
        app.get(this.option.url , async (req, res) => {
            const code = req.query.code as string;
            if (req.query.state !== this.state) {
                res.status(400).send( OAuth2Manager.#I18n.get("OAuth2Manager_serveur_error_state")); // "Invalid state parameter."
                this.dispatchEvent("Error", {});
                this.status = false;
                return;
            }
            try {
                await this.exchangeCodeForToken(code);
                this.dispatchEvent("Authorized" , {})
                this.status = true;
                res.send( OAuth2Manager.#I18n.get("OAuth2Manager_serveur_successful_Authorized")); // "✅ Authorization successful! Token saved."
            } catch (error) {
                this.console.error(error)
                res.status(500).send( OAuth2Manager.#I18n.get("OAuth2Manager_serveur_error_Authorized")); //  "❌ Erreur d'authentification."
                this.dispatchEvent("Error" , {})
                this.status = false;
            }finally {
                res.on("finish" , ()=> {
                    if (server) { server.close( ()=> { this.console.log(OAuth2Manager.#I18n.get("OAuth2Manager_log_close_serveur") ) }); }
                    clearTimeout(timeout)
                })
            }
        })

        server = app.listen(this.option.port, () => {
            this.console.log(OAuth2Manager.#I18n.get("OAuth2Manager_open_serveur" ,{port : this.option.port , url : this.option.url}) );
        });
        

        const openOptions = this.option.openOptions ? { app: { name: this.option.openOptions } } : undefined;
        open(this.getAuthUrl(), openOptions);
    }

    public async Request(url: string, options: RequestInit = {})  {
        const accessToken = await this.getAccessToken();
        const headers = { ...(options.headers || {}), Authorization: `Bearer ${accessToken}` };
        const response = await fetch(url, { ...options, headers });
        return response;
    }


    public getStatus() {
        return this.status;
    }

    static EventType = {
        Error : "Error",
        Authorized: "Authorized",
    }

}



type OAuth2Manager_I18nMap = {
    "OAuth2Manager_open_serveur" : { port: number; url: string; } ,
    "OAuth2Manager_serveur_error_Authorized" : undefined,
    "OAuth2Manager_serveur_successful_Authorized" : undefined,
    "OAuth2Manager_serveur_error_state" : undefined,
    "OAuth2Manager_refresh_token_failed" : undefined,
    "OAuth2Manager_refresh_token_available" : undefined,
    "OAuth2Manager_token_expired_and_refresh_token_available" : undefined,
    "OAuth2Manager_token_unfound" : undefined,
    "OAuth2Manager_exchange_code_to_token_failed" : undefined
    "OAuth2Manager_log_close_serveur" : undefined
}

type OAuth2Manager_EventMap = {
    Error : {},
    Authorized : {},
}