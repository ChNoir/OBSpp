import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import type { MessageChat } from "@/Class/MessageChat.shared";
import { UniverselWebSocketServer } from "@/Class/WebSocket/UniverselWebSocketServer.back";
import { I18n } from "../../I18n/I18n.back";
import { EnvConfig } from "../../EnvConfig/EnvConfig.back";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { OverlayChatShared } from "./OverlayChat.shared";
import { BuilderFront } from "@/Class/BuilderFront/BuilderFront.back";


export class OverlayChat extends OverlayChatShared {


    private static WebSocket : UniverselWebSocketServer

    public static _init() {

        OverlayChatShared.console = ConsoleLogger.getInstance("OverlayChat")
        OverlayChatShared.I18n = I18n.createColdContext<OverlayChat_I18nMap>()
        OverlayChatShared.EnvConfig = EnvConfig.createEnvConfigContext<OverlayChat_EnvConfigMap>()

        OverlayChat.buildFrontHTML()

        OverlayChat.WebSocket = new UniverselWebSocketServer( {
            heartbeat : true,
            noServer : true,
        })
        RegisteRoutes.addWsRoute( OverlayChatShared.endpointWS , OverlayChat.WebSocket.getWebSocketServer());

        OverlayChatShared.setIntervalID = setInterval(()=>{
            if (OverlayChat.message.length > 0) {
                const msg = OverlayChat.message
                OverlayChat.message = []
                OverlayChat.WebSocket.broadcast({
                    data : msg
                })
            }
        },2000)
    }

    static { InitsClass.register( OverlayChat._init)  }


    static async sendMessage(message : MessageChat) {
        OverlayChat.message.push(message)
    }

    static async close() {
        OverlayChat.WebSocket.disconnect()
    }

    static buildFrontHTML () {

        if (!BuilderFront.isBuild) return 
        
        BuilderFront.register({
            name : "ChatAll",
            namespace : "OverlayChat",
            js : [
                "/bootstrap.js",
                "/js/smooth-scrollbar.js"
            ],
            entryPoint : "./src/EntryPoints/OverlayChat/ChatAll.ts",
            html(document) {
                const div = document.createElement("div")
                div.id = "chat"
                document.body.appendChild(div)
            },
        })

        BuilderFront.register({
            name : "ChatStreamer",
            namespace : "OverlayChat",
            js : [
                "/bootstrap.js",
            ],
            entryPoint : "./src/EntryPoints/OverlayChat/ChatStreamer.ts",
            html(document) {
                const div = document.createElement("div")
                div.id = "chat"
                document.body.appendChild(div)
            },
        })

        BuilderFront.register({
            name : "ChatOnlyTwitch",
            namespace : "OverlayChat",
            js : [
                "/bootstrap.js",
                "/js/smooth-scrollbar.js"
            ],
            entryPoint : "./src/EntryPoints/OverlayChat/ChatOnlyTwitch.ts",
            html(document) {
                const div = document.createElement("div")
                div.id = "chat"
                div.setAttribute("data-scrollbar" , "")
                document.body.appendChild(div)
            },
        })
    }
}


type OverlayChat_I18nMap = {

}

type OverlayChat_EnvConfigMap = ""