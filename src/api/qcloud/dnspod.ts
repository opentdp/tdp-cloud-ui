import { HttpClient } from "../basic/http"

import { Dnspod } from "./typings"

export class DnspodClient extends HttpClient {
    protected api = "/api/qcloud/dnspod/2021-03-23"

    public describeDomainList(
        query?: Dnspod.DescribeDomainListRequest,
        expiry = 600
    ): Promise<Dnspod.DescribeDomainListResponse> {
        return this.post("/DescribeDomainList", query, expiry)
    }
    public describeRecordList(
        query?: Dnspod.DescribeRecordListRequest,
        expiry = 600
    ): Promise<Dnspod.DescribeRecordListResponse> {
        return this.post("/DescribeRecordList", query, expiry)
    }

    public describeRecordLineList(
        query?: Dnspod.DescribeRecordLineListRequest,
        expiry = 600
    ): Promise<Dnspod.DescribeRecordLineListResponse> {
        return this.post("/DescribeRecordLineList", query, expiry)
    }
    public describeRecordType(
        query?: Dnspod.DescribeRecordTypeRequest,
        expiry = 600
    ): Promise<Dnspod.DescribeRecordTypeResponse> {
        return this.post("/DescribeRecordType", query, expiry)
    }

    public modifyRecord(
        query?: Dnspod.ModifyRecordRequest,
        expiry = 600
    ): Promise<Dnspod.ModifyRecordResponse> {
        return this.post("/ModifyRecord", query, expiry)
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
