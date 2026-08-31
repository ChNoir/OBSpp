import { I18n } from "@/Class/I18n/I18n.back";
import type { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.back";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { EnvConfigContext } from "../EnvConfig/EnvConfigContext.shared";
import { InitsClass } from "@/Class/InitsClass.shared";


class ClientDiscord {
    
    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<ClientDiscord_I18nMap> 
    public static EnvConfig: EnvConfigContext<ClientDiscord_EnvConfigMap>

    public static _init() {
        ClientDiscord.console = ConsoleLogger.getInstance("ClientDiscord")
        ClientDiscord.I18n = I18n.createColdContext<ClientDiscord_I18nMap>()
        ClientDiscord.EnvConfig = EnvConfig.createEnvConfigContext<ClientDiscord_EnvConfigMap>()
    }

    static { InitsClass.register(ClientDiscord._init) }
}

type ClientDiscord_I18nMap = {}
type ClientDiscord_EnvConfigMap = ""