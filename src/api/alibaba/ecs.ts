import { AlibabaClient } from './base';
import { Ecs } from './typings';

export class EcsModel extends AlibabaClient {
    protected Service = 'ecs';
    protected Version = '2014-05-26';

    public describeRegions(): Promise<Ecs.DescribeRegionsResponseBody> {
        return this.bus({ Action: 'DescribeRegions' }, 600);
    }

    public describeInstances(region: string, query?: Partial<Ecs.DescribeInstancesRequest>): Promise<Ecs.DescribeInstancesResponseBody> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({
            Action: 'DescribeInstances', RegionId: region,
            Payload: { ...query, RegionId: region, },
        });
    }

    // 实例状态

    public describeInstanceStatus(region: string, instanceId: string): Promise<Ecs.DescribeInstanceStatusResponseBody> {
        return this.bus({
            Action: 'DescribeInstanceStatus', RegionId: region,
            Payload: { RegionId: region, InstanceId: [instanceId] },
        });
    }

    // 修改属性

    public modifyInstanceAttribute(region: string, instanceId: string, name: string): Promise<Ecs.ModifyInstanceAttributeResponseBody> {
        return this.bus({
            Action: 'ModifyInstanceAttribute', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, InstanceName: name },
        });
    }

    // 电源

    public startInstance(region: string, instanceId: string): Promise<Ecs.StartInstanceResponseBody> {
        return this.bus({
            Action: 'StartInstance', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId },
        });
    }

    public stopInstance(region: string, instanceId: string): Promise<Ecs.StopInstanceResponseBody> {
        return this.bus({
            Action: 'StopInstance', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId },
        });
    }

    public rebootInstance(region: string, instanceId: string): Promise<Ecs.RebootInstanceResponseBody> {
        return this.bus({
            Action: 'RebootInstance', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId },
        });
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
};
