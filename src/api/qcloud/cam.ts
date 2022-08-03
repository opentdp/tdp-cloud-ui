import { HttpClient } from "../basic/http"

import { Cam } from "./typings"

export class CamClient extends HttpClient {
    protected api = "/api/qcloud/cam/2019-01-16"

    public getAccountSummary(
        expiry = 600
    ): Promise<Cam.GetAccountSummaryResponse> {
        return this.post("/GetAccountSummary", {}, expiry)
    }
}
