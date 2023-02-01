import { QcloudClient } from "./base"
import { Lighthouse as QLighthouse } from "./typings"

export class LighthouseModel extends QcloudClient {
    protected Service = "lighthouse"
    protected Version = "2020-03-24"

    public describeRegions(): Promise<QLighthouse.DescribeRegionsResponse> {
        return this.bus({ Action: "DescribeRegions" }, 600)
    }

    public describeInstances(region: string, query?: QLighthouse.DescribeInstancesRequest): Promise<QLighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeInstances", Region: region, Payload: query })
    }

    public modifyInstancesAttribute(region: string, query: QLighthouse.ModifyInstancesAttributeRequest): Promise<QLighthouse.ModifyInstancesAttributeResponse> {
        return this.bus({ Action: "ModifyInstancesAttribute", Region: region, Payload: query })
    }

    // 电源

    public stopInstances(region: string, query: QLighthouse.StopInstancesRequest): Promise<QLighthouse.StopInstancesResponse> {
        return this.bus({ Action: "StopInstances", Region: region, Payload: query })
    }

    public startInstances(region: string, query: QLighthouse.StartInstancesRequest): Promise<QLighthouse.StartInstancesResponse> {
        return this.bus({ Action: "StartInstances", Region: region, Payload: query })
    }

    public rebootInstances(region: string, query: QLighthouse.RebootInstancesRequest): Promise<QLighthouse.RebootInstancesResponse> {
        return this.bus({ Action: "RebootInstances", Region: region, Payload: query })
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: QLighthouse.DescribeInstanceVncUrlRequest): Promise<QLighthouse.DescribeInstanceVncUrlResponse> {
        return this.bus({ Action: "DescribeInstanceVncUrl", Region: region, Payload: query })
    }

    // 快照

    public describeSnapshots(region: string, query: QLighthouse.DescribeSnapshotsRequest): Promise<QLighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeSnapshots", Region: region, Payload: query })
    }

    public createInstanceSnapshot(region: string, query: QLighthouse.CreateInstanceSnapshotRequest): Promise<QLighthouse.CreateInstanceSnapshotResponse> {
        return this.bus({ Action: "CreateInstanceSnapshot", Region: region, Payload: query })
    }

    public applyInstanceSnapshot(region: string, query: QLighthouse.ApplyInstanceSnapshotRequest): Promise<QLighthouse.ApplyInstanceSnapshotResponse> {
        return this.bus({ Action: "ApplyInstanceSnapshot", Region: region, Payload: query })
    }

    public modifySnapshotAttribute(region: string, query: QLighthouse.ModifySnapshotAttributeRequest): Promise<QLighthouse.ModifySnapshotAttributeResponse> {
        return this.bus({ Action: "ModifySnapshotAttribute", Region: region, Payload: query })
    }

    public deleteSnapshots(region: string, query: QLighthouse.DeleteSnapshotsRequest): Promise<QLighthouse.DeleteSnapshotsResponse> {
        return this.bus({ Action: "DeleteSnapshots", Region: region, Payload: query })
    }

    // 防火墙

    public describeFirewallRules(region: string, query: QLighthouse.DescribeFirewallRulesRequest): Promise<QLighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeFirewallRules", Region: region, Payload: query })
    }

    public createFirewallRules(region: string, query: QLighthouse.CreateFirewallRulesRequest): Promise<QLighthouse.CreateFirewallRulesResponse> {
        return this.bus({ Action: "CreateFirewallRules", Region: region, Payload: query })
    }

    public modifyFirewallRules(region: string, query: QLighthouse.ModifyFirewallRulesRequest): Promise<QLighthouse.ModifyFirewallRulesResponse> {
        return this.bus({ Action: "ModifyFirewallRules", Region: region, Payload: query })
    }

    public modifyFirewallRuleDescription(region: string, query: QLighthouse.ModifyFirewallRuleDescriptionRequest): Promise<QLighthouse.ModifyFirewallRuleDescriptionResponse> {
        return this.bus({ Action: "ModifyFirewallRuleDescription", Region: region, Payload: query })
    }

    public deleteFirewallRules(region: string, query: QLighthouse.DeleteFirewallRulesRequest): Promise<QLighthouse.DeleteFirewallRulesResponse> {
        return this.bus({ Action: "DeleteFirewallRules", Region: region, Payload: query })
    }

    // 流量包

    public describeInstancesTrafficPackages(region: string, query?: QLighthouse.DescribeInstancesTrafficPackagesRequest): Promise<QLighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.bus({ Action: "DescribeInstancesTrafficPackages", Region: region, Payload: query }, 600)
    }
}

export const InstanceStateMap: Record<string, string> = {
    PENDING: "创建中",
    LAUNCH_FAILED: "创建失败",
    RUNNING: "运行中",
    STOPPED: "关机",
    STARTING: "开机中",
    STOPPING: "关机中",
    REBOOTING: "重启中",
    SHUTDOWN: "停止待销毁",
    TERMINATING: "销毁中",
    DELETING: "删除中",
    FREEZING: "冻结中",
}
