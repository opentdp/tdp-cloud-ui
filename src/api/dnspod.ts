import { HttpClient } from './common/http';

export class DnspodClient extends HttpClient {
    public describeDomainList() {
        return this.get('/dnspod/describeDomainList');
    }
}
