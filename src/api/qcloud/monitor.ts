import { QcloudClient } from "@/api/basic/qcloud"

import { Qcloud } from './typings'

export class MonitorModel extends QcloudClient {
    protected qService = "monitor"
    protected qVersion = "2018-07-24"

    public getMonitorData(region: string, query: Qcloud.Monitor.GetMonitorDataRequest): Promise<Qcloud.Monitor.GetMonitorDataResponse> {
        return this.q({ action: "GetMonitorData", region, query, expiry: 600 })
    }
}
