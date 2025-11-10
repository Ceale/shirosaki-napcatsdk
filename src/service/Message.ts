import type { Logger } from "src/util/Logger"
import type { NapCatClient } from "src/NapCatClient"
import { BindThis } from "src/util/AutoBind"

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