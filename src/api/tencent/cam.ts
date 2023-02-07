import { TencentClient } from "./base"
import { Cam as QCam } from "./typings"

export class CamModel extends TencentClient {
    protected Service = "cam"
    protected Version = "2019-01-16"

    public getAccountSummary(): Promise<QCam.GetAccountSummaryResponse> {
        return this.bus({ Action: "GetAccountSummary" }, 600)
    }
}
