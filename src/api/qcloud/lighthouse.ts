import { QCloudClient } from "@/api/basic/qcloud"

import { Lighthouse } from "./typings"

export class LighthouseModel extends QCloudClient {
    protected qService = "lighthouse"
    protected qVersion = "2020-03-24"

    public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.q({
            action: "DescribeRegions",
            expiry: 600
        })
    }

    public describeInstances(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest
    ): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({
            action: "DescribeInstances",
            region, query
        })
    }

    public modifyInstancesAttribute(
        region: string,
        query: Lighthouse.ModifyInstancesAttributeRequest
    ): Promise<Lighthouse.ModifyInstancesAttributeResponse> {
        return this.q({
            action: "ModifyInstancesAttribute",
            region, query,
        })
    }

    // 电源

    public stopInstances(
        region: string,
        query: Lighthouse.StopInstancesRequest
    ): Promise<Lighthouse.StopInstancesResponse> {
        return this.q({
            action: "StopInstances",
            region, query,
        })
    }

    public startInstances(
        region: string,
        query: Lighthouse.StartInstancesRequest
    ): Promise<Lighthouse.StartInstancesResponse> {
        return this.q({
            action: "StartInstances",
            region, query,
        })
    }

    public rebootInstances(
        region: string,
        query: Lighthouse.RebootInstancesRequest
    ): Promise<Lighthouse.RebootInstancesResponse> {
        return this.q({
            action: "RebootInstances",
            region, query,
        })
    }

    // VNC

    public describeInstanceVncUrl(
        region: string,
        query: Lighthouse.DescribeInstanceVncUrlRequest
    ): Promise<Lighthouse.DescribeInstanceVncUrlResponse> {
        return this.q({
            action: "DescribeInstanceVncUrl",
            region, query,
        })
    }

    // 快照

    public describeSnapshots(
        region: string,
        query: Lighthouse.DescribeSnapshotsRequest
    ): Promise<Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({
            action: "DescribeSnapshots",
            region, query
        })
    }

    public createInstanceSnapshot(
        region: string,
        query: Lighthouse.CreateInstanceSnapshotRequest
    ): Promise<Lighthouse.CreateInstanceSnapshotResponse> {
        return this.q({
            action: "CreateInstanceSnapshot",
            region, query,
        })
    }

    public applyInstanceSnapshot(
        region: string,
        query: Lighthouse.ApplyInstanceSnapshotRequest
    ): Promise<Lighthouse.ApplyInstanceSnapshotResponse> {
        return this.q({
            action: "ApplyInstanceSnapshot",
            region, query,
        })
    }

    public modifySnapshotAttribute(
        region: string,
        query: Lighthouse.ModifySnapshotAttributeRequest
    ): Promise<Lighthouse.ModifySnapshotAttributeResponse> {
        return this.q({
            action: "ModifySnapshotAttribute",
            region, query,
        })
    }

    public deleteSnapshots(
        region: string,
        query: Lighthouse.DeleteSnapshotsRequest
    ): Promise<Lighthouse.DeleteSnapshotsResponse> {
        return this.q({
            action: "DeleteSnapshots",
            region, query,
        })
    }

    // 防火墙

    public describeFirewallRules(
        region: string,
        query: Lighthouse.DescribeFirewallRulesRequest
    ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({
            action: "DescribeFirewallRules",
            region, query
        })
    }

    public createFirewallRules(
        region: string,
        query: Lighthouse.CreateFirewallRulesRequest
    ): Promise<Lighthouse.CreateFirewallRulesResponse> {
        return this.q({
            action: "CreateFirewallRules",
            region, query,
        })
    }

    public modifyFirewallRules(
        region: string,
        query: Lighthouse.ModifyFirewallRulesRequest
    ): Promise<Lighthouse.ModifyFirewallRulesResponse> {
        return this.q({
            action: "ModifyFirewallRules",
            region, query,
        })
    }

    public modifyFirewallRuleDescription(
        region: string,
        query: Lighthouse.ModifyFirewallRuleDescriptionRequest
    ): Promise<Lighthouse.ModifyFirewallRuleDescriptionResponse> {
        return this.q({
            action: "ModifyFirewallRuleDescription",
            region, query,
        })
    }

    public deleteFirewallRules(
        region: string,
        query: Lighthouse.DeleteFirewallRulesRequest
    ): Promise<Lighthouse.DeleteFirewallRulesResponse> {
        return this.q({
            action: "DeleteFirewallRules",
            region, query,
        })
    }

    // 流量包

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesTrafficPackagesRequest
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({
            action: "DescribeInstancesTrafficPackages",
            region, query, expiry: 600
        })
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
