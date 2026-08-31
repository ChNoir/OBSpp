import type { ApiResponse } from "@/Types/Class/ServeurExpress";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18nHotContext } from "@/Class/I18n/I18nHotContext.shared";
import type { I18n_EnvConfigMap, I18n_I18nMap, UniversalI18nMap } from "@/Types/Class/I18n";
import { EnvConfig } from "@/Class/EnvConfig/EnvConfig.front";
import { I18nShared } from "@/Class/I18n/I18n.shared";



export class I18n extends I18nShared  {
    
    public static async _init() {
        I18n.console = ConsoleLogger.getInstance("I18n")
        I18n.I18n = I18n.createColdContext<I18n_I18nMap>()
        I18n.EnvConfig = EnvConfig.createEnvConfigContext<I18n_EnvConfigMap>()

    }

    static { InitsClass.register(I18n._init) }


    private static async load( path : string) { 

        const rep = await fetch( path , {
            method : "GET"
        });

        const message = (await rep.json()) as ApiResponse<Record<string, string>>
        return message.data ?? {}
        

    }

    public static async setLocal(local : string) {
        I18n.local = local;

        const path = "/i18n/local/" + local + ".json"
        const data = await I18n.load(path)
        if (data) { I18n.map = data }
        else { I18n.map = {} }
    }

    public static setLocalFolderPath(path : string) {
        if (path.endsWith("/")) {
            I18n.localFolderPath = path 
        }else {
            I18n.localFolderPath = path  + "/"
        }
    }

   

    public static async createHotContext<I18nTagMap extends UniversalI18nMap>(local : string ) {
        if (I18n.locales[local]) return new I18nHotContext<I18nTagMap>(I18n.locales[local])
        const path = "/i18n/local/" + local + ".hot.json"
        const data = await I18n.load( path )
        if(data) {
            I18n.locales[local] = data
            return new I18nHotContext<I18nTagMap>(data)
        }
        return new I18nHotContext<I18nTagMap>() // default
    }


}


