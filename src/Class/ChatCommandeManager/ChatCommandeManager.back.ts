import { ConsoleLogger } from "@/Class/ConsoleLogger.shared"
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back"
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared"
import { I18n } from "@/Class/I18n/I18n.back"
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared"
import { InitsClass } from "@/Class/InitsClass.shared"
import { ChatCommandeManagerConfig } from "./type"



class ChatCommandeManager {

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<ChatCommandeManager_I18nMap> 
    public static EnvConfig: EnvConfigContext<ChatCommandeManager_EnvConfigMap>

    public static _init() {
        ChatCommandeManager.console = ConsoleLogger.getInstance("ChatCommandeManager")
        ChatCommandeManager.I18n = I18n.createColdContext<ChatCommandeManager_I18nMap>()
        ChatCommandeManager.EnvConfig = EnvConfig.createEnvConfigContext<ChatCommandeManager_EnvConfigMap>()
    }

    static { InitsClass.register(ChatCommandeManager._init) }

    static init( option : ChatCommandeManagerConfig) {

    }


}

type ChatCommandeManager_I18nMap = {

}

type ChatCommandeManager_EnvConfigMap = ""