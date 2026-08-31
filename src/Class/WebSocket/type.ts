import type { WebSocketClient } from "./WebSocketClient.front"

export type WebSocketClient_EventMap = {
    message : {
        data : string
    }

    open: undefined
    ping : {
        data : string
    }
    close : {
        event : CloseEvent
    }
    pong : {
        data : string
    }
    error : {
        event : Event
    }
}


export type WSClientOption = {
    url : string ,
    heartbeatTimeout ?: number 
    customPingPong ?: {
        pingDetector : (pingData : string ) => boolean,
        pongDetector : (pongData : string ) => boolean,
        closeDetector:  (pongData : string ) => boolean,
        sendPing : (ws : WebSocketClient) => string | object ,
        sendPong : (ws : WebSocketClient) => string | object ,
    },
    instanceName ?: string
}


export type WebSocketAction = {
    Action : string
    status ?: "success" | "error"
    data : any
    idMessage ?: string
    uuidClient ?: string // only for server response
}



export type UniverselWebSocket = WebSocket & { 
    isAlive : boolean 
    uuid : string
}
export type OptionUniverselWebSocketServer = ServerOptions & {
    pingPongProtocol ? : boolean
    heartbeatInterval? : number 
    heartbeat?: boolean
    instanceName ?: string
} 

export type UniverselWebSocketServerEventMap = {
    
    ClientConnection: {
        id: string;
    };
    ClientDisconnect: {
        id: string;
    };
    message: {
        ws: UniverselWebSocket;
        data: RawData;
    };

}


export type ActionDetail = {
    ws: UniverselWebSocket;
    context : WebSocketActionContext;
}

export type UniverselWebSocketServer_I18nMap = {
    "UniverselWebSocketServer_Invalid_JSON" : {}
    "UniverselWebSocketServer_Invalid_JSON_Action" : {}
}