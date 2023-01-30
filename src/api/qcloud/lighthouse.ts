import { QcloudClient } from "@/api/basic/qcloud"

import * as Qcloud from "./typings"

export class LighthouseModel extends QcloudClient {
    protected qService = "lighthouse"
    protected qVersion = "2020-03-24"

    public describeRegions(): Promise<Qcloud.Lighthouse.DescribeRegionsResponse> {
        return this.q({ Action: "DescribeRegions" }, 600)
    }

    public describeInstances(region: string, query?: Qcloud.Lighthouse.DescribeInstancesRequest): Promise<Qcloud.Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ Action: "DescribeInstances", Region: region, Payload: query })
    }

    public modifyInstancesAttribute(region: string, query: Qcloud.Lighthouse.ModifyInstancesAttributeRequest): Promise<Qcloud.Lighthouse.ModifyInstancesAttributeResponse> {
        return this.q({ Action: "ModifyInstancesAttribute", Region: region, Payload: query })
    }

    // 电源

    public stopInstances(region: string, query: Qcloud.Lighthouse.StopInstancesRequest): Promise<Qcloud.Lighthouse.StopInstancesResponse> {
        return this.q({ Action: "StopInstances", Region: region, Payload: query })
    }

    public startInstances(region: string, query: Qcloud.Lighthouse.StartInstancesRequest): Promise<Qcloud.Lighthouse.StartInstancesResponse> {
        return this.q({ Action: "StartInstances", Region: region, Payload: query })
    }

    public rebootInstances(region: string, query: Qcloud.Lighthouse.RebootInstancesRequest): Promise<Qcloud.Lighthouse.RebootInstancesResponse> {
        return this.q({ Action: "RebootInstances", Region: region, Payload: query })
    }

    // VNC

    public describeInstanceVncUrl(region: string, query: Qcloud.Lighthouse.DescribeInstanceVncUrlRequest): Promise<Qcloud.Lighthouse.DescribeInstanceVncUrlResponse> {
        return this.q({ Action: "DescribeInstanceVncUrl", Region: region, Payload: query })
    }

    // 快照

    public describeSnapshots(region: string, query: Qcloud.Lighthouse.DescribeSnapshotsRequest): Promise<Qcloud.Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ Action: "DescribeSnapshots", Region: region, Payload: query })
    }

    public createInstanceSnapshot(region: string, query: Qcloud.Lighthouse.CreateInstanceSnapshotRequest): Promise<Qcloud.Lighthouse.CreateInstanceSnapshotResponse> {
        return this.q({ Action: "CreateInstanceSnapshot", Region: region, Payload: query })
    }

    public applyInstanceSnapshot(region: string, query: Qcloud.Lighthouse.ApplyInstanceSnapshotRequest): Promise<Qcloud.Lighthouse.ApplyInstanceSnapshotResponse> {
        return this.q({ Action: "ApplyInstanceSnapshot", Region: region, Payload: query })
    }

    public modifySnapshotAttribute(region: string, query: Qcloud.Lighthouse.ModifySnapshotAttributeRequest): Promise<Qcloud.Lighthouse.ModifySnapshotAttributeResponse> {
        return this.q({ Action: "ModifySnapshotAttribute", Region: region, Payload: query })
    }

    public deleteSnapshots(region: string, query: Qcloud.Lighthouse.DeleteSnapshotsRequest): Promise<Qcloud.Lighthouse.DeleteSnapshotsResponse> {
        return this.q({ Action: "DeleteSnapshots", Region: region, Payload: query })
    }

    // 防火墙

    public describeFirewallRules(region: string, query: Qcloud.Lighthouse.DescribeFirewallRulesRequest): Promise<Qcloud.Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ Action: "DescribeFirewallRules", Region: region, Payload: query })
    }

    public createFirewallRules(region: string, query: Qcloud.Lighthouse.CreateFirewallRulesRequest): Promise<Qcloud.Lighthouse.CreateFirewallRulesResponse> {
        return this.q({ Action: "CreateFirewallRules", Region: region, Payload: query })
    }

    public modifyFirewallRules(region: string, query: Qcloud.Lighthouse.ModifyFirewallRulesRequest): Promise<Qcloud.Lighthouse.ModifyFirewallRulesResponse> {
        return this.q({ Action: "ModifyFirewallRules", Region: region, Payload: query })
    }

    public modifyFirewallRuleDescription(region: string, query: Qcloud.Lighthouse.ModifyFirewallRuleDescriptionRequest): Promise<Qcloud.Lighthouse.ModifyFirewallRuleDescriptionResponse> {
        return this.q({ Action: "ModifyFirewallRuleDescription", Region: region, Payload: query })
    }

    public deleteFirewallRules(region: string, query: Qcloud.Lighthouse.DeleteFirewallRulesRequest): Promise<Qcloud.Lighthouse.DeleteFirewallRulesResponse> {
        return this.q({ Action: "DeleteFirewallRules", Region: region, Payload: query })
    }

    // 流量包

    public describeInstancesTrafficPackages(region: string, query?: Qcloud.Lighthouse.DescribeInstancesTrafficPackagesRequest): Promise<Qcloud.Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.q({ Action: "DescribeInstancesTrafficPackages", Region: region, Payload: query }, 600)
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
