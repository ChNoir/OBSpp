import path from "path";
import fs from "fs"
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { ClientTwitch } from "@/Class/Twitch/ClientTwitch";
import { OAuth2Manager } from "@/Class/OAuth2Manager/OAuth2Manager.back";
import { ClientYoutube } from "@/Class/ClientYoutube/ClientYoutube.back";




export async function CLI_token() {

    const console = ConsoleLogger.getInstance("CLI_Token")
    const i18n = I18n.createColdContext<CLI_token_I18nMap>()

    const tokensDir = path.resolve(__dirname, '../OAuth/Tokens');
    if (!fs.existsSync(tokensDir)) fs.mkdirSync(tokensDir, { recursive: true });
    
    let completed = 0;

    const providers = [
        {
            name: 'Google',
            credentials: ClientYoutube.Config.YOUTUBE_CLIENT_CREDENTIALS_PATH() ,
            token: ClientYoutube.Config.YOUTUBE_CLIENT_TOKEN_PATH() ,
            port: ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_PORT(),
            url: ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_URL()
        },
        {
            name: 'Twitch',
            credentials: ClientTwitch.Config.TWITCH_CLIENT_CREDENTIALS_PATH(),
            token: ClientTwitch.Config.TWITCH_CLIENT_TOKEN_PATH(),
            port: ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_PORT(),
            url: ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_URL()
        }
    ];

    const promises = providers.map(p => {
        return new Promise<void>((resolve, reject) => {
            if (!fs.existsSync(p.credentials)) {
                console.error( i18n.get("CLI_Token_credentials_unfound" , {name : p.name , path : p.credentials })); //  `Credentials manquant pour ${p.name} : ${p.credentials}`
                reject()
            }

            const manager = new OAuth2Manager({
                port: p.port,
                url: p.url,
                credentialsPath: p.credentials,
                tokenPath: p.token,
                logInstanceName: `${p.name}OAuth`,
                openOptions: "firefox"
            });

            manager.addEventListener("Authorized", () => {
                console.log(i18n.get("CLI_Token_authorized") ); // `✅ ${p.name} : autorisation réussie. Token sauvegardé dans ${p.token}`
                completed++;
                // si tous terminés, on quitte
                if (completed >= providers.length) {
                    console.log( i18n.get("CLI_Token_all_authorized")); // 'Tous les tokens ont été générés.'
                    resolve();
                }
            });

            manager.addEventListener("Error", () => {
                console.error( i18n.get("CLI_Token_Authorized_failed", { name : p.name })); // `❌ ${p.name} : échec de l'autorisation.`
                reject();
            });

            // Démarre le processus d'authentification (ouvre le navigateur si nécessaire)
            manager.run();


        })
    });

    await Promise.all(promises);
}


type CLI_token_I18nMap = {
    "CLI_Token_credentials_unfound" : { name: string; path: string; }
    "CLI_Token_authorized" : undefined
    "CLI_Token_all_authorized" : undefined
    "CLI_Token_Authorized_failed" : { name: string; }
}