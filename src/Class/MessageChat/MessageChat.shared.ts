import { ConsoleLogger } from "../ConsoleLogger.shared";
import { MessageChatData } from "./type";

export class MessageChat {

    private static _logMessage : boolean = false ;
    static set logMessage(value : boolean) {
        MessageChat._logMessage = value ;
    };

    constructor( public data: MessageChatData) {
        if (!MessageChat._logMessage) return;
        const consoleLogger = ConsoleLogger.getInstance("MessageChat")
        consoleLogger.tag(data.platform)
        consoleLogger.log( `MessageChat_${data.type}`, data)
    }

    toJSON() {
        return this.data
    }
}
