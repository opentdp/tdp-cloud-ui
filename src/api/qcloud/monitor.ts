import { QCloudClient } from "../basic/qcloud"

import { Monitor } from "./typings"

export class MonitorModel extends QCloudClient {
    protected qService = "monitor"
    protected qVersion = "2018-07-24"

    public getMonitorData(
        region: string,
        query: Monitor.GetMonitorDataRequest
    ): Promise<Monitor.GetMonitorDataResponse> {
        return this.q({
            action: "GetMonitorData",
            region, query, expiry: 600
        })
    }
}
