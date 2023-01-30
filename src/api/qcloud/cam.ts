import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class CamModel extends QcloudClient {
    protected qService = "cam"
    protected qVersion = "2019-01-16"

    public getAccountSummary(): Promise<Qcloud.Cam.GetAccountSummaryResponse> {
        return this.q({ Action: "GetAccountSummary" }, 600)
    }
}
