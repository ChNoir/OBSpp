import { DOMStyleEmitter } from "../DOMStyleEmitter/DOMStyleEmitter.back";
import { MessageChat } from "@/Class/MessageChat.shared";


export type MessageManagerEventMap = {
    message : MessageChat
}


export class MessageManager extends DOMStyleEmitter<MessageManagerEventMap> {

    public sendMessage(message: MessageChat) { 
        this.dispatchEvent("message", message)
    }
}

type MessageChat_I18nMap = {
    [key in `MessageChat_${string}`]: undefined
}

