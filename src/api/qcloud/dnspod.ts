import { QCloudClient } from "../basic/qcloud"

import { Dnspod } from "./typings"

export class DnspodModel extends QCloudClient {
    protected qService = "dnspod"
    protected qVersion = "2021-03-23"

    public describeDomainList(
        query?: Dnspod.DescribeDomainListRequest
    ): Promise<Dnspod.DescribeDomainListResponse> {
        return this.q({
            action: "DescribeDomainList",
            query, expiry: 600
        })
    }
    public describeRecordList(
        query: Dnspod.DescribeRecordListRequest
    ): Promise<Dnspod.DescribeRecordListResponse> {
        return this.q({
            action: "DescribeRecordList",
            query, expiry: 600
        })
    }

    public describeDomain(
        query?: Dnspod.DescribeDomainRequest
    ): Promise<Dnspod.DescribeDomainResponse> {
        return this.q({
            action: "DescribeDomain",
            query, expiry: 600
        })
    }

    public describeRecordType(
        query: Dnspod.DescribeRecordTypeRequest
    ): Promise<Dnspod.DescribeRecordTypeResponse> {
        return this.q({
            action: "DescribeRecordType",
            query, expiry: 600
        })
    }
    public describeRecordLineList(
        query: Dnspod.DescribeRecordLineListRequest
    ): Promise<Dnspod.DescribeRecordLineListResponse> {
        return this.q({
            action: "DescribeRecordLineList",
            query, expiry: 600
        })
    }

    public modifyRecord(
        query: Dnspod.ModifyRecordRequest
    ): Promise<Dnspod.ModifyRecordResponse> {
        return this.q({
            action: "ModifyRecord",
            query,
        })
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
