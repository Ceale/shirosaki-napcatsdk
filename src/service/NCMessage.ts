import type { Logger } from "../util/Logger"
import { NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"

interface NCMessageProvider {
    NCClient: NapCatClient
    Logger?: Logger
}

interface NCMessageConfig {
    /** 是否开启调试模式　调试模式下会输出所有发出和接收到的数据等内容 */
    debug?: boolean
}

export class NCMessage {

    private readonly NCClient: NapCatClient
    private readonly Logger: Logger

    private readonly debug: boolean

    /**
     * @param provider 所需依赖，详见 {@link NCMessageProvider}
     * @param config 配置项，详见 {@link NCMessageConfig}
     */
    constructor(provider: NCMessageProvider, config?: NCMessageConfig);
    constructor({
            NCClient,
            Logger = console
        }: NCMessageProvider, {
            debug = false
        }: NCMessageConfig = {}
    ) {
        this.NCClient = NCClient
        this.Logger = Logger
        this.debug = debug
    }

    @BindThis
    public sendMessage() {
        // ...
    }

    @BindThis
    public onMessage() {
        
    }
}