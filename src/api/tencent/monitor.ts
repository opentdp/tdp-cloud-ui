import { TencentClient } from "./base"
import { Monitor as QMonitor } from "./typings"

export class MonitorModel extends TencentClient {
    protected Service = "monitor"
    protected Version = "2018-07-24"

    public getMonitorData(region: string, query: QMonitor.GetMonitorDataRequest): Promise<QMonitor.GetMonitorDataResponse> {
        return this.bus({ Action: "GetMonitorData", Region: region, Payload: query }, 600)
    }
}
