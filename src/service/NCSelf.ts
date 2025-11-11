import type { Logger } from "../util/Logger"
import type { NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"

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

        NCClient.onEvent("meta_event.lifecycle.connect", this.refreshSelfInfo)
    }

    private _selfInfo?: {
        user_id: number,
        nickname: string,
    }

    public get selfInfo() {
        return this._selfInfo
    }


    @BindThis
    public async refreshSelfInfo() {
        const data = await this.NCClient.sendAction("get_login_info")
        if (data?.retcode !== 0) return false
        this._selfInfo = data?.data
        return true
    }
}