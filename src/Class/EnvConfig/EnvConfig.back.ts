import dotenv from "dotenv"
import { EnvConfigShared } from "./EnvConfig.shared";
import { I18n } from "../I18n/I18n.back";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import type { EnvConfig_I18nMap } from "./type";
import { InitsClass } from "@/Class/InitsClass.shared";
import { Bootstrap } from "../Bootstrap.back";
import { EnvConfigContext } from "./EnvConfigContext.shared";
import { PerformanceProfiler } from "../PerformanceProfiler/PerformanceProfiler.shared";


export class EnvConfig extends EnvConfigShared {

    protected static publicConfigTag : string[] = []


    static async #_init() {
        EnvConfigShared.I18n = I18n.createColdContext<EnvConfig_I18nMap>()
        EnvConfigShared.console = ConsoleLogger.getInstance("EnvConfigShared")
        EnvConfig.load()
        EnvConfig.setBootstrap()
    }

    static { InitsClass.register( EnvConfig.#_init , 100) }

    @PerformanceProfiler.decorator()
    public static async load () {
       
        const result = dotenv.config({ quiet: false }) 
        if (result.error) { throw result.error }
        EnvConfigShared.data = result.parsed ?? { } ;
         
    }

    static addPublicConfigTag( ...tags : string[] ) {
        tags.forEach(t => {
            if (!EnvConfig.publicConfigTag.includes(t)) {
                EnvConfig.publicConfigTag.push(EnvConfigShared.checkTag(t))
            }
        })
    }

    static setBootstrap() {


        const envConfig = new EnvConfigContext()

        Bootstrap.addBootstrap("CONFIG" , ()=> {

            const json : { [tag : string] : string | undefined } = {}

            EnvConfig.publicConfigTag.forEach((tag)=> {
                json[tag] = envConfig.string.OrUndefined(tag)
            })

            return json
        })
       
    }
   
}
