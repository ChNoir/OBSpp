
export type TypeMessageChat = 
    "message" | 
    "messageDeleted" | 
    "superChat" | 
    "superSticker" | 
    "newSponsor" | 
    "banned" | 
    "giftingEvent" | 
    "sondage" | 
    "undefined" | 
    "giftingReceived";
export type PlatformMessageChat = 
    "YouTube" | 
    "Twitch" | 
    "Trovo" | 
    "Kick" | 
    "Rumble" | 
    "DLive" | 
    "Glimesh" | 
    "NimoTV" | 
    "FacebookGaming" | 
    "Caffeine" | 
    "AfreecaTV" | 
    "Vimeo" | 
    "Dailymotion" | 
    "Periscope" | 
    "LinkedInLive" | 
    "VKLive" | 
    "BigoLive" | 
    "Other"

export type MessageChatData = {
    platform : PlatformMessageChat ,
    text : string , 
    author : string , 
    timestamp ?: number
    isSubscriber ?: boolean
    isModerator ?: boolean
    isOwner ?: boolean
    type : TypeMessageChat
    data ?: any
    id ?: string
    badges? : Array<badge>
}

export type badge = {
    name : string
    icon : string
}
