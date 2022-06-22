import { HttpClient } from "../basic/http"

import { Lighthouse } from "./typings"

export class LighthouseClient extends HttpClient {
  public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
    return this.post("/cloud/lighthouse/describeRegions", {})
  }

  public describeInstances(
    region: string,
    query?: Lighthouse.DescribeInstancesRequest
  ): Promise<Lighthouse.DescribeInstancesResponse> {
    query = Object.assign({ Limit: 100 }, query)
    return this.post("/cloud/lighthouse/describeInstances/" + region, query)
  }

  public describeInstancesTrafficPackages(
    region: string,
    query?: Lighthouse.DescribeInstancesTrafficPackagesRequest
  ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
    query = Object.assign({ Limit: 100 }, query)
    return this.post(
      "/cloud/lighthouse/describeInstancesTrafficPackages/" + region,
      query
    )
  }

  public describeSnapshots(
    region: string,
    query: Lighthouse.DescribeSnapshotsRequest
  ): Promise<Lighthouse.DescribeSnapshotsResponse> {
    query = Object.assign({ Limit: 100 }, query)
    return this.post("/cloud/lighthouse/describeSnapshots/" + region, query)
  }

  public describeFirewallRules(
    region: string,
    query: Lighthouse.DescribeFirewallRulesRequest
  ): Promise<Lighthouse.DescribeFirewallRulesResponse> {
    query = Object.assign({ Limit: 100 }, query)
    return this.post("/cloud/lighthouse/describeFirewallRules/" + region, query)
  }
}
