import { CLIManager } from "@/Class/CLIManager/CLIManager.back";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { MessageChat } from "@/Class/MessageChat/MessageChat.shared";


export function CLI_debug(value : string | number | boolean | string[]) {
    if ( value  === "hard") {
        CLIManager.displayAllArgs()
        EnvConfig.display()
    }
    DOMStyleEmitter.logEvent = true; 
    RegisteRoutes.debug = true
    MessageChat.logMessage = true
}