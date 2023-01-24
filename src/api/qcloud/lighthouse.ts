import { QcloudClient } from "@/api/basic/qcloud"

import { Qcloud } from './typings'

export class LighthouseModel extends QcloudClient {
    protected qService = "lighthouse"
    protected qVersion = "2020-03-24"

    public describeRegions(): Promise<Qcloud.Lighthouse.DescribeRegionsResponse> {
        return this.q({ action: "DescribeRegions", expiry: 600 })
    }

    public describeInstances(region: string, query?: Qcloud.Lighthouse.DescribeInstancesRequest): Promise<Qcloud.Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ action: "DescribeInstances", region, query })
    }

    public modifyInstancesAttribute(region: string, query: Qcloud.Lighthouse.ModifyInstancesAttributeRequest): Promise<Qcloud.Lighthouse.ModifyInstancesAttributeResponse> {
        return this.q({ action: "ModifyInstancesAttribute", region, query })
    }

    // 电源

    public stopInstances(region: string, query: Qcloud.Lighthouse.StopInstancesRequest): Promise<Qcloud.Lighthouse.StopInstancesResponse> {
        return this.q({ action: "StopInstances", region, query })
    }

    public startInstances(region: string, query: Qcloud.Lighthouse.StartInstancesRequest): Promise<Qcloud.Lighthouse.StartInstancesResponse> {
        return this.q({ action: "StartInstances", region, query })
    }

    public rebootInstances(region: string, query: Qcloud.Lighthouse.RebootInstancesRequest): Promise<Qcloud.Lighthouse.RebootInstancesResponse> {
        return this.q({ action: "RebootInstances", region, query })
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: Qcloud.Lighthouse.DescribeInstanceVncUrlRequest): Promise<Qcloud.Lighthouse.DescribeInstanceVncUrlResponse> {
        return this.q({ action: "DescribeInstanceVncUrl", region, query })
    }

    // 快照

    public describeSnapshots(region: string, query: Qcloud.Lighthouse.DescribeSnapshotsRequest): Promise<Qcloud.Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ action: "DescribeSnapshots", region, query })
    }

    public createInstanceSnapshot(region: string, query: Qcloud.Lighthouse.CreateInstanceSnapshotRequest): Promise<Qcloud.Lighthouse.CreateInstanceSnapshotResponse> {
        return this.q({ action: "CreateInstanceSnapshot", region, query })
    }

    public applyInstanceSnapshot(region: string, query: Qcloud.Lighthouse.ApplyInstanceSnapshotRequest): Promise<Qcloud.Lighthouse.ApplyInstanceSnapshotResponse> {
        return this.q({ action: "ApplyInstanceSnapshot", region, query })
    }

    public modifySnapshotAttribute(region: string, query: Qcloud.Lighthouse.ModifySnapshotAttributeRequest): Promise<Qcloud.Lighthouse.ModifySnapshotAttributeResponse> {
        return this.q({ action: "ModifySnapshotAttribute", region, query })
    }

    public deleteSnapshots(region: string, query: Qcloud.Lighthouse.DeleteSnapshotsRequest): Promise<Qcloud.Lighthouse.DeleteSnapshotsResponse> {
        return this.q({ action: "DeleteSnapshots", region, query })
    }

    // 防火墙

    public describeFirewallRules(region: string, query: Qcloud.Lighthouse.DescribeFirewallRulesRequest): Promise<Qcloud.Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ action: "DescribeFirewallRules", region, query })
    }

    public createFirewallRules(region: string, query: Qcloud.Lighthouse.CreateFirewallRulesRequest): Promise<Qcloud.Lighthouse.CreateFirewallRulesResponse> {
        return this.q({ action: "CreateFirewallRules", region, query })
    }

    public modifyFirewallRules(region: string, query: Qcloud.Lighthouse.ModifyFirewallRulesRequest): Promise<Qcloud.Lighthouse.ModifyFirewallRulesResponse> {
        return this.q({ action: "ModifyFirewallRules", region, query })
    }

    public modifyFirewallRuleDescription(region: string, query: Qcloud.Lighthouse.ModifyFirewallRuleDescriptionRequest): Promise<Qcloud.Lighthouse.ModifyFirewallRuleDescriptionResponse> {
        return this.q({ action: "ModifyFirewallRuleDescription", region, query })
    }

    public deleteFirewallRules(region: string, query: Qcloud.Lighthouse.DeleteFirewallRulesRequest): Promise<Qcloud.Lighthouse.DeleteFirewallRulesResponse> {
        return this.q({ action: "DeleteFirewallRules", region, query })
    }

    // 流量包

    public describeInstancesTrafficPackages(region: string, query?: Qcloud.Lighthouse.DescribeInstancesTrafficPackagesRequest): Promise<Qcloud.Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ action: "DescribeInstancesTrafficPackages", region, query, expiry: 600 })
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
