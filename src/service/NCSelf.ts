import type { Logger } from "../util/Logger"
import type { NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"

export class NCSelf {
    
    constructor(
        private NCClient: NapCatClient,
        private logger: Logger,
        private debug: any
    ) {
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