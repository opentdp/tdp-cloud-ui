import { HttpClient } from "../basic/http"

import { Lighthouse } from "./typings"

export class LighthouseClient extends HttpClient {
    protected api = "/api/qcloud/lighthouse/2020-03-24"

    public describeRegions(
        expiry = 600
    ): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.post("/DescribeRegions", {}, expiry)
    }

    public describeInstances(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest,
        expiry = 600
    ): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeInstances/" + region, query, expiry)
    }

    // 电源

    public stopInstances(
        region: string,
        query?: Lighthouse.StopInstancesRequest
    ): Promise<Lighthouse.StopInstancesResponse> {
        return this.post("/StopInstances/" + region, query)
    }

    public startInstances(
        region: string,
        query?: Lighthouse.StartInstancesRequest
    ): Promise<Lighthouse.StartInstancesResponse> {
        return this.post("/StartInstances/" + region, query)
    }

    public rebootInstances(
        region: string,
        query?: Lighthouse.RebootInstancesRequest
    ): Promise<Lighthouse.RebootInstancesResponse> {
        return this.post("/RebootInstances/" + region, query)
    }

    // VNC

    public describeInstanceVncUrl(
        region: string,
        query?: Lighthouse.DescribeInstanceVncUrlRequest
    ): Promise<Lighthouse.DescribeInstanceVncUrlResponse> {
        return this.post("/DescribeInstanceVncUrl/" + region, query)
    }

    // 流量包

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesTrafficPackagesRequest,
        expiry = 600
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeInstancesTrafficPackages/" + region, query, expiry)
    }

    // 快照

    public describeSnapshots(
        region: string,
        query: Lighthouse.DescribeSnapshotsRequest,
        expiry = 600
    ): Promise<Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeSnapshots/" + region, query, expiry)
    }

    // 防火墙

    public describeFirewallRules(
        region: string,
        query: Lighthouse.DescribeFirewallRulesRequest,
        expiry = 600
    ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeFirewallRules/" + region, query, expiry)
    }
}
