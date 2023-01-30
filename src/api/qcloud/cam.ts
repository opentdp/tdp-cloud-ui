import { QcloudClient } from "@/api/basic/qcloud"

import * as Qcloud from "./typings"

export class CamModel extends QcloudClient {
    protected qService = "cam"
    protected qVersion = "2019-01-16"

    public getAccountSummary(): Promise<Qcloud.Cam.GetAccountSummaryResponse> {
        return this.q({ Action: "GetAccountSummary" }, 600)
    }
}
