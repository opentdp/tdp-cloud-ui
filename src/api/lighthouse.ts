import { HttpClient } from './common/http';

export class LighthouseClient extends HttpClient {
    public describeInstancesTrafficPackages(region: string) {
        return this.get('/lighthouse/describeInstancesTrafficPackages/' + region);
    }

    public getAllRegionsInstances() {
        return this.get('/lighthouse/getAllRegionsInstances');
    }
}
