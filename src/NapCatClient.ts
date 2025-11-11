import EventEmitter from "node:events"
import { WebSocketManager } from "./WebSocketManager"
import { BindThis } from "./util/AutoBind"
import { assert, defineEnum, tryCatch, type EnumKeys } from "@ceale/util"
import type { Logger } from "./util/Logger"
import console from "node:console"
import type { ActionMap, ActionParams, ActionResp } from "./interface/action"
import type { EventName } from "./interface/event-name"
import { NCMessage } from "./service/NCMessage"
import { NCSelf } from "./service/NCSelf"
import { LegacyMessageAdapter } from "./legacy/MessageAdapter"


export interface NCClientConfig {
    /** 连接 NapCat 的 token */
    token?: string | null
    retry?: {
        /** 重连间隔(ms) 默认：5ms*/
        interval?: number
        /** 重连次数限制 默认：5 */
        limit?: number
    }
    /** 日志器 */
    logger?: Logger
    /** 是否开启调试模式　调试模式下会输出所有发出和接收到的数据等内容 */
    debug?: boolean
}

export const NC_CLIENT_STATE = defineEnum("OPEN", "CLOSE")

export class NapCatClient {
    // 配置
    private url: string
    private token: string | null
    private debug: boolean
    // 基础服务
    private logger: Logger
    private wsManager: WebSocketManager

    private _state: EnumKeys<typeof NC_CLIENT_STATE> = NC_CLIENT_STATE.CLOSE
    public get state() {
        return this._state
    }

    // 功能模块
    public Self: NCSelf
    public Message: NCMessage

    /**
     * @param url NapCat 的正向 WS 服务端地址
     * @param config 配置项，详见 {@link NCClientConfig}
     */
    constructor(url: string, config?: NCClientConfig);
    constructor(
        url: string,
        {
            token = null,
            retry: {
                limit = 5,
                interval = 5000
            } = {},
            logger = console,
            debug = false
        }: NCClientConfig = {}
    ) {
        if (url === undefined) throw new TypeError("url参数是必须的")
        this.url = url
        this.token = token
        this.debug = debug

        this.logger = {
            debug: this.debug ? logger.debug : () => {},
            info: logger.info,
            warn: logger.warn,
            error: logger.error
        }

        const headers = { ...(this.token ? { Authorization: this.token } : {}) }
        this.wsManager = new WebSocketManager(
            [ this.url, { headers }],
            this.dataHandler,
            { interval, limit },
            this.logger
        )

        this.Self = new NCSelf( this, this.logger, this.debug )
        this.Message = new NCMessage({ NCClient: this, Logger: this.logger }, { debug: this.debug })
    }

    @BindThis
    public async connect() {
        if (this.state === NC_CLIENT_STATE.OPEN) return true
        const success = await this.wsManager.open()
        if (success) this._state = NC_CLIENT_STATE.OPEN
        return success
    }

    @BindThis
    public async close () {
        if (this.state === NC_CLIENT_STATE.CLOSE) return true
        const success = await this.wsManager.close()
        if (success) this._state = NC_CLIENT_STATE.CLOSE
        return success
    }


    @BindThis
    public sendData(data: any) {
        this.logger.debug("发送数据", data)
        return this.wsManager.sendData(data)
    }

    @BindThis
    private dataHandler(data: any) {
        this.logger.debug("接收数据", data)
        if (data.hasOwnProperty("post_type")) {
            // 上报数据
            this.postDataHandler(data)
        } else {
            // Action 响应数据
            this.actionRespHandler(data)
        }
    }


    private actionMap = new Map<string, ((data: any) => void)>()

    // public sendAction<T extends keyof ActionMap>(
    //     action: T, 
    //     params: ActionParams<T>
    // ): Promise<ActionResp<T>>;
    // public sendAction(action: string, params?: object): Promise<any>;
    @BindThis
    public sendAction(action: string, params: object = {}) {
        return new Promise(resolve => {
            const id = (Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0,16).padEnd(16, "x")
            this.actionMap.set(id, resolve)
            this.sendData({
                action,
                params,
                echo: id
            })
        })
    }

    @BindThis
    private actionRespHandler(data: any) {
        this.actionMap.get(data.echo)?.(data)
        this.actionMap.delete(data.echo)
    }

    
    private eventMap = new Map<string, Set<(data: any) => void>>()

    @BindThis
    private postDataHandler(data: any) {
        const eventNamePath = []

        // post_type
        if (data?.post_type) eventNamePath.push(data?.post_type)
        // { post_type }_type
        const postTypeKey = data.post_type + "_type"
        if (data[postTypeKey]) eventNamePath.push(data[postTypeKey]) 
        // sub_type
        if (data?.sub_type) eventNamePath.push(data?.sub_type)
            
        this.logger.debug("接收到事件：", eventNamePath)

        // 触发事件
        // 构建事件字符串，逐级递减 notice.xxx -> notice -> all
        for (let i = eventNamePath.length; i > 0; i--) {
            const eventName = eventNamePath.slice(0, i).join(".")
            this.eventMap.get(eventName)?.forEach(handler => handler(data))
        }
        this.eventMap.get("all")?.forEach(handler => handler(data))
    }

    // public onEvent(handler: (data: any) => void): void;
    // public onEvent(eventName: EventName, handler: (data: any) => void): void;
    @BindThis
    public onEvent(arg1: any, arg2?: any) {
        const [ eventName, handler ] = arg2 ? [ arg1, arg2 ] :  [ "all", arg2 ]
        assert<string>(eventName)
        assert< (data: any) => void>(handler)

        let eventSet = this.eventMap.get(eventName)
        if (!eventSet) {
            eventSet = new Set()
            this.eventMap.set(eventName, eventSet)
        }
        eventSet.add(handler)
    }

    // public offEvent(handler: (data: any) => void): void;
    // public offEvent(eventName: string, handler: (data: any) => void): void;
    @BindThis
    public offEvent(arg1: any, arg2?: any) {
        const [ eventName, handler ] = arg2 ? [ arg1, arg2 ] :  [ "all", arg2 ]
        assert<string>(eventName)
        assert< (data: any) => void>(handler)

        let eventSet = this.eventMap.get(eventName)
        if (eventSet) {
            eventSet.delete(handler)
        }
    }
}
