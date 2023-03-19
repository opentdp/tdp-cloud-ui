import { AlibabaClient } from "./base"
import { Ecs } from "./typings"

export class EcsModel extends AlibabaClient {
    protected Service = 'ecs'
    protected Version = '2014-05-26'

    public describeRegions(): Promise<Ecs.DescribeRegionsResponseBody> {
        return this.bus({ Action: 'DescribeRegions' }, 600)
    }

    public describeInstances(region: string, query?: Ecs.DescribeInstancesRequest): Promise<Ecs.DescribeInstancesResponseBody> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({
            Action: 'DescribeInstances',
            RegionId: region,
            Payload: {
                ...query,
                RegionId: region,
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
