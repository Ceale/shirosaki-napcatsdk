import EventEmitter from "node:events"
import { WebSocketManager } from "./WebSocketManager"
import { BindThis } from "./util/AutoBind"
import { assert, defineEnum, tryCatch, type anyobject, type EnumKeys } from "@ceale/util"
import type { Logger } from "./interface/Logger"
import console from "node:console"
import type { ActionMap, ActionParams, ActionResp } from "./interface/action"
import type { EventName } from "./interface/event-name"
import { NCMessage } from "./service/NCMessage"
import { NCSelf } from "./service/NCSelf"


export interface NCClientConfig {
    /** 连接 NapCat 的 token */
    token?: string | null
    /** 默认 `5000`。超时时长`(ms)`，为`-1`将不限时地等待。
     * 
     * 用于等待sendAction的响应、初次连接后等待`meta_event.connect`等 */
    timeout?: number
    /** 重连设置 */
    retry?: {
        /** 默认 `5000`。重连间隔`(ms)` */
        interval?: number
        /** 默认 `5`。重连次数限制。
         * 
         * 为`0`则不尝试重连，为`-1`则不限次数地尝试重连 */
        limit?: number
    }
    /** 默认 `console`。日志器 */
    logger?: Logger
    /** 默认 `false`。是否开启调试模式。
     * 
     * 调试模式下会输出所有发出和接收到的数据等内容 */
    debug?: boolean
}

export const NapcatClientState = defineEnum("OPEN", "CLOSE")

export class NapCatClient {
    // 配置
    private url: string
    private token: string | null
    private debug: boolean
    private timeout: number
    // 基础服务
    private logger: Logger
    private wsManager: WebSocketManager

    private _state: EnumKeys<typeof NapcatClientState> = NapcatClientState.CLOSE
    public get state() {
        return this._state
    }
    public get wsState() {
        return this.wsManager.wsState
    }

    // 功能模块
    // public Self: NCSelf
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
            timeout = 5000,
            retry: {
                interval = 5000,
                limit = 5
            } = {},
            logger = console,
            debug = false
        }: NCClientConfig = {}
    ) {
        if (url === undefined) throw new TypeError("url参数是必须的")
        this.url = url
        this.token = token
        this.debug = debug
        this.timeout = timeout

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
            this.logger,
            this.timeout
        )

        // this.Self = new NCSelf({ NCClient: this, Logger: this.logger }, { debug: this.debug })
        this.Message = new NCMessage({ NCClient: this, Logger: this.logger }, { debug: this.debug })
    }

    @BindThis
    public async connect() {
        if (this.state === NapcatClientState.OPEN) return true
        const success = await this.wsManager.open()
        if (success) this._state = NapcatClientState.OPEN
        return success
    }

    @BindThis
    public async close () {
        if (this.state === NapcatClientState.CLOSE) return true
        const success = await this.wsManager.close()
        if (success) this._state = NapcatClientState.CLOSE
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
        this.dataMap.forEach(handler => handler(data))
        if (data.hasOwnProperty("post_type")) {
            // 上报数据
            this.postDataHandler(data)
        } else {
            // Action 响应数据
            this.actionRespHandler(data)
        }
    }
    
    private dataMap = new Set<(data: any) => void>()

    public onData(handler: (data: any) => void) {
        this.dataMap.add(handler)
    }

    public offData(handler: (data: any) => void) {
        this.dataMap.delete(handler)
    }


    private actionMap = new Map<string, ((data: any) => void)>()

    // public sendAction<T extends keyof ActionMap>(
    //     action: T, 
    //     params: ActionParams<T>
    // ): Promise<ActionResp<T>>;
    // public sendAction(action: string, params?: object): Promise<any>;
    @BindThis
    public sendAction(action: string, params: object = {}) {
        return new Promise<anyobject>(resolve => {
            const id = (Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0,16).padEnd(16, "x")
            this.actionMap.set(id, resolve)
            this.sendData({
                action,
                params,
                echo: id
            })
            if (this.timeout !== -1) setTimeout(() => {
                this.actionMap.delete(id)
                resolve({
                    status: "timeout",
                    retcode: 1408,
                    mas: "action timeout",
                    wording: `Action "${action}" 响应超时 (${this.timeout}ms)`,
                    data: {},
                    echo: id
                })
            }, this.timeout)
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

    public onEvent(handler: (data: any) => void): void;
    public onEvent(eventName: string, handler: (data: any) => void): void;
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

    public onceEvent(handler: (data: any) => void): void;
    public onceEvent(eventName: string, handler: (data: any) => void): void;
    @BindThis
    public onceEvent(arg1: any, arg2?: any) {
        const [ eventName, handler ] = arg2 ? [ arg1, arg2 ] :  [ "all", arg2 ]
        assert<string>(eventName)
        assert< (data: any) => void>(handler)

        const onceHandler = (data: any) => {
            this.offEvent(eventName, onceHandler)
            handler(data)
        }
        this.onEvent(eventName, onceHandler)
    }

    public offEvent(handler: (data: any) => void): void;
    public offEvent(eventName: string, handler: (data: any) => void): void;
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
