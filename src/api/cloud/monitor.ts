import { HttpClient } from "../basic/http"

import { Monitor } from "./typings"

export class MonitorClient extends HttpClient {
    public getMonitorData(
        region: string,
        query: Monitor.GetMonitorDataRequest
    ): Promise<Monitor.GetMonitorDataResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/cloud/monitor/getMonitorData/" + region, query, 600)
    }
}
