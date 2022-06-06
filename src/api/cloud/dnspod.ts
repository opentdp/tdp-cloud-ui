import { HttpClient } from '../basic/http';

export class DnspodClient extends HttpClient {
    public describeDomainList() {
        return this.get('/cloud/dnspod/describeDomainList');
    }
}
