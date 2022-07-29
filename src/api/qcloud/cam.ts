import { HttpClient } from "../basic/http"

import { Cam } from "./typings"

export class CamClient extends HttpClient {
    public uri = "/qcloud/cam/2019-01-16"

    public getAccountSummary(): Promise<Cam.GetAccountSummaryResponse> {
        return this.post(this.uri + "/GetAccountSummary", {}, 600)
    }
}
