import { RequestHandler, Router } from "express"
import type { ParamsDictionary } from "express-serve-static-core"
import { WebSocketServer } from "ws"
import type { ParsedQs } from "qs"
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared"
import { InitsClass } from "@/Class/InitsClass.shared"
import { I18n } from "@/Class/I18n/I18n.back"
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared"




export type httpMethode = "GET" | "POST" | "PUT" | "DELETE" | 'HEAD' | "OPTIONS" | "TRACE" | "PATCH" | "CONNECT"
export type MiddlewareHandler = RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
export type URLsOption = { url : string , methode : httpMethode, handler : RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>> }

export class RegisteRoutes {

    private static URLs : Array<URLsOption> = []
    private static Router : Map<string , Router> = new Map()
    private static Middleware : Array< { priorite : number, handler :MiddlewareHandler}> = []
    private static StaticRouter : Map<string , string> = new Map()
    private static WsRouter : Map<string , WebSocketServer> = new Map()
    
  
    private static I18n : I18nColdContext<RegisteRoutes_I18nMap>
    public static console: ConsoleLogger;
    
    private static _init() {
        RegisteRoutes.console = ConsoleLogger.getInstance("RegisteRoutes")
        RegisteRoutes.I18n = I18n.createColdContext<RegisteRoutes_I18nMap>()
    }

    static { InitsClass.register( RegisteRoutes._init ) }


    public static addStaticRouter (url : string  , path : string) {
        RegisteRoutes.StaticRouter.set(url , path)
        if (RegisteRoutes.debug) {
            RegisteRoutes.console.log( RegisteRoutes.I18n.get("RegisteRoutes_debug_RegisteRoutes" , {url : url ,path :path })) // `[RegisteRoutes] Static route added : ${url} -> ${path}`
        }
    }

    public static addRoute ( url: string , Router : Router) : void  {
       
        RegisteRoutes.Router.set(url , Router)
         if (RegisteRoutes.debug) {
            RegisteRoutes.console.log( RegisteRoutes.I18n.get("RegisteRoutes_debug_addRoute" , {url : url ,name : Router.name })) // `[RegisteRoutes] Route added : ${url} => ${Router.name}`
        }
    }

    public static addMiddleware ( Middleware : MiddlewareHandler , priorite : number = 0) : void {
        RegisteRoutes.Middleware.push({priorite : priorite ,handler : Middleware})
        if (RegisteRoutes.debug) {
            RegisteRoutes.console.log( RegisteRoutes.I18n.get("RegisteRoutes_debug_addMiddleware" , {name : Middleware.name }))// `[RegisteRoutes] Middleware added : ${Middleware.name} }`
        }
    }

    public static addWsRoute ( url : string , callback : WebSocketServer) {
        RegisteRoutes.WsRouter.set(url , callback)
        if (RegisteRoutes.debug) {
            RegisteRoutes.console.log( RegisteRoutes.I18n.get("RegisteRoutes_debug_addWsRoute" , {url : url }) ) // `[RegisteRoutes] WebSocket route added : ${url}`
        }
    }

    public static addURLs ( ...option :  URLsOption[] ) {
        RegisteRoutes.URLs.push(...option)
    }

    /////////////////////////////////////////////////////

    public static getRoutes () : Map<string , Router> {
        return RegisteRoutes.Router
    }

    public static getMiddlewares () : Array<MiddlewareHandler> {
        return RegisteRoutes.Middleware.sort((a,b)=> b.priorite - a.priorite).map(m => m.handler)
    }

    public static getStaticRouter() {
        return RegisteRoutes.StaticRouter
    }

    public static getWsRouter() : Map<string, WebSocketServer>  {
        return RegisteRoutes.WsRouter
    }

    public static getURLs()  {
        return RegisteRoutes.URLs
    }

    private static _debug : boolean = false
    public static set debug (value : boolean) {
        RegisteRoutes._debug = value
    }

}


type RegisteRoutes_I18nMap = {
    "RegisteRoutes_debug_RegisteRoutes" : { url: string; path: string; }
    "RegisteRoutes_debug_addRoute" : { url: string; name: string; }
    "RegisteRoutes_debug_addMiddleware" : { name: string; }
    "RegisteRoutes_debug_addWsRoute" : { url: string; }
}
