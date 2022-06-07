import { HttpClient } from '../basic/http';

export class LighthouseClient extends HttpClient {
    public describeRegions() {
        return this.get('/cloud/lighthouse/describeRegions');
    }

    public describeInstances(region: string) {
        return this.get('/cloud/lighthouse/describeInstances/' + region);
    }

    public describeRegionsInstances() {
        return this.get('/cloud/lighthouse/describeRegionsInstances');
    }

    public describeTrafficPackages(region: string) {
        return this.get('/cloud/lighthouse/describeTrafficPackages/' + region);
    }

    public describeRegionTrafficPackages() {
        return this.get('/cloud/lighthouse/describeRegionTrafficPackages');
    }
}
