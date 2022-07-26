import { HttpClient } from "../basic/http"

import { Lighthouse } from "./typings"

export class LighthouseClient extends HttpClient {
    public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.post("/qcloud/lighthouse/describeRegions", {}, 600)
    }

    public describeInstances(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest
    ): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/qcloud/lighthouse/describeInstances/" + region, query, 600)
    }

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesTrafficPackagesRequest
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/qcloud/lighthouse/describeInstancesTrafficPackages/" + region, query, 600)
    }

    public describeSnapshots(
        region: string,
        query: Lighthouse.DescribeSnapshotsRequest
    ): Promise<Lighthouse.DescribeSnapshotsResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/qcloud/lighthouse/describeSnapshots/" + region, query, 600)
    }

    public describeFirewallRules(
        region: string,
        query: Lighthouse.DescribeFirewallRulesRequest
    ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
        query = Object.assign({ Limit: 100 }, query)
        return this.post("/qcloud/lighthouse/describeFirewallRules/" + region, query, 600)
    }
}
