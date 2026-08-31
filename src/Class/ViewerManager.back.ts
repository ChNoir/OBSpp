import { v4 as uuidv4 } from "uuid";
import { DOMStyleEmitter } from "./DOMStyleEmitter/DOMStyleEmitter.back";
import { PlatformMessageChat } from "./MessageChat/type";


export class ViewerManager {

    static event : DOMStyleEmitter = new DOMStyleEmitter()
    static viewers : viewer[] = []

    // static XP_COOLDOWN = 10 * 1000
    // static setIntervalXP_id = setInterval(() => {
    //     if (ViewerManager.viewers.length < 0) return

    //     const i = Math.round(Math.random() * ViewerManager.viewers.length) - 1
    //     ViewerManager.viewers[i].xp += randomXP(5 , 15)

    // }, 60 * 1000 );

    // static setTimeoutSave_id = setTimeout(() => { ViewerManager.save() }, 60 * 1000  );
    
    // static save() { }


    // static close () {
    //     ViewerManager.save()
    //     clearInterval(ViewerManager.setIntervalXP_id);
    //     clearInterval(ViewerManager.setTimeoutSave_id)
    // }

    // static addEventListener<T = any>(event: string, listener: (detail: T) => void): void {
    //     ViewerManager.event.addEventListener(event , listener)
    // }
    // static dispatchEvent<T = any>(event: string, detail: T): void {
    //     ViewerManager.event.dispatchEvent(event , detail)
    // }

    // static getViewerByMessage( message : MessageChat) : viewer  {
    //     const viewer = ViewerManager.viewers.find((viewer) => { return viewer.platform_id == message.data.id && viewer.platform == message.data.platform  })
    //     if (viewer) return viewer

    //     return {
    //         uuid : uuidv4()
    //     }

    // }

    // static getViewerByUuid( uuid :string ) : viewer | undefined {
    //     return ViewerManager.viewers.find((viewer) => { return viewer.uuid == uuid })
    // }

    // static {
    //     ViewerManager.addEventListener<MessageChat>("message" , (message) => {
    //         Date.now()
    //     })
    // }

}

type viewer = {
    uuid : string
    name : string
    platform : PlatformMessageChat
    platform_id : string
    xp : number

    isSubscriber : boolean
    isModerator : boolean
    

    lastMessageTimestamp? : number
    MessageStreak : number
}