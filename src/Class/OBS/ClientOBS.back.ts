import OBSWebSocket from "obs-websocket-js";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";




export class ClientOBS {
    
    private static obs = new OBSWebSocket()
    private static connected = false;

    private static instance: ClientOBS ;
    private constructor() {}

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<ClientOBSI18nMap> 
    public static EnvConfig: EnvConfigContext<ClientOBSEnvConfigMap>

    public static _init() {
        ClientOBS.console = ConsoleLogger.getInstance("ClientOBS")
        ClientOBS.I18n = I18n.createColdContext<ClientOBSI18nMap>()
        ClientOBS.EnvConfig = EnvConfig.createEnvConfigContext<ClientOBSEnvConfigMap>()
    }

    static { InitsClass.register(ClientOBS._init) }


    public static async init () {

        try {
            const reponse = await ClientOBS.obs.connect( 
                ClientOBS.EnvConfig.string.OrDefault("ClientOBS_URL" , "ws://127.0.0.1:4455") , 
                ClientOBS.EnvConfig.string.OrUndefined("ClientOBS_PASSWORD"))
            

                
            ClientOBS.connected = true
            ClientOBS.console.log(ClientOBS.I18n.get("ClientOBS_connect" , { version : reponse.obsWebSocketVersion } ))

            ClientOBS.obs.on("ConnectionClosed" , ()=>{
                ClientOBS.console.log(ClientOBS.I18n.get("ClientOBS_connection_closed"))
                if (ClientOBS.EnvConfig.boolean.OrNull("ClientOBS_reconnect")) {
                    ClientOBS.console.log(ClientOBS.I18n.get("ClientOBS_reconnect"))
                    ClientOBS.init()
                }
            })

        } catch (error) {

            ClientOBS.connected = false
            ClientOBS.console.log(ClientOBS.I18n.get("ClientOBS_connect_error"))

        }
    }

    public static async disconnect() {

        if (!ClientOBS.connected) {
            return;
        }

        await this.obs.disconnect();
        this.connected = false;
        ClientOBS.console.log(ClientOBS.I18n.get("ClientOBS_disconnect"))
    }

    public static addEventListener = ClientOBS.obs.on

    public static request = ClientOBS.obs.call 

    static getInstance() {
        if (!ClientOBS.instance) ClientOBS.instance = new ClientOBS();
        return ClientOBS.instance;
    }
    
}


type ClientOBSEnvConfigMap = 
    "ClientOBS_URL" |
    "ClientOBS_PASSWORD" |
    "ClientOBS_reconnect"

type ClientOBSI18nMap = {
    "ClientOBS_connect" : {
        version : string
    }
    "ClientOBS_connection_closed" : undefined,
    "ClientOBS_reconnect" : undefined,
    "ClientOBS_connect_error" : undefined,
    "ClientOBS_disconnect" : undefined
}