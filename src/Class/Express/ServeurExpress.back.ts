import Express  from "express";
import https from "https";
import fs from "fs"
import type { Express as ExpressApp } from "express";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { InitsClass } from "@/Class/InitsClass.shared";
import { WebServeur, ServeurExpressOption, ServeurRunOption } from "./type";


export class ServeurExpress {


    private static serveur : WebServeur 
    private static option : ServeurExpressOption
    private static app : ExpressApp = Express()


    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<ServeurExpress_I18nMap> 
    public static EnvConfig: EnvConfigContext<ServeurExpress_EnvConfigMap>

    private static _init() {
        ServeurExpress.console = ConsoleLogger.getInstance("ServeurExpress")
        ServeurExpress.I18n = I18n.createColdContext<ServeurExpress_I18nMap>()
        ServeurExpress.EnvConfig = EnvConfig.createEnvConfigContext<ServeurExpress_EnvConfigMap>()
    }

    static { InitsClass.register( ServeurExpress._init , -200) }


    public static init ( option : ServeurExpressOption) {
        const app = ServeurExpress.app
        ServeurExpress.option = option

        // Middleware global
        RegisteRoutes.getMiddlewares().forEach(m => app.use(m))

        // 
        RegisteRoutes.getStaticRouter().forEach((path , url) => app.use( url , Express.static(path)) )
        
        // Set Routes
        RegisteRoutes.getRoutes().forEach((router , path) =>  {
            app.use(path , router )
        })

        // 
        RegisteRoutes.getURLs().forEach((option)=> {
            switch (option.methode) {
                case "GET":
                    return app.get(option.url , option.handler)
                case "POST":
                    return app.post(option.url , option.handler)
                case "PUT":
                    return app.put(option.url , option.handler)
                case "DELETE":
                    return app.delete(option.url , option.handler)
                case "HEAD":
                    return app.head(option.url , option.handler)
                case "OPTIONS":
                    return app.options(option.url , option.handler)
                case "TRACE":
                    return app.trace(option.url , option.handler)
                case "PATCH":
                    return app.patch(option.url , option.handler)
                case "CONNECT":
                    return app.connect(option.url , option.handler)
            }
        })

        ServeurExpress.createServeur()
        if (option.webSocket) { 
            ServeurExpress.console.log(ServeurExpress.I18n.get("ServeurExpress_WSS_On"))
            ServeurExpress.SetWebSocket() 
        }
    }

    private static createServeur() {

        const opt = ServeurExpress.option
        const SRopt : ServeurRunOption = { 
            port : opt.port,
            isSSL : false
        }
        if (opt.certPath && opt.keyPath && fs.existsSync(opt.certPath) && fs.existsSync(opt.keyPath)) {
            const options = {
                key: fs.readFileSync(opt.certPath),
                cert: fs.readFileSync(opt.keyPath),
            };
            SRopt.isSSL = true
            ServeurExpress.console.log(ServeurExpress.I18n.get("ServeurExpress_SSL_On") )
            ServeurExpress.serveur = https.createServer(options, ServeurExpress.app).listen(opt.port, () => {
                ServeurExpress.console.log(ServeurExpress.I18n.get("ServeurExpress_ServeurHTPS" , { port : opt.port }) );
                if (opt.serveurRun) opt.serveurRun(SRopt)
            });
        } 
        else {
            ServeurExpress.console.log(ServeurExpress.I18n.get("ServeurExpress_SSL_Off"))
            ServeurExpress.serveur = ServeurExpress.app.listen(opt.port, () => {
                ServeurExpress.console.log(ServeurExpress.I18n.get("ServeurExpress_ServeurHTTP" , { port : opt.port }) );
               if (opt.serveurRun) opt.serveurRun(SRopt)
            })
        }

    }

    private static SetWebSocket() {

        const Map = RegisteRoutes.getWsRouter()

        ServeurExpress.serveur.on("upgrade",(req, socket, head) => {
            if (!req.url) return socket.destroy();

            const isHandled = Map.has(req.url)
            if (!isHandled) return socket.destroy();
            const wss = Map.get(req.url)
            if (!wss) return socket.destroy();

            wss.handleUpgrade(req, socket, head, (ws : any) => {
                wss.emit("connection", ws, req);
            });
        })
    }

    public static getServeur () { return ServeurExpress.serveur }

    public static close() {

        const timeout = setTimeout(() => {
            ServeurExpress.console.warn( ServeurExpress.I18n.get("ServeurExpress_force_timeout_Stop"))
            process.exit(1);
        }, 10000);

        ServeurExpress.serveur.closeAllConnections()

        // Close Serveur
        ServeurExpress.serveur.close(() => {
            clearTimeout(timeout);
            ServeurExpress.console.log( ServeurExpress.I18n.get("ServeurExpress_Serveur_Stop") );
            process.exit(0);    
        });
    }


}


type ServeurExpress_I18nMap = {
    "ServeurExpress_force_timeout_Stop" : undefined
    "ServeurExpress_Serveur_Stop" : undefined
    "ServeurExpress_ServeurHTTP" : { port: number; }
    "ServeurExpress_SSL_Off" : undefined
    "ServeurExpress_ServeurHTPS" : { port: number; }
    "ServeurExpress_SSL_On" : undefined
    "ServeurExpress_WSS_On" : undefined
}

type ServeurExpress_EnvConfigMap = "ServeurExpress_PORT" | "ServeurExpress_CERT_PATH" | "ServeurExpress_KEY_PATH"