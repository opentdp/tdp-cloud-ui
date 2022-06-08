import { HttpClient } from '../basic/http';

export class LighthouseClient extends HttpClient {
    public describeRegions() {
        return this.get('/cloud/lighthouse/describeRegions');
    }

    public describeInstances(region: string) {
        return this.get('/cloud/lighthouse/describeInstances/' + region);
    }

    public describeInstancesTrafficPackages(region: string) {
        return this.get('/cloud/lighthouse/describeInstancesTrafficPackages/' + region);
    }
}
