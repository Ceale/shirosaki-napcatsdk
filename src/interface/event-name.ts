export type EventName = 
    string & {} |
    "all" |

    "meta_event" |
    "meta_event.lifecycle" |
    "meta_event.lifecycle.connect" |
    "meta_event.heartbeat" |

    "message" |
    "message.private" |
    "message.private.friend" |
    "message.private.group" |
    "message.group" |
    "message.group.normal" |
    
    "message_sent" |
    "message_sent.private" |
    "message_sent.private.friend" |
    "message_sent.private.group" |
    "message_sent.group" |
    "message_sent.group.normal" |

    "request" |
    "request.friend" |
    "request.group" |
    "request.group.add" |
    "request.group.invite" |

    "notice" |
    "notice.friend_add" |
    "notice.friend_recall" |
    "notice.group_admin" |
    "notice.group_admin.set" |
    "notice.group_admin.unset" |
    "notice.group_ban" |
    "notice.group_ban.ban" |
    "notice.group_ban.lift_ban" |
    "notice.group_card" |
    "notice.group_decrease" |
    "notice.group_decrease.leave" |
    "notice.group_decrease.kick" |
    "notice.group_decrease.kick_me" |
    "notice.group_increase" |
    "notice.group_increase.approve" |
    "notice.group_increase.invite" |
    "notice.group_recall" |
    "notice.group_upload" |
    "notice.group_msg_emoji_like" |
    "notice.essence" |
    "notice.essence.add" |
    "notice.notify" |
    "notice.notify.poke" |
    "notice.notify.input_status" |
    "notice.notify.title" |
    "notice.notify.profile_like"