import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class CamModel extends QcloudClient {
    protected Service = "cam"
    protected Version = "2019-01-16"

    public getAccountSummary(): Promise<Qcloud.Cam.GetAccountSummaryResponse> {
        return this.bus({ Action: "GetAccountSummary" }, 600)
    }
}
