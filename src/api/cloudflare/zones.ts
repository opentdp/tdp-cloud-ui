import { CloudflareClient } from "./base"
import { CfResponse } from "./typings"

export class ZonesModel extends CloudflareClient {
    public list(filter?: unknown): Promise<CfResponse> {
        return this.bus({ Method: "GET", Path: "/zones", Query: filter })
    }

    // 域名详情

    public detail(id: string): Promise<CfResponse> {
        return this.bus({ Method: "GET", Path: "/zones/" + id })
    }

    // 域名设置

    public settings(id: string): Promise<CfResponse> {
        return this.bus({ Method: "GET", Path: "/zones/" + id + "/settings" })
    }

    // DNS 记录

    public dnsRecords(id: string): Promise<CfResponse> {
        return this.bus({ Method: "GET", Path: "/zones/" + id + "/dns_records" })
    }
    public dnsRecordCreate(id: string): Promise<CfResponse> {
        return this.bus({ Method: "POST", Path: "/zones/" + id + "/dns_records" })
    }
    public dnsRecordUpdate(id: string): Promise<CfResponse> {
        return this.bus({ Method: "PUT", Path: "/zones/" + id + "/dns_records" })
    }
    public dnsRecordDelete(id: string): Promise<CfResponse> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + id + "/dns_records" })
    }

}
