import { HttpClient } from "../basic/http"

import { Lighthouse } from "./typings"

export class LighthouseClient extends HttpClient {
    protected api = "/api/qcloud/lighthouse/2020-03-24"

    public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.post("/DescribeRegions", {}, 600)
    }

    public describeInstances(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest
    ): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeInstances/" + region, query, 600)
    }

    public describeInstanceVncUrl(
        region: string,
        query?: Lighthouse.DescribeInstanceVncUrlRequest
    ): Promise<Lighthouse.DescribeInstanceVncUrlResponse> {
        return this.post("/DescribeInstanceVncUrl/" + region, query)
    }

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesTrafficPackagesRequest
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeInstancesTrafficPackages/" + region, query, 600)
    }

    public describeSnapshots(
        region: string,
        query: Lighthouse.DescribeSnapshotsRequest
    ): Promise<Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeSnapshots/" + region, query, 600)
    }

    public describeFirewallRules(
        region: string,
        query: Lighthouse.DescribeFirewallRulesRequest
    ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/DescribeFirewallRules/" + region, query, 600)
    }
}
