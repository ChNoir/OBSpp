import { Response , Request } from "express"
import { RegisteRoutes } from "@/Class/Express/RegisteRoutes.back"
import { ApiResponse, ApiResponseOption } from "./type"



// Extend Express Response to include .api property
declare global {
    namespace Express {
        interface Response {
            api: ExpressResponse
        }
    }
}

export class ExpressResponse {

    
    public static debug : boolean = false
    private reponse : Response
    private constructor (reponse : Response) {
        this.reponse = reponse
    }

    static getInstance(reponse : Response) {
        return new ExpressResponse(reponse)
    }

    static {
        RegisteRoutes.addMiddleware((req , res , next)=>{
            res.api = ExpressResponse.getInstance(res)
            next()
        } , 1000)
    }

    public send<T>( option: ApiResponseOption<T> ) {
        
        const payload: ApiResponse<T> = {
            success: option.success ?? true,
            status : option.status ?? 200,
            code: option.code ?? ExpressResponse.code.SUCCESS,
            message: option.message ?? undefined,
            data: option.data ?? undefined,
            meta: ExpressResponse.debug ? this.getMeta(option.error) : undefined
        }

        return this.reponse.status(payload.status).json(payload)
    }

    public getMeta(error ?: Error) {
        return  {
            iso : new Date().toISOString(),
            timestamp: Date.now(),
            name : error?.name,
            stack : error?.stack
        }
    }


    public static code = {
        SUCCESS : "SUCCESS",
        ERROR: "ERROR"
    }


}

class ExpressRequest {

    #req : Request

    static getInstance( req : Request ) {
        return new ExpressRequest( req )
    }

    private constructor( req : Request ) {
        this.#req = req
    }

    public query<T extends Record<string, string|undefined> = Record<string, string|undefined>>() : T {
        return this.#req.query as T
    }

    public body<T = unknown>() : T {
        return this.#req.body as T
    }

    public params<T extends Record<string, string|string> = Record<string, string>>() : T {
        return this.#req.params as T
    }

    public get<T extends string = string>(header: string): T | undefined {
        return this.#req.get(header) as T | undefined
    }

    public get ip(): string {
        return this.#req.ip ?? ""
    }

    public get method(): string {
        return this.#req.method
    }

    public get path(): string {
        return this.#req.path
    }

    public get url(): string {
        return this.#req.originalUrl
    }

}




class ExpressContext {

    #req : Request
    #res : Response

    public readonly response : ExpressResponse
    public readonly request : ExpressRequest

    static getInstance(req : Request , res : Response) {
        return new ExpressContext(req , res)
    }

    private constructor (req : Request , res : Response) {
        this.#req = req
        this.#res = res
        this.response = ExpressResponse.getInstance(res)
        this.request = ExpressRequest.getInstance(req)
    }

}