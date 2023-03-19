import { AlibabaClient } from './base'
import { Swas } from "./typings"

export class SwasModel extends AlibabaClient {
    protected Service = 'swas'
    protected Version = '2020-06-01'

    public listRegions(): Promise<Swas.ListRegionsResponseBody> {
        return this.bus(
            { Action: 'ListRegions', RegionId: 'cn-hangzhou' },
            600
        )
    }

    public listPlans(region: string): Promise<Swas.ListPlansResponseBody> {
        return this.bus({
            Action: 'ListPlans',
            RegionId: region,
            Payload: {
                RegionId: region,
            },
        })
    }

    public listInstances(region: string, query?: Swas.ListInstancesRequest): Promise<Swas.ListInstancesResponseBody> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({
            Action: 'ListInstances',
            RegionId: region,
            Payload: {
                ...query, RegionId: region,
            },
        })
    }

}

export const InstanceStateMap: Record<string, string> = {
    PENDING: '创建中',
    LAUNCH_FAILED: '创建失败',
    RUNNING: '运行中',
    STOPPED: '关机',
    STARTING: '开机中',
    STOPPING: '关机中',
    REBOOTING: '重启中',
    SHUTDOWN: '停止待销毁',
    TERMINATING: '销毁中',
    DELETING: '删除中',
    FREEZING: '冻结中',
}
