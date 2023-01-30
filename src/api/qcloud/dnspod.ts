import * as Qcloud from "./typings"
import { QcloudClient } from "./base"

export class DnspodModel extends QcloudClient {
    protected Service = "dnspod"
    protected Version = "2021-03-23"

    public describeDomainList(query?: Qcloud.Dnspod.DescribeDomainListRequest): Promise<Qcloud.Dnspod.DescribeDomainListResponse> {
        return this.bus({ Action: "DescribeDomainList", Payload: query })
    }
    public describeRecordList(query: Qcloud.Dnspod.DescribeRecordListRequest): Promise<Qcloud.Dnspod.DescribeRecordListResponse> {
        return this.bus({ Action: "DescribeRecordList", Payload: query })
    }

    public describeDomain(query?: Qcloud.Dnspod.DescribeDomainRequest): Promise<Qcloud.Dnspod.DescribeDomainResponse> {
        return this.bus({ Action: "DescribeDomain", Payload: query })
    }

    public describeRecordType(query: Qcloud.Dnspod.DescribeRecordTypeRequest): Promise<Qcloud.Dnspod.DescribeRecordTypeResponse> {
        return this.bus({ Action: "DescribeRecordType", Payload: query }, 600)
    }
    public describeRecordLineList(query: Qcloud.Dnspod.DescribeRecordLineListRequest): Promise<Qcloud.Dnspod.DescribeRecordLineListResponse> {
        return this.bus({ Action: "DescribeRecordLineList", Payload: query }, 600)
    }

    public createRecord(query: Qcloud.Dnspod.CreateRecordRequest): Promise<Qcloud.Dnspod.CreateRecordResponse> {
        return this.bus({ Action: "CreateRecord", Payload: query })
    }
    public modifyRecord(query: Qcloud.Dnspod.ModifyRecordRequest): Promise<Qcloud.Dnspod.ModifyRecordResponse> {
        return this.bus({ Action: "ModifyRecord", Payload: query })
    }
    public deleteRecord(query: Qcloud.Dnspod.DeleteRecordRequest): Promise<Qcloud.Dnspod.DeleteRecordResponse> {
        return this.bus({ Action: "DeleteRecord", Payload: query })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
