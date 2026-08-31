import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back";
import { InitsClass } from "@/Class/InitsClass.shared";
import { I18n } from "@/Class/I18n/I18n.back";
import { PerformanceProfiler } from "./PerformanceProfiler/PerformanceProfiler.shared";

export class Bootstrap {


    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<Bootstrap_I18nMap> 
    public static data : Record<string , () => any > = {}
   

    private static async _init() {
        Bootstrap.console = ConsoleLogger.getInstance("Bootstrap")
        Bootstrap.I18n = I18n.createColdContext<Bootstrap_I18nMap>()

        RegisteRoutes.addURLs({
            url : "/bootstrap.js",
            methode : "GET",
            handler : (req ,res)=>{
                using pref = PerformanceProfiler.measure("Bootstrap.request")
                res.type("application/javascript");
        
                const strs : string[] = []
                for (const name in Bootstrap.data) {
                    strs.push(`window.__${name.toLocaleUpperCase()}__ = ${JSON.stringify(Bootstrap.data[name]())};`)
                }
                res.send(strs.join("\r\n"))
            }
        })

    }

    static { 
        InitsClass.register( Bootstrap._init ) 
    }


    static addBootstrap(name : string , callback : () => object ) {
        if (Bootstrap.data[name] != undefined) return
        Bootstrap.data[name] = callback
    }

    
}


type Bootstrap_I18nMap = {}