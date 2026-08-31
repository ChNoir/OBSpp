import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import type { MessageChatData } from "@/Types/Class/MessageChat";
import { I18n } from "@/Class/I18n/I18n.front";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.front";
import { OverlayChatShared } from "./OverlayChat.shared";
import { WSClient } from "@/Class/WSClient/WSClient.front"

export class OverlayChat extends OverlayChatShared {

    static MESSAGE_LIFETIME =  5000
    static MAX_MESSAGES = 6
    private static client : WSClient 
    private static MessageBuilder : (data : MessageChatData ) => HTMLElement
    private static filtre ?: (data : MessageChatData ) => boolean

    public static _init() {
        OverlayChat.console = ConsoleLogger.getInstance("OverlayChat")
        OverlayChat.I18n = I18n.createColdContext<OverlayChat_I18nMap>()
        OverlayChat.EnvConfig = EnvConfig.createEnvConfigContext<OverlayChat_EnvConfigMap>()
        OverlayChat.client = new WSClient( { url : "ws://localhost:3000"+OverlayChatShared.endpointWS })

        OverlayChat.client.addEventListener("message" , (e) => { 
            const Reponce = JSON.parse(e.detail.data) as { data : MessageChatData[] };

            for (const msg of Reponce.data) {
                if (OverlayChat.filtre && !OverlayChat.filtre(msg)) continue

                const DivMessage = OverlayChat.MessageBuilder(msg)

                if (OverlayChat.MESSAGE_LIFETIME > 0 ) {
                    setTimeout(() => {
            
                        DivMessage.classList.add("fade-out");
                
                        setTimeout(() => {
                            DivMessage.remove();
                        }, 350);
                
                    }, OverlayChat.MESSAGE_LIFETIME);
                }

                const Container = OverlayChat.ChatContainer()
                Container.appendChild(DivMessage)

                while (Container.children.length > OverlayChat.MAX_MESSAGES) {
                    if (Container.firstChild)
                        Container.removeChild(Container.firstChild);
                }

            }

    
            
        })
    }

    static { 
        InitsClass.register( OverlayChat._init) 
    }

    static Start( MessageBuilder : (data : MessageChatData ) => HTMLElement , filtre ?: (data : MessageChatData) => boolean) {
        
        OverlayChat.MessageBuilder = MessageBuilder
        OverlayChat.client.connect()
    }

    static ChatContainer () : HTMLElement {
        const t = document.querySelector<HTMLElement>("#chat")
        if (t) return t 
        const d = document.createElement("div")
        d.id = "chat"
        
        return d
    
    }

    static createIcone(IconPath : string ) {
        const img = document.createElement("img");
        img.classList.add("messageIcon");
        img.src = IconPath
        return img
    }

    static addMessage ( msg : MessageChatData)  {
        const DivMessage = OverlayChat.MessageBuilder(msg)

        if (OverlayChat.MESSAGE_LIFETIME > 0 ) {
            setTimeout(() => {
    
                DivMessage.classList.add("fade-out");
        
                setTimeout(() => {
                    DivMessage.remove();
                }, 350);
        
            }, OverlayChat.MESSAGE_LIFETIME);
        }

        const Container = OverlayChat.ChatContainer()
        Container.appendChild(DivMessage)

        while (Container.children.length > OverlayChat.MAX_MESSAGES) {
            if (Container.firstChild)
                Container.removeChild(Container.firstChild);
        }


    }

}


type OverlayChat_I18nMap = {

}

type OverlayChat_EnvConfigMap = ""


