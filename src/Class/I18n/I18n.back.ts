import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18nHotContext } from "./I18nHotContext.shared";
import type { I18n_EnvConfigMap, I18n_I18nMap, UniversalI18nMap } from "@/Types/Class/I18n";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { EnvConfig } from "../EnvConfig/EnvConfig.back";
import { I18nShared } from "./I18n.shared"; 
import fs from "fs"
import { PerformanceProfiler } from "../PerformanceProfiler/PerformanceProfiler.shared";



export class I18n extends I18nShared {
    

    public static async _init() {
        I18nShared.console = ConsoleLogger.getInstance("I18n")
        I18nShared.I18n = I18n.createColdContext<I18n_I18nMap>()
        I18nShared.EnvConfig = EnvConfig.createEnvConfigContext<I18n_EnvConfigMap>()

        RegisteRoutes.addStaticRouter("/i18n/local" , "./local")
        EnvConfig.addPublicConfigTag("I18N_LOCAL_ENDPOINT")

        await I18n.setLocal(I18n.EnvConfig.string.OrDefault("I18N_LOCAL" , "fr"));
    }

    static { InitsClass.register(I18n._init) }


    @PerformanceProfiler.decorator()
    private static async load( path : string) { 

        if (fs.existsSync(path)) {
            return JSON.parse(fs.readFileSync(path , "utf8"));
        }
        else {
            ConsoleLogger.error("I18n : Path of file")
            return null
        }
        
    }

    @PerformanceProfiler.decorator()
    public static async setLocal(local : string) {
        I18n.local = local;
        const path = I18n.localFolderPath + local + ".json" 
        const data = await I18n.load(path)
        if (data) { I18n.map = data }
        else { I18n.map = {} }
    }

    public static async createHotContext<I18nTagMap extends UniversalI18nMap>(local : string ) {
        if (I18nShared.locales[local]) return new I18nHotContext<I18nTagMap>(I18nShared.locales[local])
        const path = I18nShared.localFolderPath + local + ".hot.json" 
        const data = await I18n.load( path )
        if(data) {
            I18nShared.locales[local] = data
            return new I18nHotContext<I18nTagMap>(data)
        }
        return new I18nHotContext<I18nTagMap>() // default
    }

}


