import { HttpClient } from "../basic/http"

import { Monitor } from "./typings"

export class MonitorClient extends HttpClient {
    public uri = "/qcloud/monitor/2018-07-24"

    public getMonitorData(
        region: string,
        query: Monitor.GetMonitorDataRequest
    ): Promise<Monitor.GetMonitorDataResponse> {
        return this.post(this.uri + "/GetMonitorData/" + region, query, 600)
    }
}
