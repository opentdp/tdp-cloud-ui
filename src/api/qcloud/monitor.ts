import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class MonitorModel extends QcloudClient {
    protected qService = "monitor"
    protected qVersion = "2018-07-24"

    public getMonitorData(region: string, query: Qcloud.Monitor.GetMonitorDataRequest): Promise<Qcloud.Monitor.GetMonitorDataResponse> {
        return this.q({ Action: "GetMonitorData", Region: region, Payload: query }, 600)
    }
}
