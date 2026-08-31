import WebSocket, { RawData } from 'ws';

import type { ClientTwitchEventMap, TwitchEventSubName, TwitcheVersionAPI, TwitchInfoStreams, TwitchMessage, TwitchSondage } from './type';
import { DOMStyleEmitter } from '@/Class/DOMStyleEmitter/DOMStyleEmitter.back';
import { OAuth2Manager } from '@/Class/OAuth2Manager/OAuth2Manager.back';
import { ConsoleLogger } from '@/Class/ConsoleLogger.shared';
import { I18nColdContext } from '@/Class/I18n/I18nColdContext.shared';
import { EnvConfigContext } from '@/Class/EnvConfig/EnvConfigContext.shared';

import { InitsClass } from '@/Class/InitsClass.shared';
import { I18n } from '@/Class/I18n/I18n.back';
import { EnvConfig } from '@/Class/EnvConfig/EnvConfig.back';




// Sekleton
export class ClientTwitch extends DOMStyleEmitter<ClientTwitchEventMap> {

    // oAuth Twitch
    private static oAuth2Manager : OAuth2Manager
    private static registerList : Array<string> = []


    // Websocketet / heartbeat
    private static keepAliveTimeout?: NodeJS.Timeout
    private static keepAliveTimeoutMs = 0

    private static websocketSessionID : string 
    private static ClientWebSocket: WebSocket

    // ID 
    private static CHAT_CHANNEL_USER_ID : string  // id compte du chats 
    private static BOT_USER_ID : string  // id du bot


    static #console: ConsoleLogger;
    static #I18n: I18nColdContext<ClientTwitch_I18nMap> 
    static #EnvConfig: EnvConfigContext<ClientTwitch_EnvConfigMap>

    static #_init() {
        ClientTwitch.#console = ConsoleLogger.getInstance("ClientTwitch")
        ClientTwitch.#I18n = I18n.createColdContext<ClientTwitch_I18nMap>()
        ClientTwitch.#EnvConfig = EnvConfig.createEnvConfigContext<ClientTwitch_EnvConfigMap>()
    }

    static { InitsClass.register(ClientTwitch.#_init) }

    private static instance: ClientTwitch;
    private constructor() {
        super();

        if (! ClientTwitch.Config.TWITCH_CLIENT_ID() ) ClientTwitch.console.fatalError(ClientTwitch. #I18n.get("ClientTwitch_CLIENT_ID_FatalError"))


        ClientTwitch.oAuth2Manager = new OAuth2Manager( {
            credentialsPath : ClientTwitch.Config.TWITCH_CLIENT_CREDENTIALS_PATH(),
            tokenPath : ClientTwitch.Config.TWITCH_CLIENT_TOKEN_PATH(),
            port : ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_PORT(),
            url :  ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_URL(),
            logInstanceName : "OAuth2Manager_TWITCH"
        })

        ClientTwitch.oAuth2Manager.addEventListener("Authorized" , () => {
            ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_Authorized") ) 
            if ( ClientTwitch.Config.TWITCH_CLIENT_RUN()) this.startWebsocketSession()
            else {  ClientTwitch.console.warn(  ClientTwitch. #I18n.get("ClientTwitch_NotRun")) }
           
        })

        ClientTwitch.oAuth2Manager.addEventListener("Error" , () => {
            ClientTwitch.console.error(ClientTwitch. #I18n.get("ClientTwitch_NotAuthorized"))
        })

        ClientTwitch.oAuth2Manager.run()
    }
   
    private async startWebsocketSession() {

        if (ClientTwitch.ClientWebSocket?.readyState === WebSocket.OPEN) return

        const id = (await this.getUserInfo()).id 
        ClientTwitch.CHAT_CHANNEL_USER_ID = id
        ClientTwitch.BOT_USER_ID = id
        this.connectWebsocket()

    }

    private connectWebsocket(url = "wss://eventsub.wss.twitch.tv/ws" ) {
        ClientTwitch.ClientWebSocket = new WebSocket(url);
        
        ClientTwitch.ClientWebSocket.on('open', () => {
            ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Open")); 
        }); 

        ClientTwitch.ClientWebSocket.on('message', (data) => {
            this.handleWebsocketMessage(data)
        });

        ClientTwitch.ClientWebSocket.on('close', () => {
            ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Close"));
        });

        ClientTwitch.ClientWebSocket.on('error', (error) => {
            ClientTwitch.console.error(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Error") , error);
        });
    }

    private disconnectWebsocket() {

        if (ClientTwitch.ClientWebSocket) {

            ClientTwitch.ClientWebSocket.removeAllListeners()

            ClientTwitch.ClientWebSocket.terminate()
        }
    }

    public async register(type : TwitchEventSubName , version : TwitcheVersionAPI , condition ?: Record<string, string> ) {
        if ( !ClientTwitch.oAuth2Manager.getStatus() ) { ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_NotAuthorized")); return false }
        if (ClientTwitch.registerList.includes(`${type}:${version}`)) return true

        ClientTwitch.registerList.push(`${type}:${version}`)

        const Reponse = await ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/eventsub/subscriptions" , {
            method : "POST",
            headers : {
			    'Client-Id':  ClientTwitch.Config.TWITCH_CLIENT_ID() ,
			    'Content-Type': 'application/json'
            },
            body : JSON.stringify ({
                type: type,
			    version: version,
                condition: condition ?? {
				    broadcaster_user_id: ClientTwitch.CHAT_CHANNEL_USER_ID,
				    user_id: ClientTwitch.BOT_USER_ID
			    },
                
                transport: {
                    method: 'websocket',
                    session_id: ClientTwitch.websocketSessionID
			    }
            })
        })

        const isOk = Reponse.status != 202  ? false : true

        if (!isOk) {
            let data = await  Reponse.json();
            ClientTwitch.console.error(ClientTwitch. #I18n.get("ClientTwitch_Subscribe_Error") + " " + Reponse.status);
            ClientTwitch.console.error(data);
            ClientTwitch.registerList.splice(ClientTwitch.registerList.indexOf(type) , 1) 
        }

        return isOk
    }

    private async getUserInfo() {

        const Reponse =  await ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/users" , {
            headers : { "Client-Id": ClientTwitch.Config.TWITCH_CLIENT_ID(), }
        })
        const data = await Reponse.json();
        return data.data[0]
    }

    private handleWebsocketMessage(data : RawData ) {
        try {
            const message : TwitchMessage = JSON.parse(data.toString())

            switch (message.metadata.message_type) {
                case "session_welcome":
                    ClientTwitch.websocketSessionID = message.payload.session?.id ?? ""
                    ClientTwitch.keepAliveTimeoutMs =  (message.payload.session?.keepalive_timeout_seconds ?? 10) * 1000 * 2
                    ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Session_Welcome") )

                    // Pour session_keepalive
                    ClientTwitch.keepAliveTimeout = setTimeout( ()=>{
                        this.disconnectWebsocket()
                        this.connectWebsocket()
                    } ,ClientTwitch.keepAliveTimeoutMs )

                    this.dispatchEvent("register" , {})
                    break;
                case "session_keepalive" : 
                    if (ClientTwitch.keepAliveTimeout) clearTimeout(ClientTwitch.keepAliveTimeout)
                    ClientTwitch.keepAliveTimeout = setTimeout( ()=>{
                        this.disconnectWebsocket()
                        this.connectWebsocket()
                    } ,ClientTwitch.keepAliveTimeoutMs)
                    break;

                case "session_reconnect" : 
                    this.disconnectWebsocket()
                    this.connectWebsocket(message.payload.session?.reconnect_url)
                    break;

                default:
                    if (!message.payload.subscription) return ClientTwitch.console.warn(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Message_No_Subscription") , message);
                    this.dispatchEvent(message.payload.subscription.type , {message : message })
                    break;
            }

        } catch (error) {
            ClientTwitch.console.error(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Message_Parse_Error"), error);
        }
    }

    public async SendMessageInChat( Message :string ) {
    
        const Reponse = await ClientTwitch.oAuth2Manager.Request('https://api.twitch.tv/helix/chat/messages' , {
            method: 'POST',
            headers: {
                'Client-Id': ClientTwitch.Config.TWITCH_CLIENT_ID(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                broadcaster_id: ClientTwitch.CHAT_CHANNEL_USER_ID,
                sender_id: ClientTwitch.BOT_USER_ID,
                message: Message
            })
        })

        return Reponse.status != 202  ? false : true
    }

    public async StartSondage( opt : TwitchSondage ) {
        await ClientTwitch.oAuth2Manager.Request('https://api.twitch.tv/helix/polls' , {
            method: 'POST',
            headers: {
                'Client-Id': ClientTwitch.Config.TWITCH_CLIENT_ID(),
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(opt)
        })
    } 

    public async getInfoStream(user_ids : Array<string> ) : Promise< TwitchInfoStreams | null > {
        const reponse = await ClientTwitch.oAuth2Manager.Request('https://api.twitch.tv/helix/polls' , {
            method : "GET",
            headers: {
                'Client-Id': ClientTwitch.Config.TWITCH_CLIENT_ID(),
                'Content-Type': 'application/json'
            },
            
        })

        if (!reponse.ok) return null
        return (await (reponse.json())) as TwitchInfoStreams
    }


    static getInstance() {
        if (!ClientTwitch.instance)  ClientTwitch.instance = new ClientTwitch();
        return ClientTwitch.instance;
    }

    static async disconnect() {

        ClientTwitch.websocketSessionID = ""
        if (ClientTwitch.ClientWebSocket) {
            ClientTwitch.ClientWebSocket.close();
            ClientTwitch.console.log(ClientTwitch. #I18n.get("ClientTwitch_WebSocket_Disconnect") )
        }
    }

    static Config = {
        TWITCH_CLIENT_RUN : () => ClientTwitch.#EnvConfig.boolean.OrDefault("TWITCH_CLIENT_RUN" , true),
        TWITCH_CLIENT_ID : ()=>{ return ClientTwitch.#EnvConfig.string.require( "TWITCH_CLIENT_ID" ) } ,
        TWITCH_CLIENT_CREDENTIALS_PATH : ()=>{ return  ClientTwitch.#EnvConfig.string.OrDefault( "TWITCH_CLIENT_CREDENTIALS_PATH" , "./OAuth/Credentials/twitch.json" )} ,
        TWITCH_CLIENT_TOKEN_PATH : ()=>{ return  ClientTwitch.#EnvConfig.string.OrDefault( "TWITCH_CLIENT_TOKEN_PATH" ,"./OAuth/Tokens/twitch.json")},
        TWITCH_CLIENT_SERVEUR_PORT : ()=>{ return  ClientTwitch.#EnvConfig.int.OrDefault( "TWITCH_CLIENT_SERVEUR_PORT" ,5001)},
        TWITCH_CLIENT_SERVEUR_URL : ()=>{ return  ClientTwitch.#EnvConfig.string.OrDefault( "TWITCH_CLIENT_SERVEUR_URL","/callback")}
    }
}

type ClientTwitch_EnvConfigMap = 
    "TWITCH_CLIENT_RUN" |
    "TWITCH_CLIENT_ID" | 
    "TWITCH_CLIENT_CREDENTIALS_PATH" |
    "TWITCH_CLIENT_TOKEN_PATH" |
    "TWITCH_CLIENT_SERVEUR_PORT" | 
    "TWITCH_CLIENT_SERVEUR_URL"

type ClientTwitch_I18nMap = {
    "ClientTwitch_NotRun" : undefined
    "ClientTwitch_WebSocket_Disconnect" : undefined
    "ClientTwitch_WebSocket_Message_Parse_Error" : undefined
    "ClientTwitch_WebSocket_Message_No_Subscription" : undefined
    "ClientTwitch_WebSocket_Session_Welcome" : undefined
    "ClientTwitch_WebSocket_Error" : undefined 
    "ClientTwitch_WebSocket_Open" : undefined 
    "ClientTwitch_WebSocket_Close" : undefined
    "ClientTwitch_NotAuthorized" : undefined 
    "ClientTwitch_Authorized" : undefined
    "ClientTwitch_CLIENT_ID_FatalError" : undefined
    "ClientTwitch_Subscribe_Error" : undefined
}
