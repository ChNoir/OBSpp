
import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { InitsClass } from "@/Class/InitsClass.shared";



type Middleware = (event: string, payload: any,) => Promise<void | boolean > | void | boolean;

export class EventBus {

    private static event = new DOMStyleEmitter("EventBus")
    private static middlewares : Middleware[] = []
    public static console: ConsoleLogger;


    private static _init() {
        EventBus.console = ConsoleLogger.getInstance("EventBus")
    }

    static { InitsClass.register( EventBus._init ) }


    static addEventListener(event: string, listener: (detail:{[key: string]: any;} ) => void): void {
        this.event.addEventListener(event , listener )
    }

    static async dispatchEvent(event: string, detail: {[key: string]: any;}) {
        for (const mw of EventBus.middlewares) {
            try {
                const r = await mw(event , detail)
                if (r === false) { return }
            } catch (error) {
                return EventBus.console.error(error);
            }
        }

        EventBus.event.dispatchEvent(event , detail)
    }

    static addMiddleware( middleware : Middleware)  {
        EventBus.middlewares.push(middleware)
        return EventBus
    }

    static removeEventListener(event: string, listener: (detail: {[key: string]: any;}) => void): void {
        EventBus.event.removeEventListener(event , listener)
    }
}
