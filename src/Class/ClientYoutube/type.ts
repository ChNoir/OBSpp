import type grpc from "@grpc/grpc-js"
import type { youtube_v3 } from "googleapis"
import type { DynamicEvent } from "@/Class/DOMStyleEmitter/type"
import type { ChatObservator } from "./ChatObservator.back"


export type ChatObservator_EventMap = {
    "message" : {
        message : youtube_v3.Schema$LiveChatMessage
    }
    "LiveEnd" : {}

} & DynamicEvent< liveChatEventTypes ,{
    message : youtube_v3.Schema$LiveChatMessage
}>

export type ChatObservator_I18nMap = {
    "ChatObservator_LiveEnd" : { time: string; }
    "ChatObservator_callbackOnError" : { code: grpc.status; message: string; }
    "ChatObservator_debug_message" : { author: string; type: string; }
}


export type LIST_liveBroadcasts = {
    "kind": string,
    "etag": unknown,
    "nextPageToken": string,
    "prevPageToken": string,
    "pageInfo": {
        "totalResults": number,
        "resultsPerPage": number
    },
    "items": LiveBroadcastResource []
}

export type LiveBroadcastResource = {
    "kind": string,
    "etag": unknown,
    "snippet": {
        "publishedAt": string,
        "channelId": string,
        "title": string,
        "description": string,
        "thumbnails": { 
            [ key : string] : {
                "url": string,
                "width": number,
                "height": number
            }
        },
        "scheduledStartTime": string,
        "scheduledEndTime": string,
        "actualStartTime": string,
        "actualEndTime": string,
        "isDefaultBroadcast": boolean,
        "liveChatId": string
    },
    "status": {
        "lifeCycleStatus": string,
        "privacyStatus": string,
        "recordingStatus": string,
        "madeForKids": string,
        "selfDeclaredMadeForKids": string,
    },
    "contentDetails": {
        "boundStreamId": string,
        "boundStreamLastUpdateTimeMs": string,
        "monitorStream": {
            "enableMonitorStream": boolean,
            "broadcastStreamDelayMs": number,
            "embedHtml": string
        },
        "enableEmbed": boolean,
        "enableDvr": boolean,
        "recordFromStart": boolean,
        "enableClosedCaptions": boolean,
        "closedCaptionsType": string,
        "projection": string,
        "enableLowLatency": boolean,
        "latencyPreference": boolean,
        "enableAutoStart": boolean,
        "enableAutoStop": boolean
    },
    "statistics": {
        "totalChatCount":  number
    },
    "monetizationDetails": {
        "cuepointSchedule": {
            "enabled": boolean,
            "pauseAdsUntil": string,
            "scheduleStrategy": string,
            "repeatIntervalSecs":  number,
        }
    }
}


export type liveChatEventTypes = 
  "CHAT_ENDED_EVENT" |
  "MESSAGE_DELETED_EVENT" |
  "SPONSOR_ONLY_MODE_ENDED_EVENT" |
  "SPONSOR_ONLY_MODE_STARTED_EVENT" |
  "NEW_SPONSOR_EVENT" |
  "MEMBER_MILESTONE_CHAT_EVENT" |
  "SUPER_CHAT_EVENT" |
  "SUPER_STICKER_EVENT" |
  "TEXT_MESSAGE_EVENT" |
  "TOMBSTONE" |
  "USER_BANNED_EVENT" |
  "MEMBERSHIP_GIFTING_EVENT" |
  "GIFT_MEMBERSHIP_RECEIVED_EVENT" |
  "POLL_DETAILS"


export type pollDetails = {
    metadata: {
        options: {
          optionText: string,
          tally: string,
        },
        questionText: string,
        status: "unknown" | "active" | "closed"
    },
}



export type ClientYoutube_I18nMap = {
    "ClientYoutube_Authorized" : undefined
    "ClientYoutube_NotAuthorized" : undefined,
    "ClientYoutube_new_live" : { id : string }
    "ClientYoutube_getIdLives_error" : undefined
    "ClientYoutube_NotRun" : undefined
}
export type ClientYoutube_EnvConfigMap = 
    "YOUTUBE_CLIENT_RUN" |
    "YOUTUBE_CLIENT_CHAT_RECONNECT_TIME "|
    "YOUTUBE_CLIENT_CHECK_LIVE_TIME" | 
    "YOUTUBE_CLIENT_CREDENTIALS_PATH" | 
    "YOUTUBE_CLIENT_TOKEN_PATH" | 
    "YOUTUBE_CLIENT_SERVEUR_PORT" | 
    "YOUTUBE_CLIENT_SERVEUR_URL" | 
    "YOUTUBE_CLIENT_PROTO_PATH"
export type ClientYoutube_Event = {
    "Observator" : { Observator : ChatObservator }
}