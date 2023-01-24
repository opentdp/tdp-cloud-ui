import { QcloudClient } from "@/api/basic/qcloud"

export class CamModel extends QcloudClient {
    protected qService = "cam"
    protected qVersion = "2019-01-16"

    public getAccountSummary(): Promise<Qcloud.Cam.GetAccountSummaryResponse> {
        return this.q({ action: "GetAccountSummary", expiry: 600 })
    }
}
