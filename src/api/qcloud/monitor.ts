import { HttpClient } from "../basic/http"

import { Monitor } from "./typings"

export class MonitorModel extends HttpClient {
    protected api = "/api/qcloud/monitor/2018-07-24"

    public getMonitorData(
        region: string,
        query: Monitor.GetMonitorDataRequest
    ): Promise<Monitor.GetMonitorDataResponse> {
        return this.post("/GetMonitorData/" + region, query, 600)
    }
}
