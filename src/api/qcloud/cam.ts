import { QCloudClient } from "../basic/qcloud"

import { Cam } from "./typings"

export class CamModel extends QCloudClient {
    protected qService = "cam"
    protected qVersion = "2019-01-16"

    public getAccountSummary(): Promise<Cam.GetAccountSummaryResponse> {
        return this.q({
            action: "GetAccountSummary",
            expiry: 600
        })
    }
}
