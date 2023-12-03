import { AlibabaClient } from './base';
import { Dns } from './typings';

export class AliDnsModel extends AlibabaClient {
    protected Service = 'alidns';
    protected Version = '2015-01-09';

    public describeDomains(query?: Partial<Dns.DescribeDomainsRequest>): Promise<Dns.DescribeDomainsResponseBody> {
        return this.bus({ Action: 'DescribeDomains', Query: query });
    }

    public describeDomainRecords(query: Partial<Dns.DescribeDomainRecordsRequest>): Promise<Dns.DescribeDomainRecordsResponseBody> {
        return this.bus({ Action: 'DescribeDomainRecords', Query: query });
    }

    public describeDomainInfo(query?: Partial<Dns.DescribeDomainInfoRequest>): Promise<Dns.DescribeDomainInfoResponseBody> {
        return this.bus({ Action: 'DescribeDomainInfo', Query: query });
    }

    public describeDomainRecordInfo(query: Partial<Dns.DescribeDomainRecordInfoRequest>): Promise<Dns.DescribeDomainRecordInfoResponseBody> {
        return this.bus({ Action: 'DescribeDomainRecordInfo', Query: query });
    }

    public describeSupportLines(query: Partial<Dns.DescribeSupportLinesRequest>): Promise<Dns.DescribeSupportLinesResponseBody> {
        return this.bus({ Action: 'DescribeSupportLines', Query: query });
    }

    public addDomainRecord(query: Partial<Dns.AddDomainRecordRequest>): Promise<Dns.AddDomainRecordResponseBody> {
        return this.bus({ Action: 'AddDomainRecord', Query: query });
    }

    public updateDomainRecord(query: Partial<Dns.UpdateDomainRecordRequest>): Promise<Dns.UpdateDomainRecordResponseBody> {
        return this.bus({ Action: 'UpdateDomainRecord', Query: query });
    }

    public deleteDomainRecord(query: Partial<Dns.DeleteDomainRecordRequest>): Promise<Dns.DeleteDomainGroupResponseBody> {
        return this.bus({ Action: 'DeleteDomainRecord', Query: query });
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: '正常',
    PAUSE: '暂停',
    SPAM: '封禁',
};

export const RecordLineMap: Record<string, string> = {
    default: '默认',
    telecom: '电信',
    unicom: '联通',
    mobile: '移动',
    oversea: '海外',
    edu: '教育网',
    drpeng: '鹏博士',
    btvn: '广电网',
};

export const RecordTypeMap: Record<string, string> = {
    A: 'A 记录',
    NS: 'NS 记录',
    MX: 'MX 记录',
    TXT: 'TXT 记录',
    CNAME: 'CNAME 记录',
    SRV: 'SRV 记录',
    AAAA: 'AAAA 记录',
    CAA: 'CAA 记录',
    REDIRECT_URL: '显性URL转发',
    FORWARD_URL: '隐性URL转发',
};
