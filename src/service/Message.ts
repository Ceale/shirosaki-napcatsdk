import type { Logger } from "../util/Logger"
import type { NapCatClient } from "../NapCatClient"
import { BindThis } from "../util/AutoBind"

export class NCMessage {
    constructor(
        private NCClient: NapCatClient,
        private logger: Logger,
        private debug: any
    ) {
        
    }

    @BindThis
    public sendMessage() {
        // ...
    }

    public onMessage() {
        
    }
}