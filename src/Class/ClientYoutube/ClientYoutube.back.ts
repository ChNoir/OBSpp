import { ChatObservator } from "@/Class/ClientYoutube/ChatObservator.back";
import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import type { LIST_liveBroadcasts , ClientYoutube_EnvConfigMap, ClientYoutube_Event, ClientYoutube_I18nMap } from "./type";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { OAuth2Manager } from "../OAuth2Manager/OAuth2Manager.back";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";


export class ClientYoutube {

    public static oAuth2Manager : OAuth2Manager
    private static intervaleID : NodeJS.Timeout | null = null
    private static ListChatObservator : Record<string, ChatObservator> = {}

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<ClientYoutube_I18nMap> 
    public static EnvConfig: EnvConfigContext<ClientYoutube_EnvConfigMap>
    public static emitter = new DOMStyleEmitter<ClientYoutube_Event>()


    private static _init() {
        ClientYoutube.console = ConsoleLogger.getInstance("ClientYoutube")
        ClientYoutube.I18n = I18n.createColdContext<ClientYoutube_I18nMap>()
        ClientYoutube.EnvConfig = EnvConfig.createEnvConfigContext<ClientYoutube_EnvConfigMap>()
    }

    static { InitsClass.register(ClientYoutube._init) }

    public static init () {
        
        ClientYoutube.oAuth2Manager = new OAuth2Manager( {
            credentialsPath : ClientYoutube.Config.YOUTUBE_CLIENT_CREDENTIALS_PATH(),
            tokenPath : ClientYoutube.Config.YOUTUBE_CLIENT_TOKEN_PATH(),
            port : ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_PORT(),
            url :  ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_URL(),
            logInstanceName : "OAuth2Manager_YOUTUBE"
        })

        ClientYoutube.oAuth2Manager.addEventListener("Authorized" , () => {
            ClientYoutube.console.log(ClientYoutube.I18n.get("ClientYoutube_Authorized") ) 
            if (ClientYoutube.Config.YOUTUBE_CLIENT_RUN()) ClientYoutube.start()
            else { ClientYoutube.console.warn( ClientYoutube.I18n.get("ClientYoutube_NotRun")) }
        })

        ClientYoutube.oAuth2Manager.addEventListener("Error" , () => {
            ClientYoutube.console.error(ClientYoutube.I18n.get("ClientYoutube_NotAuthorized"))
        })

        ClientYoutube.oAuth2Manager.run()
    }

    public static start() {

        const func =  async () => {
            const ids = await ClientYoutube.getIdLives()

            ids.forEach(id => {
                if (!ClientYoutube.ListChatObservator[id]) {
                    
                    ClientYoutube.console.log(ClientYoutube.I18n.get("ClientYoutube_new_live" , { id })) // `New live detected with chat id : ${id}`
                    const Observator = new ChatObservator(id)
                    Observator.addEventListener("LiveEnd", () => {
                        delete ClientYoutube.ListChatObservator[id]
                    })


                    ClientYoutube.ListChatObservator[id] = Observator
                    ClientYoutube.emitter.dispatchEvent("Observator",  { Observator :  Observator})
                }
            })
        }

        func()

        ClientYoutube.intervaleID = setInterval( func , ClientYoutube.Config.YOUTUBE_CLIENT_CHECK_LIVE_TIME()) // Check every 100 seconds for new lives
    }


    static async getIdLives() : Promise<string[]> {

        const params = new URLSearchParams({
            part: ["snippet"].join(","),
            broadcastStatus : "active"
        })

        const Reponse = await  ClientYoutube.oAuth2Manager.Request("https://www.googleapis.com/youtube/v3/liveBroadcasts?" +params.toString())

        if (!Reponse.ok) { 
            ClientYoutube.console.error(ClientYoutube.I18n.get("ClientYoutube_getIdLives_error"))
            return []
        } 

        const data =  (await Reponse.json()) as LIST_liveBroadcasts
        return data.items.map(item => item.snippet.liveChatId )
    }


    public static async getAccessToken() : Promise<string> {
        return await ClientYoutube.oAuth2Manager.getAccessToken()
    }

    public static stop() {
        if (ClientYoutube.intervaleID) {
            clearInterval(ClientYoutube.intervaleID)
            ClientYoutube.intervaleID = null
        }

        for (const id in ClientYoutube.ListChatObservator) {
            ClientYoutube.ListChatObservator[id].stop()
        }
    }

    public static Config = {
        YOUTUBE_CLIENT_RUN : () => ClientYoutube.EnvConfig.boolean.OrDefault("YOUTUBE_CLIENT_RUN" , true),
        YOUTUBE_CLIENT_CREDENTIALS_PATH : () => ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_CREDENTIALS_PATH" , "./OAuth/Credentials/google.json"),
        YOUTUBE_CLIENT_TOKEN_PATH : () => ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_TOKEN_PATH" , "./OAuth/Tokens/google_token.json"),
        YOUTUBE_CLIENT_SERVEUR_PORT : () => ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_SERVEUR_PORT" , 5000),
        YOUTUBE_CLIENT_SERVEUR_URL : () => ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_SERVEUR_URL" , "/callback"),
        YOUTUBE_CLIENT_PROTO_PATH : () => ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_PROTO_PATH" , "./stream_list.proto"),
        YOUTUBE_CLIENT_CHECK_LIVE_TIME : () => ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_CHECK_LIVE_TIME" , 10000),
        YOUTUBE_CLIENT_CHAT_RECONNECT_TIME : () => ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_CHAT_RECONNECT_TIME " , 3000),
    }
    
    public static addEventListener<K extends keyof ClientYoutube_Event>(event: K, listener: (detail: ClientYoutube_Event[K]) => void) {
        ClientYoutube.emitter.addEventListener(event , listener)
    }
    public static removeEventListener<K extends keyof ClientYoutube_Event>(event: K, listener: (detail: ClientYoutube_Event[K]) => void) {
        ClientYoutube.emitter.removeEventListener(event , listener)
    } 
    public static dispatchEvent<K extends keyof ClientYoutube_Event> (event: K , detail: ClientYoutube_Event[K] ) {
        ClientYoutube.emitter.dispatchEvent(event ,detail)
    } 

}


