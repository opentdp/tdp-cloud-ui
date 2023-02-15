import { AlibabaClient } from './base'

export class AliDnsModel extends AlibabaClient {
    protected Service = 'alidns'
    protected Version = '2015-01-09'

    public describeDomainList(query?: any): Promise<any> {
        return this.bus({ Action: 'DescribeDomains', Payload: query })
    }
    public describeRecordList(query: any): Promise<any> {
        return this.bus({ Action: 'DescribeDomainRecords', Payload: query })
    }

    public describeDomain(query?: any): Promise<any> {
        return this.bus({ Action: 'DescribeDomainInfo', Payload: query })
    }

    public describeRecordType(query: any): Promise<any> {
        return this.bus({ Action: 'DescribeRecordInfo', Payload: query }, 600)
    }
    public describeRecordLineList(query: any): Promise<any> {
        return this.bus(
            { Action: 'DescribeRecordLineList', Payload: query },
            600
        )
    }

    public createRecord(query: any): Promise<any> {
        return this.bus({ Action: 'AddDomainRecord', Payload: query })
    }
    public modifyRecord(query: any): Promise<any> {
        return this.bus({ Action: 'UpdateDomainRecord', Payload: query })
    }
    public deleteRecord(query: any): Promise<any> {
        return this.bus({ Action: 'DeleteDomainRecord', Payload: query })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: '正常',
    PAUSE: '暂停',
    SPAM: '封禁',
}
