import { QcloudClient } from "@/api/basic/qcloud"

import { Qcloud } from './typings'

export class DnspodModel extends QcloudClient {
    protected qService = "dnspod"
    protected qVersion = "2021-03-23"

    public describeDomainList(query?: Qcloud.Dnspod.DescribeDomainListRequest): Promise<Qcloud.Dnspod.DescribeDomainListResponse> {
        return this.q({ action: "DescribeDomainList", query })
    }
    public describeRecordList(query: Qcloud.Dnspod.DescribeRecordListRequest): Promise<Qcloud.Dnspod.DescribeRecordListResponse> {
        return this.q({ action: "DescribeRecordList", query })
    }

    public describeDomain(query?: Qcloud.Dnspod.DescribeDomainRequest): Promise<Qcloud.Dnspod.DescribeDomainResponse> {
        return this.q({ action: "DescribeDomain", query })
    }

    public describeRecordType(query: Qcloud.Dnspod.DescribeRecordTypeRequest): Promise<Qcloud.Dnspod.DescribeRecordTypeResponse> {
        return this.q({ action: "DescribeRecordType", query, expiry: 600 })
    }
    public describeRecordLineList(query: Qcloud.Dnspod.DescribeRecordLineListRequest): Promise<Qcloud.Dnspod.DescribeRecordLineListResponse> {
        return this.q({ action: "DescribeRecordLineList", query, expiry: 600 })
    }

    public createRecord(query: Qcloud.Dnspod.CreateRecordRequest): Promise<Qcloud.Dnspod.CreateRecordResponse> {
        return this.q({ action: "CreateRecord", query })
    }
    public modifyRecord(query: Qcloud.Dnspod.ModifyRecordRequest): Promise<Qcloud.Dnspod.ModifyRecordResponse> {
        return this.q({ action: "ModifyRecord", query })
    }
    public deleteRecord(query: Qcloud.Dnspod.DeleteRecordRequest): Promise<Qcloud.Dnspod.DeleteRecordResponse> {
        return this.q({ action: "DeleteRecord", query })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
