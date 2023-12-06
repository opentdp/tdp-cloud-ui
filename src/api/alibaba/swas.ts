import { AlibabaClient } from './base';
import { Swas } from './typings';

export class SwasModel extends AlibabaClient {
    protected Service = 'swas';
    protected Version = '2020-06-01';

    public listRegions(): Promise<Swas.ListRegionsResponseBody> {
        return this.bus({ Action: 'ListRegions', RegionId: 'cn-hangzhou' }, 600);
    }

    public listPlans(region: string): Promise<Swas.ListPlansResponseBody> {
        return this.bus({
            Action: 'ListPlans', RegionId: region,
            Payload: { RegionId: region },
        });
    }

    public listInstances(region: string, query?: Partial<Swas.ListInstancesRequest>): Promise<Swas.ListInstancesResponseBody> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({
            Action: 'ListInstances', RegionId: region,
            Query: { ...query, RegionId: region },
        });
    }

    // 修改属性

    public updateInstanceAttribute(region: string, instanceId: string, name: string): Promise<Swas.UpdateInstanceAttributeResponseBody> {
        return this.bus({
            Action: 'UpdateInstanceAttribute', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, InstanceName: name },
        });
    }

    // 电源

    public startInstance(region: string, instanceId: string): Promise<Swas.StartInstanceResponseBody> {
        return this.bus({
            Action: 'StartInstance', RegionId: region,
            Query: { RegionId: region, InstanceId: instanceId },
        });
    }

    public stopInstance(region: string, instanceId: string): Promise<Swas.StopInstanceResponseBody> {
        return this.bus({
            Action: 'StopInstance', RegionId: region,
            Query: { RegionId: region, InstanceId: instanceId },
        });
    }

    public rebootInstance(region: string, instanceId: string): Promise<Swas.RebootInstanceResponseBody> {
        return this.bus({
            Action: 'RebootInstance', RegionId: region,
            Query: { RegionId: region, InstanceId: instanceId },
        });
    }

    // 快照

    public listSnapshots(region: string, instanceId: string): Promise<Swas.ListSnapshotsResponseBody> {
        return this.bus({
            Action: 'ListSnapshots', RegionId: region,
            Payload: { egionId: region, InstanceId: instanceId },
        });
    }

    public createSnapshots(region: string, instanceId: string, name: string): Promise<Swas.CreateSnapshotResponseBody> {
        return this.bus({
            Action: 'CreateSnapshot', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, SnapshotName: name, },
        });
    }

    public deleteSnapshot(region: string, instanceId: string, snapshotId: string): Promise<Swas.DeleteSnapshotResponseBody> {
        return this.bus({
            Action: 'DeleteSnapshot', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, SnapshotId: snapshotId },
        });
    }

    public resetDisk(region: string, instanceId: string, snapshotId: string): Promise<Swas.ResetDiskResponseBody> {
        return this.bus({
            Action: 'ResetDisk', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, SnapshotId: snapshotId },
        });
    }

    // 防火墙

    public listFirewallRules(region: string, instanceId: string): Promise<Swas.ListFirewallRulesResponseBody> {
        return this.bus({
            Action: 'ListFirewallRules', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId },
        });
    }

    public createFirewallRule(region: string, instanceId: string, rule: Swas.CreateFirewallRuleRequest): Promise<Swas.CreateFirewallRuleResponseBody> {
        return this.bus({
            Action: 'CreateFirewallRule', RegionId: region,
            Payload: { ...rule, RegionId: region, InstanceId: instanceId },
        });
    }

    public deleteFirewallRule(region: string, instanceId: string, ruleId: string): Promise<Swas.DeleteFirewallRuleResponseBody> {
        return this.bus({
            Action: 'DeleteFirewallRule', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId, FirewallRuleId: ruleId },
        });
    }

    // 流量包

    public listInstancesTrafficPackages(region: string, instanceId: string): Promise<Swas.ListInstancesTrafficPackagesResponseBody> {
        return this.bus({
            Action: 'ListInstancesTrafficPackages', RegionId: region,
            Payload: { RegionId: region, InstanceId: instanceId },
        });
    }
}

export const InstanceStateMap: Record<string, string> = {
    Pending: '准备中',
    Starting: '启动中',
    Running: '运行中',
    Stopping: '停止中',
    Stopped: '停止',
    Resetting: '重置中',
    Upgrading: '升级中',
    Disabled: '不可用',
};
