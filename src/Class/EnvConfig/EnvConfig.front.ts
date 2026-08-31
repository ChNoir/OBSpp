import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18n } from "@/Class/I18n/I18n.front";
import { InitsClass } from "@/Class/InitsClass.shared";
import { EnvConfigShared } from "./EnvConfig.shared";
import { EnvConfig_I18nMap } from "./type";


export class EnvConfig extends EnvConfigShared {


    static #_init() {
        EnvConfigShared.I18n = I18n.createColdContext<EnvConfig_I18nMap>()
        EnvConfigShared.console = ConsoleLogger.getInstance("EnvConfigShared")
        EnvConfig.load()
    }

    static { InitsClass.register( EnvConfig.#_init , 100) }

    public static async load () {
        EnvConfigShared.data = __CONFIG__ ?? { }
    }
}


