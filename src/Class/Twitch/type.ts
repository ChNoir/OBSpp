
export type TwitcheVersionAPI = "1" | "2" | "beta"

export type TwitchEventSubName =
  | "automod.message.hold"
  | "automod.message.update"
  | "automod.settings.update"
  | "automod.terms.update"
  | "channel.bits.use"
  | "channel.update"
  | "channel.follow"
  | "channel.ad_break.begin"
  | "channel.chat.clear"
  | "channel.chat.clear_user_messages"
  | "channel.chat.message"
  | "channel.chat.message_delete"
  | "channel.chat.notification"
  | "channel.chat_settings.update"
  | "channel.chat.user_message_hold"
  | "channel.chat.user_message_update"
  | "channel.shared_chat.begin"
  | "channel.shared_chat.update"
  | "channel.shared_chat.end"
  | "channel.subscribe"
  | "channel.subscription.end"
  | "channel.subscription.gift"
  | "channel.subscription.message"
  | "channel.cheer"
  | "channel.raid"
  | "channel.ban"
  | "channel.unban"
  | "channel.unban_request.create"
  | "channel.unban_request.resolve"
  | "channel.moderate"
  | "channel.moderator.add"
  | "channel.moderator.remove"
  | "channel.guest_star_session.begin"
  | "channel.guest_star_session.end"
  | "channel.guest_star_guest.update"
  | "channel.guest_star_settings.update"
  | "channel.channel_points_automatic_reward_redemption.add"
  | "channel.channel_points_custom_reward.add"
  | "channel.channel_points_custom_reward.update"
  | "channel.channel_points_custom_reward.remove"
  | "channel.channel_points_custom_reward_redemption.add"
  | "channel.channel_points_custom_reward_redemption.update"
  | "channel.poll.begin"
  | "channel.poll.progress"
  | "channel.poll.end"
  | "channel.prediction.begin"
  | "channel.prediction.progress"
  | "channel.prediction.lock"
  | "channel.prediction.end"
  | "channel.suspicious_user.message"
  | "channel.suspicious_user.update"
  | "channel.vip.add"
  | "channel.vip.remove"
  | "channel.warning.acknowledge"
  | "channel.warning.send"
  | "channel.charity_campaign.donate"
  | "channel.charity_campaign.start"
  | "channel.charity_campaign.progress"
  | "channel.charity_campaign.stop"
  | "conduit.shard.disabled"
  | "drop.entitlement.grant"
  | "extension.bits_transaction.create"
  | "channel.goal.begin"
  | "channel.goal.progress"
  | "channel.goal.end"
  | "channel.hype_train.begin"
  | "channel.hype_train.progress"
  | "channel.hype_train.end"
  | "channel.shield_mode.begin"
  | "channel.shield_mode.end"
  | "channel.shoutout.create"
  | "channel.shoutout.receive"
  | "stream.online"
  | "stream.offline"
  | "user.authorization.grant"
  | "user.authorization.revoke"
  | "user.update"
  | "user.whisper.message";

export type ClientTwitchEventMap = {

    register : {},
    "automod.message.hold"              : { message : TwitchMessage<{ [key: string]: any;}>},
    "automod.message.update"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "automod.settings.update"           : { message : TwitchMessage<{ [key: string]: any;}>},
    "automod.terms.update"              : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.bits.use"                  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.update"                    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.follow"                    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.ad_break.begin"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.clear"                : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.clear_user_messages"  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.message"              : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.message_delete"       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.notification"         : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat_settings.update"      : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.user_message_hold"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.chat.user_message_update"  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shared_chat.begin"         : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shared_chat.update"        : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shared_chat.end"           : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.subscribe"                 : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.subscription.end"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.subscription.gift"         : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.subscription.message"      : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.cheer"                     : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.raid"                      : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.ban"                       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.unban"                     : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.unban_request.create"      : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.unban_request.resolve"     : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.moderate"                  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.moderator.add"             : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.moderator.remove"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.guest_star_session.begin"  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.guest_star_session.end"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.guest_star_guest.update"   : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.guest_star_settings.update": { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_automatic_reward_redemption.add"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_custom_reward.add"                  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_custom_reward.update"               : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_custom_reward.remove"               : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_custom_reward_redemption.add"       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.channel_points_custom_reward_redemption.update"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.poll.begin"                : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.poll.progress"             : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.poll.end"                  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.prediction.begin"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.prediction.progress"       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.prediction.lock"           : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.prediction.end"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.suspicious_user.message"   : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.suspicious_user.update"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.vip.add"                   : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.vip.remove"                : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.warning.acknowledge"       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.warning.send"              : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.charity_campaign.donate"   : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.charity_campaign.start"    : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.charity_campaign.progress" : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.charity_campaign.stop"     : { message : TwitchMessage<{ [key: string]: any;}>},
    "conduit.shard.disabled"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "drop.entitlement.grant"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "extension.bits_transaction.create" : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.goal.begin"                : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.goal.progress"             : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.goal.end"                  : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.hype_train.begin"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.hype_train.progress"       : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.hype_train.end"            : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shield_mode.begin"         : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shield_mode.end"           : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shoutout.create"           : { message : TwitchMessage<{ [key: string]: any;}>},
    "channel.shoutout.receive"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "stream.online"                     : { message : TwitchMessage<{ [key: string]: any;}>},
    "stream.offline"                    : { message : TwitchMessage<{ [key: string]: any;}>},
    "user.authorization.grant"          : { message : TwitchMessage<{ [key: string]: any;}>},
    "user.authorization.revoke"         : { message : TwitchMessage<{ [key: string]: any;}>},
    "user.update"                       : { message : TwitchMessage<{ [key: string]: any;}>},
    "user.whisper.message"              : { message : TwitchMessage<{ [key: string]: any;}>},
}


export type TypeSubscription = {
    id: string,
    status: string,
    type: TwitchEventSubName,
    version: string,
    condition: {
      broadcaster_user_id: string,
      user_id: string
    },
    transport: {
      method: string,
      session_id: string
    },
    created_at: string,
    cost: number
}

export type TwitchMessage<TypeEvent = Record<string, unknown> > = {
    metadata : {
        message_id : string
        message_type :  "session_welcome" | "notification" | "session_keepalive" | string
        message_timestamp : string
        subscription_type : string
        subscription_version : string
    }
    payload : {
        event? : TypeEvent ,
        session? : {
            id : string
            status : string
            connected_at : string
            keepalive_timeout_seconds : number
            reconnect_url : string | undefined

        }
        subscription? : TypeSubscription

    }
}

export type TwitchSondage = {
    broadcaster_id : string
    title : string
    choices : Array<{ title : string }>
    duration : number
    channel_points_per_vote ?: number
    channel_points_voting_enabled ?: boolean

}

export type TwitchInfoStreams = {
    data : Array<{
        id : string
        user_id : string
        user_login : string
        user_name: string
        game_id: string,
        game_name: string,
        type: "live" | "all",
        title: string,
        tags: string[],
        viewer_count: number,
        started_at: string,
        language: string,
        thumbnail_url: string,
        tag_ids: string[],
        is_mature: boolean
    }>,
    pagination: {
        cursor : string
    }
}