import { HttpClient } from "../basic/http"

import { Dnspod } from "./typings"

export class DnspodClient extends HttpClient {
    public uri = "/qcloud/dnspod/2021-03-23"

    public describeDomainList(
        query?: Dnspod.DescribeDomainListRequest
    ): Promise<Dnspod.DescribeDomainListResponse> {
        return this.post(this.uri + "/DescribeDomainList", query, 600)
    }
    public describeRecordList(
        query?: Dnspod.DescribeRecordListRequest
    ): Promise<Dnspod.DescribeRecordListResponse> {
        return this.post(this.uri + "/DescribeRecordList", query, 600)
    }

    public describeRecordLineList(
        query?: Dnspod.DescribeRecordLineListRequest
    ): Promise<Dnspod.DescribeRecordLineListResponse> {
        return this.post(this.uri + "/DescribeRecordLineList", query, 600)
    }
    public describeRecordType(
        query?: Dnspod.DescribeRecordTypeRequest
    ): Promise<Dnspod.DescribeRecordTypeResponse> {
        return this.post(this.uri + "/DescribeRecordType", query, 600)
    }

    public modifyRecord(
        query?: Dnspod.ModifyRecordRequest
    ): Promise<Dnspod.ModifyRecordResponse> {
        return this.post(this.uri + "/ModifyRecord", query, 600)
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
