import { WebSocketAction } from "./type";
import type { UniverselWebSocket } from "./UniverselWebSocketServer.back";


export class WebSocketActionContext {
    private readonly ws : { send (data : string) : void  , readyState : number , OPEN : number } ;

    constructor( ws : UniverselWebSocket , public readonly message : WebSocketAction ) {
        this.ws = ws;
    }

    sendResponse( response : WebSocketAction ) {
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(JSON.stringify(response));
        }
    }

}

type WebSocketActionContext_I18nMap = {

}

