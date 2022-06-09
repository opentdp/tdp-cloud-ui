import { HttpClient } from '../basic/http';

import { Lighthouse } from './typings';

export class LighthouseClient extends HttpClient {
    public describeRegions(): Promise<Lighthouse.DescribeRegionsResponse> {
        return this.get('/cloud/lighthouse/describeRegions');
    }

    public describeInstances(region: string, query?: Lighthouse.DescribeInstancesRequest): Promise<Lighthouse.DescribeInstancesResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.get('/cloud/lighthouse/describeInstances/' + region, query);
    }

    public describeInstancesTrafficPackages(
        region: string,
        query?: Lighthouse.DescribeInstancesRequest
    ): Promise<Lighthouse.DescribeInstancesTrafficPackagesResponse> {
        query = Object.assign({ Limit: 100 }, query);
        return this.get('/cloud/lighthouse/describeInstancesTrafficPackages/' + region, query);
    }
}
