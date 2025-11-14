import type { Logger } from "../interface/Logger"
import { NapcatClientState, type NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"
import { assert } from "@ceale/util"

interface NCSelfProvider {
    NCClient: NapCatClient
    Logger?: Logger
}

interface NCSelfConfig {
    /** 是否开启调试模式　调试模式下会输出所有发出和接收到的数据等内容 */
    debug?: boolean
}

export class NCSelf {

    private readonly NCClient: NapCatClient
    private readonly Logger: Logger

    private readonly debug: boolean

    public readonly waitReady: Promise<void>
    public isReady = false

    /**
     * @param provider 所需依赖，详见 {@link NCMessageProvider}
     * @param config 配置项，详见 {@link NCMessageConfig}
     */
    constructor(provider: NCSelfProvider, config?: NCSelfConfig);
    constructor({
            NCClient,
            Logger = console
        }: NCSelfProvider, {
            debug = false
        }: NCSelfConfig = {}
    ) {
        this.NCClient = NCClient
        this.Logger = Logger
        this.debug = debug
        
        this.waitReady = new Promise(async resolve => {
            if (this.NCClient.state === NapcatClientState.OPEN) {
                const { data } = await this.NCClient.sendAction("get_login_info")
                this._user_id = data.user_id
                await this.regetInfo()
                this.isReady = true
                resolve()
            } else {
                NCClient.onceEvent("meta_event.lifecycle.connect", async (data) => {
                    this._user_id = data.self_id
                    await this.regetInfo()
                    this.isReady = true
                    resolve()
                })
            }
        })
    }

    private _raw_info?: any
    public get raw_info() {
        return this._raw_info
    }

    public async regetInfo() {
        if (!this.user_id) return false
        const data = await this.NCClient.sendAction("get_stranger_info", { user_id: this.user_id })
        if (data?.retcode !== 0) return false
        this._raw_info = data?.data
        this._nickname = data?.data.nickname
        
    }

    private _user_id?: string
    public get user_id() {
        return this._user_id
    }

    private _nickname?: string
    public get nickname() {
        return this._nickname
    }
    public async setNickname(name: string) {
        this.NCClient.sendAction("get_login_info")
    }

    // private _a
    public getAvatar() {
        const size = 0 // 原图
        const url = `https://thirdqq.qlogo.cn/g?b=sdk&s=${size}&nk=${this.user_id}`
    }   

    
    public info?: {
        user_id: number,
        nickname: string,
    }

    public async getInfo() {
        return await this.NCClient.sendAction("get_login_info")
    }

    public async setInfo(/* ...code... */) {
        // ...code...
    }
}