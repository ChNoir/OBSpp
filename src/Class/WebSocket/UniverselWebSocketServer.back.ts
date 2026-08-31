import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.back";
import { v4 as uuidv4 } from "uuid";
import { WebSocketServer, WebSocket, ServerOptions, RawData } from "ws";
import { I18n } from "../I18n/I18n.back";
import { ConsoleLogger } from "../ConsoleLogger.shared";
import { I18nColdContext } from "../I18n/I18nColdContext.shared";
import { InitsClass } from "../InitsClass.shared";
import { WebSocketReponseAction } from "./WebSocketReponse";
import { WebSocketActionContext } from "./WebSocketActionContext.back";



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


export class UniverselWebSocketServer<ActionTyping extends string = "" > {

    private serveur : WebSocketServer ;
    private option : OptionUniverselWebSocketServer | undefined
    private heartbeatInterval : NodeJS.Timeout | undefined


    public console: ConsoleLogger;
    private event : DOMStyleEmitter<UniverselWebSocketServerEventMap>
    public static I18n: I18nColdContext<UniverselWebSocketServer_I18nMap> 

    public static _init() {
        UniverselWebSocketServer.I18n = I18n.createColdContext<UniverselWebSocketServer_I18nMap>()
    }

    static { InitsClass.register(UniverselWebSocketServer._init) }

    public constructor ( option?: OptionUniverselWebSocketServer) {
        this.console = ConsoleLogger.getInstance(option?.instanceName ?? "UniverselWebSocketServer")
        this.event = new DOMStyleEmitter(option?.instanceName ?? "UniverselWebSocketServer")
        this.option = option
        this.serveur = new WebSocketServer(option)

        this.startHeartbeat(option?.heartbeatInterval ?? 30000)

        this.serveur.on("connection", (ws: UniverselWebSocket, req) => {

            ws.isAlive = true // set defaul value in true
            ws.uuid = uuidv4()

            ws.on("pong", () => { ws.isAlive = true; });
            ws.on("ping", () => { ws.isAlive = true; this.sendPong(ws); })

            ws.on("message", (data) => {
                ws.isAlive = true;
                this.handleMessage(ws, data);
            });

            this.event.dispatchEvent("ClientConnection" , { id :ws.uuid })

        });

        this.serveur.on("close", () => {
            if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        });
    }

    public disconnect() {
        clearInterval(this.heartbeatInterval)
        this.serveur.clients.forEach((ws)=>{
            const client = ws as UniverselWebSocket
            this.event.dispatchEvent("ClientDisconnect" , { id :client.uuid })
            client.close();
        })
        this.serveur.close()
    }


    private startHeartbeat(interval: number) {

        this.heartbeatInterval = setInterval(() => {
            for (const client of this.serveur.clients as Set<UniverselWebSocket>) {
                if (client.readyState === client.OPEN) {
                    if (!client.isAlive) { 
                        this.event.dispatchEvent("ClientDisconnect" , { id :client.uuid })
                        client.terminate()
                        continue ;
                    }
                    client.isAlive = false
                    this.sendPing(client)
                }
            }
        }, interval);
    }

     // Message handling system
    private handleMessage(ws: UniverselWebSocket, data: RawData) {
        
        if (data.toString() === "ping") { ws.emit("ping") ; return }; 
        if (data.toString() === "pong") { ws.emit("pong"); return }; 
       
        this.event.dispatchEvent(`message` , { ws : ws , data : data })

       
        try {
            const parsedData = JSON.parse(data.toString()) as WebSocketReponseAction;
            parsedData.uuidClient = ws.uuid
            if (typeof parsedData.Action !== "string") {
                this.console.error(  UniverselWebSocketServer.I18n.get("UniverselWebSocketServer_Invalid_JSON_Action"));
                return;
            }

            this.dispatchEvent(`action:${parsedData.Action}` as `action:${ActionTyping}`, { ws: ws, message: new WebSocketActionContext(ws, parsedData) } as any);

        } catch (error) {
            this.console.error(  UniverselWebSocketServer.I18n.get("UniverselWebSocketServer_Invalid_JSON") , data.toString());
        }
        
    }


    //////////////////////////////////////////
    // Ping/Pong Protocol

    private sendPong(ws: UniverselWebSocket) {
        if (ws.readyState === ws.OPEN) {
            if (this.option?.pingPongProtocol) {
                ws.pong();
            } else {
                ws.send("pong");
            }
        }
    }

    private sendPing(ws: UniverselWebSocket) {
        if (ws.readyState === ws.OPEN) {
            if (this.option?.pingPongProtocol) {
                ws.ping();
            } else {
                ws.send("ping");
            }
        }
    }

    ////////////////////////////////////////////
    // API 

    public broadcast(data: any) {
        const message = typeof data === "string" ? data : JSON.stringify(data);
        for (const client of this.serveur.clients as Set<UniverselWebSocket>) {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        }
    }

    public send (uuid : string , data : any) : boolean {
        const message = typeof data === "string" ? data : JSON.stringify(data);
        for (const client  of this.serveur.clients as Set<UniverselWebSocket>) {
            if (client.readyState === client.OPEN && client.uuid == uuid ) {
                client.send(message);
                return true
            }
        }

        return false
    }

    public getWebSocketServer() {
        return this.serveur
    }


    public addEventListener<K extends keyof UniverselWebSocketServerEventMap | `action:${ActionTyping}`>(
        event: K,
        listener: (
            detail: K extends keyof UniverselWebSocketServerEventMap
                ? UniverselWebSocketServerEventMap[K]
                : ActionDetail
        ) => void,
    ): void {
        this.event.addEventListener(event as any, listener as any);
    }

    public removeEventListener<K extends keyof UniverselWebSocketServerEventMap | `action:${ActionTyping}`>(
        event: K,
        listener: (
            detail: K extends keyof UniverselWebSocketServerEventMap
                ? UniverselWebSocketServerEventMap[K]
                : ActionDetail
        ) => void,
    ): void {
        this.event.removeEventListener(event as any, listener as any);
    }

    public dispatchEvent<K extends keyof UniverselWebSocketServerEventMap | `action:${ActionTyping}`>(
        event: K,
        detail: K extends keyof UniverselWebSocketServerEventMap
            ? UniverselWebSocketServerEventMap[K]
            : ActionDetail,
    ): void {
        this.event.dispatchEvent(event as any, detail as any);
    }

}
