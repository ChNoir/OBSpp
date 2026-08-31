import { ConsoleLogger } from "@/Class/ConsoleLogger.shared";
import { I18nColdContext } from "@/Class/I18n/I18nColdContext.shared";
import { EnvConfigContext } from "@/Class/EnvConfig/EnvConfigContext.shared";
import type { MessageChat } from "@/Class/MessageChat.shared";



export class OverlayChatShared {

    public static console: ConsoleLogger;
    public static I18n: I18nColdContext<OverlayChat_I18nMap> 
    public static EnvConfig: EnvConfigContext<OverlayChat_EnvConfigMap>
    public static message : MessageChat[] = []
    public static endpointWS : string = "/OverlayChat/Message"
    // private static WebSocket : UniverselWebSocketServer

    static setIntervalID : NodeJS.Timeout
  
    static generateViewerColor(name: string) {
    
        let hash = 0;
    
        for (let i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash) + name.charCodeAt(i);
        }
    
        const hue = Math.abs(hash) % 360;
    
        return `hsl(${hue}, 75%, 65%)`;
    }
    
    static IconsPath = {
        platform : {
            YouTube         : "/img/platform/youtube.png",
            Twitch          : "/img/platform/twitch.png",
            Kick            : "/img/platform/kick.png",
            Trovo           : "/img/platform/trovo.png",
            Rumble          : "/img/platform/rumble.png",
            DLive           : "/img/platform/dlive.png",
            Glimesh         : "/img/platform/glimesh.png",
            NimoTV          : "/img/platform/nimo.png",
            FacebookGaming  : "/img/platform/facebook.png",
            AfreecaTV       : "/img/platform/afreeca.png",
            Vimeo           : "/img/platform/vimeo.png",
            Dailymotion     : "/img/platform/dailymotion.png",
            Periscope       : "/img/platform/periscope.png",
            LinkedInLive    : "/img/platform/linkedin.png",
            VKLive          : "/img/platform/vk.png",
            BigoLive        : "/img/platform/bigo.png",
            Other           : "/img/platform/default.png"
        },
        statf : {
            owner       : "/img/badges/owner.png",
            moderator   : "/img/badges/moderator.png",
        }
       
    };


}


type OverlayChat_I18nMap = {

}

type OverlayChat_EnvConfigMap = ""