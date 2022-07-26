import { HttpClient } from "../basic/http"

import { Cam } from "./typings"

export class CamClient extends HttpClient {
    public getAccountSummary(): Promise<Cam.GetAccountSummaryResponse> {
        return this.post("/qcloud/cam/getAccountSummary", {}, 600)
    }
}
