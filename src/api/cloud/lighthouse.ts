import { HttpClient } from '../basic/http';

export class LighthouseClient extends HttpClient {
    public describeRegionsInstances() {
        return this.get('/cloud/lighthouse/describeRegionsInstances');
    }

    public describeInstancesTrafficPackages(region: string) {
        return this.get('/cloud/lighthouse/describeInstancesTrafficPackages/' + region);
    }
}
