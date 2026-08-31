import { DOMStyleEmitter } from "@/Class/DOMStyleEmitter/DOMStyleEmitter.front"
import { WebSocketClient_EventMap, WSClientOption } from "./type";

export class WebSocketClient { 

    #heartbeatInterval ?: NodeJS.Timeout
    #option : WSClientOption
    #socket ?: WebSocket  ;
    #isLive : 0 | 1 | 2 = 0 ;
    #event : DOMStyleEmitter<WebSocketClient_EventMap> 
   

    constructor (option : WSClientOption) {
        this.#option = option
        this.#event = new DOMStyleEmitter<WebSocketClient_EventMap>( this.#option.instanceName ?? "WebSocketClient" )

    }

    connect() {
        if (this.#socket) this.deconnect()
        this.#socket = new WebSocket(this.#option.url);

        this.#socket.addEventListener("open", () => {
            this.#event.dispatchEvent("open",undefined)
        })


        this.#socket.addEventListener("message" , (event) => {            
            this.#isLive = 2 
            let str 
            if (event.data instanceof ArrayBuffer) {
                const enc = new TextDecoder("utf-8");
                str = enc.decode(event.data).trim()
            }
            else {
                str = (event.data as string ).trim()
            }

            if (!this.#option.customPingPong ) {
                switch (str.toLocaleLowerCase()) {
                    case "ping":
                        this.#socket?.send("Pong")  
                        return ;
                    case "pong":
                        return ;
                    case "close" :
                        this.#isLive = 0
                        this.deconnect()
                        return ;
                }
            }
            else {
               if (this.#option.customPingPong.pingDetector(str)) { this.#socket?.send("Pong") ; return; }
               if (this.#option.customPingPong.pongDetector(str)) return ;
               if (this.#option.customPingPong.closeDetector(str)) {
                    this.#isLive = 0
                    this.deconnect()
                    return;
               }
            }

            this.#event.dispatchEvent("message" , { data : str })
        })


        this.#socket.addEventListener("error", (event) => {
            this.#event.dispatchEvent( "error" , { event } );
        })

        this.#socket.addEventListener("close" , (event) => {
            this.stopHeartbeat();
            this.#event.dispatchEvent("close", { event } );
        })
    }

    ping() {
        if (this.#option.customPingPong) {
            this.#option.customPingPong.sendPing(this)
        }
        else {
            this.#socket?.send("Ping")
        }
    }
    pong() {
        if (this.#option.customPingPong) {
            this.#option.customPingPong.sendPong(this)
        }
        else {
            this.#socket?.send("Pong")
        }
    }

    send(data : string | object) {
        if (this.#socket && this.#socket.readyState == this.#socket.OPEN) {
            if ( typeof data === "string" ){
                this.#socket.send(data)
            }
            if (typeof data === "object" ) {
                this.#socket.send(JSON.stringify(data))
            }
                
        }
    }

    deconnect() {
        if (this.#socket) {
            this.#socket.close()
        }
        this.stopHeartbeat()
    }

    stopHeartbeat() {
        if (this.#heartbeatInterval) clearInterval(this.#heartbeatInterval);
        this.#heartbeatInterval = undefined;
    }

    startHeartbeat() {
        
    
        if (this.#heartbeatInterval) this.stopHeartbeat();

        this.#heartbeatInterval = setInterval(() => {
            if (!this.#socket || this.#socket.readyState !== WebSocket.OPEN) return;

            // Custome Ping/Pong, pour d'autre systeme 
            if (typeof this.#option.customPingPong  == "object" ) {
                if (typeof this.#option.customPingPong.sendPing != "function") throw new Error("sendPing invalide");
                this.#option.customPingPong.sendPing(this)
            }
            // Default Ping/Pong
            else {
                this.#socket.send("ping");
            }
           
            switch (this.#isLive) {
                case 2: // Lien en vie
                    this.#isLive = 1
                break;
                
                case 1: // En attante d'une reponse ou message 
                    this.#isLive = 0
                    if (this.#option.customPingPong) {
                        this.#option.customPingPong.sendPing(this)
                    }
                    else {
                        this.#socket.send("ping");
                    }
                break;
                
                case 0: // Mort
                        
                break;
            }


        
            // si le dernier pong est trop vieux, on ferme la connexion
          
        }, (this.#option.heartbeatTimeout ?? 30000));
    }

}
