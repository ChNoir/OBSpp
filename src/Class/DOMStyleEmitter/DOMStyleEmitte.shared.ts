import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";


export class DOMStyleEmitterShared {

    protected static console: ConsoleLogger;
    protected static I18n : I18nColdContext<DOMStyleEmitter_I18nMap>;
    static logEvent : boolean = false

    constructor( private name : string | undefined = undefined ) {
        
    }



    logger( tag : "addListener" | "removeListener" | "dispatchEvent" , eventTag : string , detail ?: any) {
        switch (tag) {
            case "addListener":
                DOMStyleEmitterShared.logEvent && DOMStyleEmitterShared.console.log( DOMStyleEmitterShared.I18n.get("DOMStyleEmitter_log_addListener", { name: this.name || this.constructor.name, event: eventTag })) ; // `[ Class : ${this.name || this.constructor.name} ] Listener added for event : ${event as string}`
                break;
            case "removeListener":
                DOMStyleEmitterShared.logEvent && DOMStyleEmitterShared.console.log( DOMStyleEmitterShared.I18n.get("DOMStyleEmitter_log_removeListener", { name: this.name || this.constructor.name, event: eventTag })) ; // `[ Class : ${this.name || this.constructor.name} ] Listener removed for event : ${event as string}`
                break;    
            case "dispatchEvent":
                DOMStyleEmitterShared.logEvent && DOMStyleEmitterShared.console.log( DOMStyleEmitterShared.I18n.get( "DOMStyleEmitter_log_dispatchEvent" ,  { name: this.name || this.constructor.name, event: eventTag } ) , detail); // `[ Class : ${this.name || this.constructor.name} ] Event dispatched : ${event as string}`
                break;
            default:
                break;
        }
    }
}


type DOMStyleEmitter_I18nMap = {
    DOMStyleEmitter_log_addListener : { name : string; event : string }
    DOMStyleEmitter_log_removeListener : { name : string; event : string }
    DOMStyleEmitter_log_dispatchEvent : { name : string; event : string }
}
