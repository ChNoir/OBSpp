export type ApiResponse<T = unknown> = {
    success: boolean
    status : number
    code: string
    message?: string
    data?: T
    meta?: {
        timestamp: number
        iso: string
        errerName?: string
        errorStack?: string
    }
}

export type ApiResponseOption<T = unknown> = {
    success?: boolean
    status? : number
    code?: string
    message?: string
    data?: T
    error?: Error
}


import type { Server as HttpServer } from "http";
import type { Server as HttpsServer } from "https";

export type WebServeur = HttpsServer | HttpServer;

export type ServeurExpressOption = {
    webSocket? : boolean
    certPath? :string
    keyPath? : string
    port : number
    serveurRun? : (option : ServeurRunOption) => void
}

export type ServeurRunOption = {
    port : number
    isSSL : boolean
}
