export interface ActionMap {
    "set_qq_profile": {
        "params": {
            "nickname": string,
            "personal_note": string,
            "sex": "0"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_doubt_friends_add_request": {
        "params": {
            "count": 50
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "flag": string,
                    "uin": string,
                    "nick": string,
                    "source": string,
                    "reason": string,
                    "msg": string,
                    "group_code": string,
                    "time": string,
                    "type": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "ArkSharePeer": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "phoneNumber": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "errCode": 0,
                "errMsg": string,
                "arkJson": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_doubt_friends_add_request": {
        "params": {
            "flag": string,
            "approve": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {},
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_online_clients": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                string
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "mark_msg_as_read": {
        "params": {
            "group_id": 0,
            "user_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "ArkShareGroup": {
        "params": {
            "group_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": string,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_online_status": {
        "params": {
            "status": 10,
            "ext_status": 0,
            "battery_status": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_friends_with_category": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "categoryId": 0,
                    "categorySortId": 0,
                    "categoryName": string,
                    "categoryMbCount": 0,
                    "onlineCount": 0,
                    "buddyList": [
                        {
                            "birthday_year": 0,
                            "birthday_month": 0,
                            "birthday_day": 0,
                            "user_id": 0,
                            "age": 0,
                            "phone_num": string,
                            "email": string,
                            "category_id": 0,
                            "nickname": string,
                            "remark": string,
                            "sex": string,
                            "level": 0
                        }
                    ]
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_qq_avatar": {
        "params": "{\r\n    // 本地路径\r\n    \"file\": \"D:/a.jpg\"\r\n    // 网络路径\r\n    // \"file\": \"http://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png\"\r\n    // \"file\": \"base64 或 DataURL\"\r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_like": {
        "params": {
            "user_id": 0,
            "times": 1
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "mark_private_msg_as_read": {
        "params": {
            "user_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "mark_group_msg_as_read": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "create_collection": {
        "params": {
            "rawData": "http://localhost:2017/",
            "brief": "123"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_friend_add_request": {
        "params": {
            "flag": string,
            "approve": true,
            "remark": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_self_longnick": {
        "params": {
            "longNick": "唔，瓦拉瓦拉"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_login_info": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "user_id": 0,
                "nickname": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_recent_contact": {
        "params": {
            "count": 10
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "lastestMsg": {
                        "self_id": 0,
                        "user_id": 0,
                        "time": 0,
                        "real_seq": string,
                        "message_type": string,
                        "sender": {
                            "user_id": 0,
                            "nickname": string,
                            "sex": "[",
                            "age": 0,
                            "card": string,
                            "role": "["
                        },
                        "raw_message": string,
                        "font": 0,
                        "sub_type": string,
                        "message": [
                            {}
                        ],
                        "message_format": string,
                        "post_type": string,
                        "group_id": 0
                    },
                    "peerUin": string,
                    "remark": string,
                    "msgTime": string,
                    "chatType": 0,
                    "msgId": string,
                    "sendNickName": string,
                    "sendMemberName": string,
                    "peerName": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_stranger_info": {
        "params": {
            "user_id": 1627126029
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "user_id": 0,
                "uid": string,
                "uin": string,
                "nickname": string,
                "age": 0,
                "qid": string,
                "qqLevel": 0,
                "sex": string,
                "long_nick": string,
                "reg_time": 0,
                "is_vip": true,
                "is_years_vip": true,
                "vip_level": 0,
                "remark": string,
                "status": 0,
                "login_days": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_friend_list": {
        "params": {
            "no_cache": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "birthday_year": 0,
                    "birthday_month": 0,
                    "birthday_day": 0,
                    "user_id": 0,
                    "age": 0,
                    "phone_num": string,
                    "email": string,
                    "category_id": 0,
                    "nickname": string,
                    "remark": string,
                    "sex": string,
                    "level": 0
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_mark_all_as_read": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_profile_like": {
        "params": {
            "user_id": 0,
            "start": 0,
            "count": 10
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "uid": string,
                "time": 0,
                "favoriteInfo": {
                    "total_count": 0,
                    "last_time": 0,
                    "today_count": 0,
                    "userInfos": [
                        {
                            "uid": string,
                            "src": 0,
                            "latestTime": 0,
                            "count": 0,
                            "giftCount": 0,
                            "customId": 0,
                            "lastCharged": 0,
                            "bAvailableCnt": 0,
                            "bTodayVotedCnt": 0,
                            "nick": string,
                            "gender": 0,
                            "age": 0,
                            "isFriend": true,
                            "isvip": true,
                            "isSvip": true,
                            "uin": 0
                        }
                    ]
                },
                "voteInfo": {
                    "total_count": 0,
                    "new_count": 0,
                    "new_nearby_count": 0,
                    "last_visit_time": 0,
                    "userInfos": [
                        {
                            "uid": string,
                            "src": 0,
                            "latestTime": 0,
                            "count": 0,
                            "giftCount": 0,
                            "customId": 0,
                            "lastCharged": 0,
                            "bAvailableCnt": 0,
                            "bTodayVotedCnt": 0,
                            "nick": string,
                            "gender": 0,
                            "age": 0,
                            "isFriend": true,
                            "isvip": true,
                            "isSvip": true,
                            "uin": 0
                        }
                    ]
                }
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "fetch_custom_face": {
        "params": {
            "count": 40
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                string
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "delete_friend": {
        "params": {
            "user_id": 0,
            "friend_id": 0,
            "temp_block": true,
            "temp_both_del": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_get_model_show": {
        "params": {
            "model": "napcat"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "variants": {
                        "model_show": string,
                        "need_pay": true
                    }
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_set_model_show": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "nc_get_user_status": {
        "params": {
            "user_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "status": 0,
                "ext_status": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_status": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "online": true,
                "good": true,
                "stat": {}
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_mini_app_ark": {
        "params": {
            "type": "bili",
            "title": "拾雪的一天",
            "desc": "vlog记录一天的生活",
            "picUrl": "https://thirdqq.qlogo.cn/g?b=oidb&k=09ElpZZZUTHFhoIlvs0lFg&kti=ZyBvjxHhVOI&s=640",
            "jumpUrl": "pages/video/video?bvid=BV1GJ411x7h7/"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "appName": string,
                "appView": string,
                "ver": string,
                "desc": string,
                "prompt": string,
                "metaData": {
                    "detail_1": {
                        "appid": null,
                        "appType": null,
                        "title": null,
                        "desc": null,
                        "icon": null,
                        "preview": null,
                        "url": null,
                        "scene": null,
                        "host": null,
                        "shareTemplateId": null,
                        "shareTemplateData": null,
                        "showLittleTail": null,
                        "gamePoints": null,
                        "gamePointsUrl": null,
                        "shareOrigin": null
                    }
                },
                "config": {
                    "type": string,
                    "width": 0,
                    "height": 0,
                    "forward": 0,
                    "autoSize": 0,
                    "ctime": 0,
                    "token": string
                }
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_unidirectional_friend_list": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "uin": 0,
                    "uid": string,
                    "nick_name": string,
                    "age": 0,
                    "source": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_diy_online_status": {
        "params": {
            "face_id": 10,
            "face_type": 1,
            "wording": "欸嘿"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": string,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_friend_remark": {
        "params": {
            "user_id": 0,
            "remark": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_poke": {
        "params": {
            "user_id": 1129317309,
            "group_id": 790514019,
            "target_id": 1284508970
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "delete_msg": {
        "params": {
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_msg_history": {
        "params": {
            "group_id": 0,
            "message_seq": 0,
            "count": 20,
            "reverseOrder": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "messages": [
                    {
                        "self_id": 0,
                        "user_id": 0,
                        "time": 0,
                        "message_id": 0,
                        "message_seq": 0,
                        "real_id": 0,
                        "real_seq": string,
                        "message_type": string,
                        "sender": {
                            "user_id": 0,
                            "nickname": string,
                            "sex": "[",
                            "age": 0,
                            "card": string,
                            "role": "["
                        },
                        "raw_message": string,
                        "font": 0,
                        "sub_type": string,
                        "message": [
                            {}
                        ],
                        "message_format": string,
                        "post_type": string,
                        "group_id": 0
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_msg": {
        "params": {
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "self_id": 0,
                "user_id": 0,
                "time": 0,
                "message_id": 0,
                "message_seq": 0,
                "real_id": 0,
                "real_seq": string,
                "message_type": string,
                "sender": {
                    "user_id": 0,
                    "nickname": string,
                    "sex": "male",
                    "age": 0,
                    "card": string,
                    "role": "owner"
                },
                "raw_message": string,
                "font": 0,
                "sub_type": string,
                "message": [
                    {
                        "type": "text",
                        "data": {}
                    }
                ],
                "message_format": string,
                "post_type": string,
                "group_id": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_forward_msg": {
        "params": {
            "message_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "messages": [
                    {
                        "self_id": 0,
                        "user_id": 0,
                        "time": 0,
                        "message_id": 0,
                        "message_seq": 0,
                        "real_id": 0,
                        "real_seq": string,
                        "message_type": string,
                        "sender": {
                            "user_id": 0,
                            "nickname": string,
                            "sex": "[",
                            "age": 0,
                            "card": string,
                            "role": "["
                        },
                        "raw_message": string,
                        "font": 0,
                        "sub_type": string,
                        "message": [
                            {}
                        ],
                        "message_format": string,
                        "post_type": string,
                        "group_id": 0
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_msg_emoji_like": {
        "params": {
            "message_id": 0,
            "emoji_id": 0,
            "set": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_friend_msg_history": {
        "params": {
            "user_id": 0,
            "message_seq": 0,
            "count": 20,
            "reverseOrder": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "messages": [
                    {
                        "self_id": 0,
                        "user_id": 0,
                        "time": 0,
                        "message_id": 0,
                        "message_seq": 0,
                        "real_id": 0,
                        "real_seq": string,
                        "message_type": string,
                        "sender": {
                            "user_id": 0,
                            "nickname": string,
                            "sex": "[",
                            "age": 0,
                            "card": string,
                            "role": "["
                        },
                        "raw_message": string,
                        "font": 0,
                        "sub_type": string,
                        "message": [
                            {}
                        ],
                        "message_format": string,
                        "post_type": string,
                        "group_id": 0
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "fetch_emoji_like": {
        "params": {
            "message_id": 123456,
            "emojiId": "181",
            "emojiType": "1"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string,
                "emojiLikesList": [
                    {
                        "tinyId": string,
                        "nickName": string,
                        "headUrl": string
                    }
                ],
                "cookie": string,
                "isLastPage": true,
                "isFirstPage": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_forward_msg": {
        "params": "{\r\n    \"group_id\": 1232456,\r\n    \"messages\": [\r\n        {\r\n            \"type\": \"node\",\r\n            \"data\": {\r\n                \"user_id\": 925236771,\r\n                \"nickname\": \"达艳\",\r\n                \"content\": [\r\n                    {\r\n                        \"type\": \"text\",\r\n                        \"data\": {\r\n                            \"text\": \"适配 DeepSeek 官方 API 和 Vocu 的 tss\"\r\n                        }\r\n                    }\r\n                ],\r\n            }\r\n        }\r\n    ],\r\n    \"news\": [\r\n        {\r\n            \"text\": \"奇怪\"\r\n        }\r\n    ],\r\n    \"prompt\": \"123\",\r\n    \"summary\": \"123\",\r\n    \"source\": \"123\"\r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {},
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_record": {
        "params": {
            "file": string,
            "file_id": string,
            "out_format": "mp3"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "file": string,
                "url": string,
                "file_size": string,
                "file_name": string,
                "base64": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_image": {
        "params": {
            "file_id": "226723D7B1EE3BF02E9CFD8236EE468B.jpg"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "file": string,
                "url": string,
                "file_size": string,
                "file_name": string,
                "base64": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_group_ai_record": {
        "params": {
            "group_id": 0,
            "character": string,
            "text": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_group_forward_msg": {
        "params": {
            "group_id": 0,
            "messages": [
                {
                    "type": "node",
                    "data": {
                        "user_id": string,
                        "nickname": string,
                        "content": [
                            {}
                        ]
                    }
                }
            ],
            "news": [
                {
                    "text": string
                }
            ],
            "prompt": string,
            "summary": string,
            "source": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": 0,
                "res_id": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "forward_group_single_msg": {
        "params": {
            "group_id": 0,
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "group_poke": {
        "params": {
            "group_id": 0,
            "user_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_private_forward_msg": {
        "params": {
            "user_id": 0,
            "messages": [
                {
                    "type": "node",
                    "data": {
                        "nickname": string,
                        "user_id": 0,
                        "content": [
                            {}
                        ]
                    }
                }
            ]
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": 0,
                "res_id": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "forward_friend_single_msg": {
        "params": {
            "user_id": 0,
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "friend_poke": {
        "params": {
            "user_id": "1129317309",
            "target_id": "123"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_search": {
        "params": {
            "group_id": 0,
            "no_code_finger_open": 0,
            "no_finger_open": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_detail_info": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "group_all_shut": 0,
                "group_remark": string,
                "group_id": 0,
                "group_name": string,
                "member_count": 0,
                "max_member_count": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_add_option": {
        "params": {
            "group_id": 0,
            "add_type": string,
            "group_question": string,
            "group_answer": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_robot_add_option": {
        "params": {
            "group_id": 0,
            "robot_member_switch": 0,
            "robot_member_examine": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_kick_members": {
        "params": {
            "group_id": 0,
            "user_id": [
                0
            ],
            "reject_add_request": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_remark": {
        "params": {
            "group_id": 819085771,
            "remark": "呀呼！！！"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_kick": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "reject_add_request": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_system_msg": {
        "params": {
            "count": 50
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "InvitedRequest": [
                    {
                        "request_id": 0,
                        "invitor_uin": 0,
                        "invitor_nick": string,
                        "group_id": 0,
                        "message": string,
                        "group_name": string,
                        "checked": true,
                        "actor": 0,
                        "requester_nick": string
                    }
                ],
                "join_requests": [
                    {
                        "request_id": 0,
                        "invitor_uin": 0,
                        "invitor_nick": string,
                        "group_id": 0,
                        "message": string,
                        "group_name": string,
                        "checked": true,
                        "actor": 0,
                        "requester_nick": string
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_ban": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "duration": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_essence_msg_list": {
        "params": {
            "group_id": 1012451981
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "msg_seq": 0,
                    "msg_random": 0,
                    "sender_id": 0,
                    "sender_nick": string,
                    "operator_id": 0,
                    "operator_nick": string,
                    "message_id": 0,
                    "operator_time": 0,
                    "content": [
                        {
                            "type": null,
                            "data": null
                        }
                    ]
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_whole_ban": {
        "params": {
            "group_id": 0,
            "enable": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_portrait": {
        "params": "{\r\n    \"group_id\": 123456,\r\n    //网络路径\r\n    \"file\": \"http://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png\"\r\n    // 本地路径\r\n    //\"file\": \"file://D:/a.jpg\"\r\n                \r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": "success"
            },
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "set_group_admin": {
        "params": {
            "group_id": 123456,
            "user_id": 123456,
            "enable": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_card": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "card": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_essence_msg": {
        "params": {
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "errCode": 0,
                "errMsg": "success",
                "result": {
                    "wording": "",
                    "digestUin": "0",
                    "digestTime": 0,
                    "msg": {
                        "groupCode": "0",
                        "msgSeq": 0,
                        "msgRandom": 0,
                        "msgContent": [],
                        "textSize": "0",
                        "picSize": "0",
                        "videoSize": "0",
                        "senderUin": "0",
                        "senderTime": 0,
                        "addDigestUin": "0",
                        "addDigestTime": 0,
                        "startTime": 0,
                        "latestMsgSeq": 0,
                        "opType": 0
                    },
                    "errorCode": 0
                }
            },
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "set_group_name": {
        "params": {
            "group_id": 0,
            "group_name": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "delete_essence_msg": {
        "params": {
            "message_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "errCode": 0,
                "errMsg": "success",
                "result": {
                    "wording": "",
                    "digestUin": "0",
                    "digestTime": 0,
                    "msg": {
                        "groupCode": "0",
                        "msgSeq": 0,
                        "msgRandom": 0,
                        "msgContent": [],
                        "textSize": "0",
                        "picSize": "0",
                        "videoSize": "0",
                        "senderUin": "0",
                        "senderTime": 0,
                        "addDigestUin": "0",
                        "addDigestTime": 0,
                        "startTime": 0,
                        "latestMsgSeq": 0,
                        "opType": 0
                    },
                    "errorCode": 0
                }
            },
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "set_group_leave": {
        "params": {
            "group_id": 0,
            "is_dismiss": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_send_group_notice": {
        "params": {
            "group_id": 0,
            "content": string,
            "image": string,
            "pinned": 0,
            "type": 0,
            "confirm_required": 0,
            "is_show_edit_card": 0,
            "tip_window_type": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_special_title": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "special_title": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_get_group_notice": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "notice_id": "63491e2f000000004f4d1e677d2b0200",
                    "sender_id": 123,
                    "publish_time": 1730039119,
                    "message": {
                        "text": "这是一条神奇的群公告",
                        "image": [
                            {
                                "id": "aJJBbZ6BqyLiaC1kmpvIWGBBkJerEfpRBHX5Brxbaurs",
                                "height": "400",
                                "width": "400"
                            }
                        ]
                    }
                }
            ],
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "set_group_add_request": {
        "params": {
            "flag": string,
            "approve": true,
            "reason": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_info": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "group_all_shut": 0,
                "group_remark": string,
                "group_id": string,
                "group_name": string,
                "member_count": 0,
                "max_member_count": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_list": {
        "params": {
            "no_cache": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "group_all_shut": 0,
                    "group_remark": string,
                    "group_id": string,
                    "group_name": string,
                    "member_count": 0,
                    "max_member_count": 0
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "_del_group_notice": {
        "params": {
            "group_id": 0,
            "notice_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_member_info": {
        "params": {
            "group_id": 0,
            "user_id": 0,
            "no_cache": true
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "group_id": 0,
                "user_id": 0,
                "nickname": string,
                "card": string,
                "sex": string,
                "age": 0,
                "join_time": 0,
                "last_sent_time": 0,
                "level": 0,
                "qq_level": 0,
                "role": string,
                "title": string,
                "area": string,
                "unfriendly": true,
                "title_expire_time": 0,
                "card_changeable": true,
                "shut_up_timestamp": 0,
                "is_robot": true,
                "qage": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_member_list": {
        "params": {
            "group_id": 0,
            "no_cache": false
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "group_id": 0,
                    "user_id": 0,
                    "nickname": string,
                    "card": string,
                    "sex": string,
                    "age": 0,
                    "join_time": 0,
                    "last_sent_time": 0,
                    "level": 0,
                    "qq_level": 0,
                    "role": string,
                    "title": string,
                    "area": string,
                    "unfriendly": true,
                    "title_expire_time": 0,
                    "card_changeable": true,
                    "shut_up_timestamp": 0,
                    "is_robot": true,
                    "qage": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_honor_info": {
        "params": {
            "group_id": 0,
            "type": "all"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "group_id": string,
                "current_talkative": {
                    "user_id": 0,
                    "nickname": string,
                    "avatar": 0,
                    "description": string
                },
                "talkative_list": [
                    {
                        "user_id": 0,
                        "nickname": string,
                        "avatar": 0,
                        "description": string
                    }
                ],
                "performer_list": [
                    {
                        "user_id": 0,
                        "nickname": string,
                        "avatar": 0,
                        "description": string
                    }
                ],
                "legend_list": [
                    {
                        "user_id": 0,
                        "nickname": string,
                        "avatar": 0,
                        "description": string
                    }
                ],
                "emotion_list": [
                    {
                        "user_id": 0,
                        "nickname": string,
                        "avatar": 0,
                        "description": string
                    }
                ],
                "strong_newbie_list": [
                    {
                        "user_id": 0,
                        "nickname": string,
                        "avatar": 0,
                        "description": string
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_info_ex": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "groupCode": "790514019",
                "resultCode": 0,
                "extInfo": {
                    "groupInfoExtSeq": 1,
                    "reserve": 0,
                    "luckyWordId": "0",
                    "lightCharNum": 0,
                    "luckyWord": "",
                    "starId": 0,
                    "essentialMsgSwitch": 0,
                    "todoSeq": 0,
                    "blacklistExpireTime": 0,
                    "isLimitGroupRtc": 0,
                    "companyId": 0,
                    "hasGroupCustomPortrait": 1,
                    "bindGuildId": "0",
                    "groupOwnerId": {
                        "memberUin": "1129317309",
                        "memberUid": "u_4_QA-QaFryh-Ocgsv4_8EQ",
                        "memberQid": ""
                    },
                    "essentialMsgPrivilege": 0,
                    "msgEventSeq": "0",
                    "inviteRobotSwitch": 0,
                    "gangUpId": "0",
                    "qqMusicMedalSwitch": 0,
                    "showPlayTogetherSwitch": 0,
                    "groupFlagPro1": "0",
                    "groupBindGuildIds": {
                        "guildIds": []
                    },
                    "viewedMsgDisappearTime": "0",
                    "groupExtFlameData": {
                        "switchState": 0,
                        "state": 0,
                        "dayNums": [],
                        "version": 0,
                        "updateTime": "0",
                        "isDisplayDayNum": false
                    },
                    "groupBindGuildSwitch": 0,
                    "groupAioBindGuildId": "0",
                    "groupExcludeGuildIds": {
                        "guildIds": []
                    },
                    "fullGroupExpansionSwitch": 0,
                    "fullGroupExpansionSeq": "0",
                    "inviteRobotMemberSwitch": 0,
                    "inviteRobotMemberExamine": 0,
                    "groupSquareSwitch": 0
                }
            },
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "get_group_at_all_remain": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "can_at_all": true,
                "remain_at_all_count_for_group": 0,
                "remain_at_all_count_for_uin": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_shut_list": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "uid": string,
                    "qid": string,
                    "uin": string,
                    "nick": string,
                    "remark": string,
                    "cardType": 0,
                    "cardName": string,
                    "role": 0,
                    "avatarPath": string,
                    "shutUpTime": 0,
                    "isDelete": true,
                    "isSpecialConcerned": true,
                    "isSpecialShield": true,
                    "isRobot": true,
                    "groupHonor": {},
                    "memberRealLevel": 0,
                    "memberLevel": 0,
                    "globalGroupLevel": 0,
                    "globalGroupPoint": 0,
                    "memberTitleId": 0,
                    "memberSpecialTitle": string,
                    "specialTitleExpireTime": string,
                    "userShowFlag": 0,
                    "userShowFlagNew": 0,
                    "richFlag": 0,
                    "mssVipType": 0,
                    "bigClubLevel": 0,
                    "bigClubFlag": 0,
                    "autoRemark": string,
                    "creditLevel": 0,
                    "joinTime": 0,
                    "lastSpeakTime": 0,
                    "memberFlag": 0,
                    "memberFlagExt": 0,
                    "memberMobileFlag": 0,
                    "memberFlagExt2": 0,
                    "isSpecialShielded": true,
                    "cardNameId": 0
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_ignored_notifies": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "InvitedRequest": [
                    {
                        "request_id": 0,
                        "invitor_uin": 0,
                        "invitor_nick": string,
                        "group_id": 0,
                        "message": string,
                        "group_name": string,
                        "checked": true,
                        "actor": 0,
                        "requester_nick": string
                    }
                ],
                "join_requests": [
                    {
                        "request_id": 0,
                        "invitor_uin": 0,
                        "invitor_nick": string,
                        "group_id": 0,
                        "message": string,
                        "group_name": string,
                        "checked": true,
                        "actor": 0,
                        "requester_nick": string
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "set_group_sign": {
        "params": {
            "group_id": string
        },
        "response": {}
    },
    "send_group_sign": {
        "params": {
            "group_id": string
        },
        "response": {}
    },
    "move_group_file": {
        "params": {
            "group_id": 123456,
            "file_id": "ee87348ece794e778a4ac9e81f2edb17",
            "current_parent_directory": "/",
            "target_parent_directory": "/ca0f1860-6362-4777-bc50-9f31993c6877"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "ok": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "trans_group_file": {
        "params": {
            "group_id": 0,
            "file_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "ok": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "rename_group_file": {
        "params": {
            "group_id": 123456,
            "file_id": "27c94e1fff104282b8b07368c984e221",
            "current_parent_directory": "/ca0f1860-6362-4777-bc50-9f31993c6877",
            "new_name": "吃糖葫芦.mp4"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "ok": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_file": {
        "params": {
            "file_id": string,
            "file": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "file": string,
                "url": string,
                "file_size": string,
                "file_name": string,
                "base64": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "upload_group_file": {
        "params": {
            "group_id": 0,
            "file": string,
            "name": string,
            "folder": string,
            "folder_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "create_group_file_folder": {
        "params": {
            "group_id": 790514019,
            "folder_name": "ABC"
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": {
                    "retCode": 0,
                    "retMsg": string,
                    "clientWording": string
                },
                "groupItem": {
                    "peerId": string,
                    "type": 0,
                    "folderInfo": {
                        "folderId": string,
                        "parentFolderId": string,
                        "folderName": string,
                        "createTime": 0,
                        "modifyTime": 0,
                        "createUin": string,
                        "creatorName": string,
                        "totalFileCount": 0,
                        "modifyUin": string,
                        "modifyName": string,
                        "usedSpace": string
                    },
                    "fileInfo": string
                }
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "delete_group_file": {
        "params": {
            "group_id": 0,
            "file_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string,
                "transGroupFileResult": {
                    "result": {
                        "retCode": 0,
                        "retMsg": string,
                        "clientWording": string
                    },
                    "successFileIdList": [
                        string
                    ],
                    "failFileIdList": [
                        string
                    ]
                }
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "delete_group_folder": {
        "params": {
            "group_id": 0,
            "folder_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "retCode": 0,
                "retMsg": string,
                "clientWording": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "upload_private_file": {
        "params": {
            "user_id": 0,
            "file": string,
            "name": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_file_system_info": {
        "params": {
            "group_id": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "file_count": 0,
                "limit_count": 0,
                "used_space": 0,
                "total_space": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "download_file": {
        "params": {
            "url": string,
            "base64": string,
            "name": string,
            "headers": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "file": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_root_files": {
        "params": {
            "group_id": 0,
            "file_count": 50
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "files": [
                    {
                        "group_id": 0,
                        "file_id": string,
                        "file_name": string,
                        "busid": 0,
                        "size": 0,
                        "file_size": 0,
                        "upload_time": 0,
                        "dead_time": 0,
                        "modify_time": 0,
                        "download_times": 0,
                        "uploader": 0,
                        "uploader_name": string
                    }
                ],
                "folders": [
                    {
                        "group_id": 0,
                        "folder_id": string,
                        "folder": string,
                        "folder_name": string,
                        "create_time": 0,
                        "creator": 0,
                        "creator_name": string,
                        "total_file_count": 0
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_files_by_folder": {
        "params": {
            "group_id": 0,
            "folder_id": string,
            "folder": string,
            "file_count": 50
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "files": [
                    {
                        "group_id": 0,
                        "file_id": string,
                        "file_name": string,
                        "busid": 0,
                        "size": 0,
                        "file_size": 0,
                        "upload_time": 0,
                        "dead_time": 0,
                        "modify_time": 0,
                        "download_times": 0,
                        "uploader": 0,
                        "uploader_name": string
                    }
                ],
                "folders": [
                    {
                        "group_id": 0,
                        "folder_id": string,
                        "folder": string,
                        "folder_name": string,
                        "create_time": 0,
                        "creator": 0,
                        "creator_name": string,
                        "total_file_count": 0
                    }
                ]
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_file_url": {
        "params": {
            "group_id": 0,
            "file_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "url": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_private_file_url": {
        "params": {
            "file_id": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "url": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "clean_cache": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_clientkey": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "clientkey": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_cookies": {
        "params": {
            "domain": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "cookies": string,
                "bkn": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_csrf_token": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "token": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_credentials": {
        "params": {
            "domain": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "cookies": string,
                "token": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "nc_get_rkey": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "rkey": string,
                    "ttl": string,
                    "time": 0,
                    "type": 0
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_rkey": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "type": string,
                    "rkey": string,
                    "created_at": 0,
                    "ttl": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_rkey_server": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "private_rkey": string,
                "group_rkey": string,
                "expired_time": 0,
                "name": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "ocr_image": {
        "params": "{\r\n    \"image\": \"https://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png\"\r\n    // 本地路径\r\n    //\"image\": \"file://D:/a.jpg\"\r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "text": "nU",
                    "pt1": {
                        "x": "25.930853",
                        "y": "1.711797"
                    },
                    "pt2": {
                        "x": "72.461205",
                        "y": "2.745806"
                    },
                    "pt3": {
                        "x": "72.193184",
                        "y": "14.806514"
                    },
                    "pt4": {
                        "x": "25.662836",
                        "y": "13.772506"
                    },
                    "charBox": [
                        {
                            "charText": "nU",
                            "charBox": {
                                "pt1": {
                                    "x": "41.186707",
                                    "y": "2.050816"
                                },
                                "pt2": {
                                    "x": "56.442558",
                                    "y": "2.389835"
                                },
                                "pt3": {
                                    "x": "56.182915",
                                    "y": "14.073647"
                                },
                                "pt4": {
                                    "x": "40.927063",
                                    "y": "13.734628"
                                }
                            }
                        }
                    ],
                    "score": ""
                },
                {
                    "text": "yion in",
                    "pt1": {
                        "x": "40.310081",
                        "y": "19.155090"
                    },
                    "pt2": {
                        "x": "92.413017",
                        "y": "17.004047"
                    },
                    "pt3": {
                        "x": "93.224297",
                        "y": "36.654957"
                    },
                    "pt4": {
                        "x": "41.121365",
                        "y": "38.806000"
                    },
                    "charBox": [
                        {
                            "charText": "yion",
                            "charBox": {
                                "pt1": {
                                    "x": "40.310081",
                                    "y": "19.155090"
                                },
                                "pt2": {
                                    "x": "66.660988",
                                    "y": "18.067207"
                                },
                                "pt3": {
                                    "x": "67.446922",
                                    "y": "37.104027"
                                },
                                "pt4": {
                                    "x": "41.096012",
                                    "y": "38.191910"
                                }
                            }
                        },
                        {
                            "charText": " ",
                            "charBox": {
                                "pt1": {
                                    "x": "66.660988",
                                    "y": "18.067207"
                                },
                                "pt2": {
                                    "x": "73.847603",
                                    "y": "17.770512"
                                },
                                "pt3": {
                                    "x": "74.633530",
                                    "y": "36.807331"
                                },
                                "pt4": {
                                    "x": "67.446922",
                                    "y": "37.104027"
                                }
                            }
                        },
                        {
                            "charText": "in",
                            "charBox": {
                                "pt1": {
                                    "x": "73.847603",
                                    "y": "17.770512"
                                },
                                "pt2": {
                                    "x": "85.825287",
                                    "y": "17.276018"
                                },
                                "pt3": {
                                    "x": "86.611214",
                                    "y": "36.312836"
                                },
                                "pt4": {
                                    "x": "74.633530",
                                    "y": "36.807331"
                                }
                            }
                        }
                    ],
                    "score": ""
                },
                {
                    "text": "mlHttp.",
                    "pt1": {
                        "x": "6.956338",
                        "y": "61.610126"
                    },
                    "pt2": {
                        "x": "72.331848",
                        "y": "65.844292"
                    },
                    "pt3": {
                        "x": "71.104248",
                        "y": "84.798470"
                    },
                    "pt4": {
                        "x": "5.728738",
                        "y": "80.564301"
                    },
                    "charBox": [
                        {
                            "charText": "mlHttp",
                            "charBox": {
                                "pt1": {
                                    "x": "9.230268",
                                    "y": "61.757401"
                                },
                                "pt2": {
                                    "x": "61.530674",
                                    "y": "65.144737"
                                },
                                "pt3": {
                                    "x": "60.341438",
                                    "y": "83.506592"
                                },
                                "pt4": {
                                    "x": "8.041031",
                                    "y": "80.119255"
                                }
                            }
                        },
                        {
                            "charText": ".",
                            "charBox": {
                                "pt1": {
                                    "x": "63.804607",
                                    "y": "65.292007"
                                },
                                "pt2": {
                                    "x": "70.626396",
                                    "y": "65.733833"
                                },
                                "pt3": {
                                    "x": "69.437164",
                                    "y": "84.095695"
                                },
                                "pt4": {
                                    "x": "62.615368",
                                    "y": "83.653870"
                                }
                            }
                        }
                    ],
                    "score": ""
                }
            ],
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    ".ocr_image": {
        "params": "{\r\n    \"image\": \"https://assets.cdn.ifixit.com/static/images/home/search-hero-backgrounds/car_tire-2180.avif\"\r\n    // 本地路径\r\n    //\"image\": \"file://D:/a.jpg\"\r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "text": "nU",
                    "pt1": {
                        "x": "25.930853",
                        "y": "1.711797"
                    },
                    "pt2": {
                        "x": "72.461205",
                        "y": "2.745806"
                    },
                    "pt3": {
                        "x": "72.193184",
                        "y": "14.806514"
                    },
                    "pt4": {
                        "x": "25.662836",
                        "y": "13.772506"
                    },
                    "charBox": [
                        {
                            "charText": "nU",
                            "charBox": {
                                "pt1": {
                                    "x": "41.186707",
                                    "y": "2.050816"
                                },
                                "pt2": {
                                    "x": "56.442558",
                                    "y": "2.389835"
                                },
                                "pt3": {
                                    "x": "56.182915",
                                    "y": "14.073647"
                                },
                                "pt4": {
                                    "x": "40.927063",
                                    "y": "13.734628"
                                }
                            }
                        }
                    ],
                    "score": ""
                },
                {
                    "text": "yion in",
                    "pt1": {
                        "x": "40.310081",
                        "y": "19.155090"
                    },
                    "pt2": {
                        "x": "92.413017",
                        "y": "17.004047"
                    },
                    "pt3": {
                        "x": "93.224297",
                        "y": "36.654957"
                    },
                    "pt4": {
                        "x": "41.121365",
                        "y": "38.806000"
                    },
                    "charBox": [
                        {
                            "charText": "yion",
                            "charBox": {
                                "pt1": {
                                    "x": "40.310081",
                                    "y": "19.155090"
                                },
                                "pt2": {
                                    "x": "66.660988",
                                    "y": "18.067207"
                                },
                                "pt3": {
                                    "x": "67.446922",
                                    "y": "37.104027"
                                },
                                "pt4": {
                                    "x": "41.096012",
                                    "y": "38.191910"
                                }
                            }
                        },
                        {
                            "charText": " ",
                            "charBox": {
                                "pt1": {
                                    "x": "66.660988",
                                    "y": "18.067207"
                                },
                                "pt2": {
                                    "x": "73.847603",
                                    "y": "17.770512"
                                },
                                "pt3": {
                                    "x": "74.633530",
                                    "y": "36.807331"
                                },
                                "pt4": {
                                    "x": "67.446922",
                                    "y": "37.104027"
                                }
                            }
                        },
                        {
                            "charText": "in",
                            "charBox": {
                                "pt1": {
                                    "x": "73.847603",
                                    "y": "17.770512"
                                },
                                "pt2": {
                                    "x": "85.825287",
                                    "y": "17.276018"
                                },
                                "pt3": {
                                    "x": "86.611214",
                                    "y": "36.312836"
                                },
                                "pt4": {
                                    "x": "74.633530",
                                    "y": "36.807331"
                                }
                            }
                        }
                    ],
                    "score": ""
                },
                {
                    "text": "mlHttp.",
                    "pt1": {
                        "x": "6.956338",
                        "y": "61.610126"
                    },
                    "pt2": {
                        "x": "72.331848",
                        "y": "65.844292"
                    },
                    "pt3": {
                        "x": "71.104248",
                        "y": "84.798470"
                    },
                    "pt4": {
                        "x": "5.728738",
                        "y": "80.564301"
                    },
                    "charBox": [
                        {
                            "charText": "mlHttp",
                            "charBox": {
                                "pt1": {
                                    "x": "9.230268",
                                    "y": "61.757401"
                                },
                                "pt2": {
                                    "x": "61.530674",
                                    "y": "65.144737"
                                },
                                "pt3": {
                                    "x": "60.341438",
                                    "y": "83.506592"
                                },
                                "pt4": {
                                    "x": "8.041031",
                                    "y": "80.119255"
                                }
                            }
                        },
                        {
                            "charText": ".",
                            "charBox": {
                                "pt1": {
                                    "x": "63.804607",
                                    "y": "65.292007"
                                },
                                "pt2": {
                                    "x": "70.626396",
                                    "y": "65.733833"
                                },
                                "pt3": {
                                    "x": "69.437164",
                                    "y": "84.095695"
                                },
                                "pt4": {
                                    "x": "62.615368",
                                    "y": "83.653870"
                                }
                            }
                        }
                    ],
                    "score": ""
                }
            ],
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "translate_en2zh": {
        "params": {
            "words": [
                "word",
                "message",
                "group"
            ]
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                "单词",
                "讯息",
                "群组"
            ],
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "set_input_status": {
        "params": {
            "user_id": 0,
            "event_type": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    ".handle_quick_operation": {
        "params": {
            "context": {},
            "operation": {}
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "can_send_image": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "yes": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "can_send_record": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "yes": true
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_ai_characters": {
        "params": {
            "group_id": 0,
            "chat_type": 0
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "type": string,
                    "characters": [
                        {
                            "character_id": string,
                            "character_name": string,
                            "preview_url": string
                        }
                    ]
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "click_inline_keyboard_button": {
        "params": {
            "group_id": 0,
            "bot_appid": string,
            "button_id": string,
            "callback_data": string,
            "msg_seq": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string,
                "status": 0,
                "promptText": string,
                "promptType": 0,
                "promptIcon": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_ai_record": {
        "params": {
            "group_id": 0,
            "character": string,
            "text": string
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": string,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_robot_uin_range": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "minUin": "3328144510",
                    "maxUin": "3328144510"
                },
                {
                    "minUin": "2854196301",
                    "maxUin": "2854216399"
                },
                {
                    "minUin": "66600000",
                    "maxUin": "66600000"
                },
                {
                    "minUin": "3889000000",
                    "maxUin": "3889999999"
                },
                {
                    "minUin": "4010000000",
                    "maxUin": "4019999999"
                }
            ],
            "message": "",
            "wording": "",
            "echo": null
        }
    },
    "bot_exit": {
        "params": {},
        "response": {}
    },
    "send_packet": {
        "params": {},
        "response": {}
    },
    "nc_get_packet_status": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": null,
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_version_info": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "app_name": string,
                "protocol_version": string,
                "app_version": string
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_group_msg": {
        "params": {
            "group_id": 0,
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": string
                    }
                }
            ]
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": 696124706
            },
            "message": "",
            "wording": ""
        }
    },
    "send_private_msg": {
        "params": {
            "user_id": 0,
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": string
                    }
                }
            ]
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "send_msg": {
        "params": "{\r\n    \"message_type\": \"private\", //group | private\r\n    \"group_id\": \"480972475\",\r\n    \"user_id\": \"480972475\", // type为group时不填写\r\n    \"message\": [\r\n        {\r\n            \"type\": \"text\",\r\n            \"data\": {\r\n                \"text\": \"用面才务。定比眼表县。写单写加很研科。打王运土照。化知金步家你龙。全展标新。\"\r\n            }\r\n        }\r\n    ]\r\n}",
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "message_id": 0
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "unknown": {
        "params": {},
        "response": {}
    },
    "get_guild_list": {
        "params": {},
        "response": {}
    },
    "get_guild_service_profile": {
        "params": {},
        "response": {}
    },
    "check_url_safely": {
        "params": {},
        "response": {}
    },
    "get_collection_list": {
        "params": {
            "category": 10,
            "count": 1
        },
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": {
                "result": 0,
                "errMsg": string,
                "collectionSearchList": {
                    "collectionItemList": [
                        {
                            "cid": string,
                            "type": 0,
                            "status": 0,
                            "author": {},
                            "bid": 0,
                            "category": 0,
                            "createTime": string,
                            "collectTime": string,
                            "modifyTime": string,
                            "sequence": string,
                            "shareUrl": string,
                            "customGroupId": 0,
                            "securityBeat": true,
                            "summary": {}
                        }
                    ],
                    "hasMore": true,
                    "bottomTimeStamp": string
                }
            },
            "message": string,
            "wording": string,
            "echo": string
        }
    },
    "get_group_ignore_add_request": {
        "params": {},
        "response": {
            "status": "ok",
            "retcode": 0,
            "data": [
                {
                    "request_id": 0,
                    "invitor_uin": 0,
                    "invitor_nick": string,
                    "group_id": 0,
                    "message": string,
                    "group_name": string,
                    "checked": true,
                    "actor": 0,
                    "requester_nick": string
                }
            ],
            "message": string,
            "wording": string,
            "echo": string
        }
    }
}