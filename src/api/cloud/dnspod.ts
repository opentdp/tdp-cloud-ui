import { HttpClient } from '../basic/http';

import { Dnspod } from './typings';

export class DnspodClient extends HttpClient {
    public describeDomainList(query?: Dnspod.DescribeDomainListRequest): Promise<Dnspod.DescribeDomainListResponse> {
        return this.get('/cloud/dnspod/describeDomainList', query);
    }
}
