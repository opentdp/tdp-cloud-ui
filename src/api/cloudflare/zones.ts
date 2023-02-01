import { CloudflareClient } from "./base"
import { Payload, ZoneItem, ZoneRecordItem, ZoneRecordCreate } from "./typings"

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

    public dnsRecordCreate(id: string, query: ZoneRecordCreate): Promise<Payload> {
        return this.bus({ Method: "POST", Path: "/zones/" + id + "/dns_records", Payload: query })
    }

    public dnsRecordUpdate(id: string, rid: string, query: ZoneRecordCreate): Promise<Payload> {
        return this.bus({ Method: "PUT", Path: "/zones/" + id + "/dns_records/" + rid, Payload: query })
    }

    public dnsRecordDelete(id: string, rid: string,): Promise<Payload> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + id + "/dns_records/" + rid })
    }

}

export const ZoneRecordTypes: Record<string, unknown> = {
    A: {},
    AAAA: {},
    CAA: {},
    CERT: {},
    CNAME: {},
    DNSKEY: {},
    DS: {},
    HTTPS: {},
    LOC: {},
    MX: {},
    NAPTR: {},
    NS: {},
    PTR: {},
    SMIMEA: {},
    SRV: {},
    SSHFP: {},
    SVCB: {},
    TLSA: {},
    TXT: {},
    URI: {},
}
