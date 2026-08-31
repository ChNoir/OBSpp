
export type WebSocketReponseAction = {
    Action : string
    status ?: "success" | "error"
    data : any
    idMessage ?: string
    uuidClient ?: string
}


export class WebSocketReponse {

    Action( Action : string , data : any , idMessage ?: string ) {
        return {
            Action,
            data,
            idMessage
        }
    }

    data( data : any ) {
        return {
            data
        }
    }

}