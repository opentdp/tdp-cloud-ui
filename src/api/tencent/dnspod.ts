import { TencentClient } from './base';
import { Dnspod as IDnspod } from './typings';

export class DnspodModel extends TencentClient {
    protected Service = 'dnspod';
    protected Version = '2021-03-23';

    public describeDomainList(query?: IDnspod.DescribeDomainListRequest): Promise<IDnspod.DescribeDomainListResponse> {
        return this.bus({ Action: 'DescribeDomainList', Payload: query });
    }

    public describeRecordList(query: IDnspod.DescribeRecordListRequest): Promise<IDnspod.DescribeRecordListResponse> {
        return this.bus({ Action: 'DescribeRecordList', Payload: query });
    }

    public describeDomain(query?: IDnspod.DescribeDomainRequest): Promise<IDnspod.DescribeDomainResponse> {
        return this.bus({ Action: 'DescribeDomain', Payload: query });
    }

    public describeRecordType(query: IDnspod.DescribeRecordTypeRequest): Promise<IDnspod.DescribeRecordTypeResponse> {
        return this.bus({ Action: 'DescribeRecordType', Payload: query });
    }

    public describeRecordLineList(query: IDnspod.DescribeRecordLineListRequest): Promise<IDnspod.DescribeRecordLineListResponse> {
        return this.bus({ Action: 'DescribeRecordLineList', Payload: query });
    }

    public createRecord(query: IDnspod.CreateRecordRequest): Promise<IDnspod.CreateRecordResponse> {
        return this.bus({ Action: 'CreateRecord', Payload: query });
    }

    public modifyRecord(query: IDnspod.ModifyRecordRequest): Promise<IDnspod.ModifyRecordResponse> {
        return this.bus({ Action: 'ModifyRecord', Payload: query });
    }

    public deleteRecord(query: IDnspod.DeleteRecordRequest): Promise<IDnspod.DeleteRecordResponse> {
        return this.bus({ Action: 'DeleteRecord', Payload: query });
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: '正常',
    PAUSE: '暂停',
    SPAM: '封禁',
};
