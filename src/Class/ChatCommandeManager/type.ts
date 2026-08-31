import { PlatformMessageChat } from "./MessageChat"

export type ChatCommandeManagerConfig = {

    option : {
        prefix : string
    }

    commandes :  {
        platform : PlatformMessageChat
        name : string
        callback : ( Send : (message : string) => void ) => void
    }
}

export type CommandesCallbackOption = {
    
}
   