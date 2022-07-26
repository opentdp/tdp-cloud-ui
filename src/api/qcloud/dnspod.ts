import { HttpClient } from "../basic/http"

import { Dnspod } from "./typings"

export class DnspodClient extends HttpClient {
    public describeDomainList(
        query?: Dnspod.DescribeDomainListRequest
    ): Promise<Dnspod.DescribeDomainListResponse> {
        return this.post("/qcloud/dnspod/describeDomainList", query, 600)
    }
    public describeRecordList(
        query?: Dnspod.DescribeRecordListRequest
    ): Promise<Dnspod.DescribeRecordListResponse> {
        return this.post("/qcloud/dnspod/describeRecordList", query, 600)
    }

    public describeRecordLineList(
        query?: Dnspod.DescribeRecordLineListRequest
    ): Promise<Dnspod.DescribeRecordLineListResponse> {
        return this.post("/qcloud/dnspod/describeRecordLineList", query, 600)
    }
    public describeRecordType(
        query?: Dnspod.DescribeRecordTypeRequest
    ): Promise<Dnspod.DescribeRecordTypeResponse> {
        return this.post("/qcloud/dnspod/describeRecordType", query, 600)
    }

    public modifyRecord(
        query?: Dnspod.ModifyRecordRequest
    ): Promise<Dnspod.ModifyRecordResponse> {
        return this.post("/qcloud/dnspod/modifyRecord", query, 600)
    }
}

export const DomainStatusMap: Record<string, string> = {
    ENABLE: "正常",
    PAUSE: "暂停",
    SPAM: "封禁",
}
