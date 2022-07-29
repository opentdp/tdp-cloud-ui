import { HttpClient } from "../basic/http"

import { Lighthouse } from "./typings"

export class LighthouseClient extends HttpClient {
    public uri = "/qcloud/lighthouse/2020-03-24"

    public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.post(this.uri + "/DescribeRegions", {}, 600)
    }

    public describeInstances(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest
    ): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/DescribeInstances/" + region, query, 600)
    }

    public describeInstanceVncUrl(
        region: string,
        query?: Lighthouse.DescribeInstanceVncUrlRequest
    ): Promise<Lighthouse.DescribeInstanceVncUrlResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/DescribeInstanceVncUrl/" + region, query)
    }

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesTrafficPackagesRequest
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/DescribeInstancesTrafficPackages/" + region, query, 600)
    }

    public describeSnapshots(
        region: string,
        query: Lighthouse.DescribeSnapshotsRequest
    ): Promise<Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/DescribeSnapshots/" + region, query, 600)
    }

    public describeFirewallRules(
        region: string,
        query: Lighthouse.DescribeFirewallRulesRequest
    ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post(this.uri + "/DescribeFirewallRules/" + region, query, 600)
    }
}
