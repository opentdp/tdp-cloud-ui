import { HttpClient } from "../basic/http"

import { Monitor } from "./typings"

export class MonitorClient extends HttpClient {
    public uri = "/qcloud/monitor/2018-07-24"

    public getMonitorData(
        region: string,
        query: Monitor.GetMonitorDataRequest
    ): Promise<Monitor.GetMonitorDataResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/GetMonitorData/" + region, query, 600)
    }
}
