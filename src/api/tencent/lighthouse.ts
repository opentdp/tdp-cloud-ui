import { TencentClient } from './base';
import { Lighthouse as ILighthouse } from './typings';

export class LighthouseModel extends TencentClient {
    protected Service = 'lighthouse';
    protected Version = '2020-03-24';

    public describeRegions(): Promise<ILighthouse.DescribeRegionsResponse> {
        return this.bus({ Action: 'DescribeRegions' }, 600);
    }

    public describeInstances(region: string, query?: ILighthouse.DescribeInstancesRequest): Promise<Required<ILighthouse.DescribeInstancesResponse>> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({ Action: 'DescribeInstances', Region: region, Payload: query });
    }

    public modifyInstancesAttribute(region: string, query: ILighthouse.ModifyInstancesAttributeRequest): Promise<ILighthouse.ModifyInstancesAttributeResponse> {
        return this.bus({ Action: 'ModifyInstancesAttribute', Region: region, Payload: query });
    }

    // 电源

    public stopInstances(region: string, query: ILighthouse.StopInstancesRequest): Promise<ILighthouse.StopInstancesResponse> {
        return this.bus({ Action: 'StopInstances', Region: region, Payload: query });
    }

    public startInstances(region: string, query: ILighthouse.StartInstancesRequest): Promise<ILighthouse.StartInstancesResponse> {
        return this.bus({ Action: 'StartInstances', Region: region, Payload: query });
    }

    public rebootInstances(region: string, query: ILighthouse.RebootInstancesRequest): Promise<ILighthouse.RebootInstancesResponse> {
        return this.bus({ Action: 'RebootInstances', Region: region, Payload: query });
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: ILighthouse.DescribeInstanceVncUrlRequest): Promise<ILighthouse.DescribeInstanceVncUrlResponse> {
        return this.bus({ Action: 'DescribeInstanceVncUrl', Region: region, Payload: query });
    }

    // 快照

    public describeSnapshots(region: string, query: ILighthouse.DescribeSnapshotsRequest): Promise<ILighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({ Action: 'DescribeSnapshots', Region: region, Payload: query });
    }

    public createInstanceSnapshot(region: string, query: ILighthouse.CreateInstanceSnapshotRequest): Promise<ILighthouse.CreateInstanceSnapshotResponse> {
        return this.bus({ Action: 'CreateInstanceSnapshot', Region: region, Payload: query });
    }

    public applyInstanceSnapshot(region: string, query: ILighthouse.ApplyInstanceSnapshotRequest): Promise<ILighthouse.ApplyInstanceSnapshotResponse> {
        return this.bus({ Action: 'ApplyInstanceSnapshot', Region: region, Payload: query });
    }

    public modifySnapshotAttribute(region: string, query: ILighthouse.ModifySnapshotAttributeRequest): Promise<ILighthouse.ModifySnapshotAttributeResponse> {
        return this.bus({ Action: 'ModifySnapshotAttribute', Region: region, Payload: query });
    }

    public deleteSnapshots(region: string, query: ILighthouse.DeleteSnapshotsRequest): Promise<ILighthouse.DeleteSnapshotsResponse> {
        return this.bus({ Action: 'DeleteSnapshots', Region: region, Payload: query });
    }

    // 防火墙

    public describeFirewallRules(region: string, query: ILighthouse.DescribeFirewallRulesRequest): Promise<ILighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({ Action: 'DescribeFirewallRules', Region: region, Payload: query });
    }

    public createFirewallRules(region: string, query: ILighthouse.CreateFirewallRulesRequest): Promise<ILighthouse.CreateFirewallRulesResponse> {
        return this.bus({ Action: 'CreateFirewallRules', Region: region, Payload: query });
    }

    public modifyFirewallRules(region: string, query: ILighthouse.ModifyFirewallRulesRequest): Promise<ILighthouse.ModifyFirewallRulesResponse> {
        return this.bus({ Action: 'ModifyFirewallRules', Region: region, Payload: query });
    }

    public modifyFirewallRuleDescription(region: string, query: ILighthouse.ModifyFirewallRuleDescriptionRequest): Promise<ILighthouse.ModifyFirewallRuleDescriptionResponse> {
        return this.bus({ Action: 'ModifyFirewallRuleDescription', Region: region, Payload: query });
    }

    public deleteFirewallRules(region: string, query: ILighthouse.DeleteFirewallRulesRequest): Promise<ILighthouse.DeleteFirewallRulesResponse> {
        return this.bus({ Action: 'DeleteFirewallRules', Region: region, Payload: query });
    }

    // 流量包

    public describeInstancesTrafficPackages(region: string, query?: ILighthouse.DescribeInstancesTrafficPackagesRequest): Promise<ILighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.bus({ Action: 'DescribeInstancesTrafficPackages', Region: region, Payload: query }, 600);
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
