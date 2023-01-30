import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class MonitorModel extends QcloudClient {
    protected Service = "monitor"
    protected Version = "2018-07-24"

    public getMonitorData(region: string, query: Qcloud.Monitor.GetMonitorDataRequest): Promise<Qcloud.Monitor.GetMonitorDataResponse> {
        return this.bus({ Action: "GetMonitorData", Region: region, Payload: query }, 600)
    }
}
