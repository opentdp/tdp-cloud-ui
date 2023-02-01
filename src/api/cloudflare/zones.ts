import { CloudflareClient } from "./base"
import { Payload, ZoneItem, ZoneRecordItem } from "./typings"

export class ZonesModel extends CloudflareClient {
    public list(filter?: unknown): Promise<Payload & { Datasets: ZoneItem[] }> {
        return this.bus({ Method: "GET", Path: "/zones", Query: filter })
    }

    public detail(id: string): Promise<Payload & { Datasets: ZoneItem }> {
        return this.bus({ Method: "GET", Path: "/zones/" + id })
    }

    // 域名设置

    public settings(id: string): Promise<Payload> {
        return this.bus({ Method: "GET", Path: "/zones/" + id + "/settings" })
    }

    // DNS 记录

    public dnsRecords(id: string): Promise<Payload & { Datasets: ZoneRecordItem[] }> {
        return this.bus({ Method: "GET", Path: "/zones/" + id + "/dns_records" })
    }

    public dnsRecordCreate(id: string): Promise<Payload> {
        return this.bus({ Method: "POST", Path: "/zones/" + id + "/dns_records" })
    }

    public dnsRecordUpdate(id: string): Promise<Payload> {
        return this.bus({ Method: "PUT", Path: "/zones/" + id + "/dns_records" })
    }

    public dnsRecordDelete(id: string): Promise<Payload> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + id + "/dns_records" })
    }

}
