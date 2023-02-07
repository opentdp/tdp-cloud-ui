import { TencentClient } from "./base"
import { Dnspod as QDnspod } from "./typings"

export class DnspodModel extends TencentClient {
    protected Service = "dnspod"
    protected Version = "2021-03-23"

    public describeDomainList(query?: QDnspod.DescribeDomainListRequest): Promise<QDnspod.DescribeDomainListResponse> {
        return this.bus({ Action: "DescribeDomainList", Payload: query })
    }
    public describeRecordList(query: QDnspod.DescribeRecordListRequest): Promise<QDnspod.DescribeRecordListResponse> {
        return this.bus({ Action: "DescribeRecordList", Payload: query })
    }

    public describeDomain(query?: QDnspod.DescribeDomainRequest): Promise<QDnspod.DescribeDomainResponse> {
        return this.bus({ Action: "DescribeDomain", Payload: query })
    }

    public describeRecordType(query: QDnspod.DescribeRecordTypeRequest): Promise<QDnspod.DescribeRecordTypeResponse> {
        return this.bus({ Action: "DescribeRecordType", Payload: query }, 600)
    }
    public describeRecordLineList(query: QDnspod.DescribeRecordLineListRequest): Promise<QDnspod.DescribeRecordLineListResponse> {
        return this.bus({ Action: "DescribeRecordLineList", Payload: query }, 600)
    }

    public createRecord(query: QDnspod.CreateRecordRequest): Promise<QDnspod.CreateRecordResponse> {
        return this.bus({ Action: "CreateRecord", Payload: query })
    }
    public modifyRecord(query: QDnspod.ModifyRecordRequest): Promise<QDnspod.ModifyRecordResponse> {
        return this.bus({ Action: "ModifyRecord", Payload: query })
    }
    public deleteRecord(query: QDnspod.DeleteRecordRequest): Promise<QDnspod.DeleteRecordResponse> {
        return this.bus({ Action: "DeleteRecord", Payload: query })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
