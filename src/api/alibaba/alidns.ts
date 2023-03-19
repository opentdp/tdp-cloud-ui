import { AlibabaClient } from "./base"
import { Dns } from "./typings"

export class AliDnsModel extends AlibabaClient {
    protected Service = 'alidns'
    protected Version = '2015-01-09'

    public describeDomains(query?: Dns.DescribeDomainsRequest): Promise<Dns.DescribeDomainsResponseBody> {
        return this.bus({ Action: 'DescribeDomains', Payload: query })
    }

    public describeDomainRecords(query: Dns.DescribeDomainRecordsRequest): Promise<Dns.DescribeDomainRecordsResponseBody> {
        return this.bus({ Action: 'DescribeDomainRecords', Payload: query })
    }

    public describeDomainInfo(query?: Dns.DescribeDomainInfoRequest): Promise<Dns.DescribeDomainInfoResponseBody> {
        return this.bus({ Action: 'DescribeDomainInfo', Payload: query })
    }

    public describeDomainRecordInfo(query: Dns.DescribeDomainRecordInfoRequest): Promise<Dns.DescribeDomainRecordInfoResponseBody> {
        return this.bus({ Action: 'DescribeDomainRecordInfo', Payload: query }, 600)
    }

    public describeSupportLines(query: Dns.DescribeSupportLinesRequest): Promise<Dns.DescribeSupportLinesResponseBody> {
        return this.bus(
            { Action: 'DescribeSupportLines', Payload: query },
            600
        )
    }

    public addDomainRecord(query: Dns.AddDomainRecordRequest): Promise<Dns.AddDomainRecordResponseBody> {
        return this.bus({ Action: 'AddDomainRecord', Payload: query })
    }

    public updateDomainRecord(query: Dns.UpdateDomainRecordResponse): Promise<Dns.UpdateAppKeyStateResponseBody> {
        return this.bus({ Action: 'UpdateDomainRecord', Payload: query })
    }

    public deleteDomainRecord(query: Dns.DeleteDomainRecordRequest): Promise<Dns.DeleteDomainGroupResponseBody> {
        return this.bus({ Action: 'DeleteDomainRecord', Payload: query })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: '正常',
    PAUSE: '暂停',
    SPAM: '封禁',
}
