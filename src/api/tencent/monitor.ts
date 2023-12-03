import { TencentClient } from './base';
import { Monitor as IMonitor } from './typings';

export class MonitorModel extends TencentClient {
    protected Service = 'monitor';
    protected Version = '2018-07-24';

    public getMonitorData(region: string, query: IMonitor.GetMonitorDataRequest): Promise<IMonitor.GetMonitorDataResponse> {
        return this.bus({ Action: 'GetMonitorData', Region: region, Payload: query }, 600);
    }
}
