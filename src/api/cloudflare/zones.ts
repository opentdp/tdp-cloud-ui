import { CloudflareClient } from "./base"
import {
    Payload,
    ZoneItem, ZoneRecordItem, ZoneRecordCreate,
    FallbackOrigin, CustomHostnameItem, CustomHostnameCreate
} from "./typings"

export class ZonesModel extends CloudflareClient {
    public list(filter?: unknown): Promise<Payload & { Datasets: ZoneItem[] }> {
        return this.bus({ Method: "GET", Path: "/zones", Query: filter })
    }

    public detail(zone: string): Promise<Payload & { Datasets: ZoneItem }> {
        return this.bus({ Method: "GET", Path: "/zones/" + zone })
    }

    // 域名设置

    public settings(zone: string): Promise<Payload> {
        return this.bus({ Method: "GET", Path: "/zones/" + zone + "/settings" })
    }

    // DNS 记录

    public dnsRecords(zone: string): Promise<Payload & { Datasets: ZoneRecordItem[] }> {
        return this.bus({ Method: "GET", Path: "/zones/" + zone + "/dns_records" })
    }

    public dnsRecordCreate(zone: string, query: ZoneRecordCreate): Promise<Payload> {
        return this.bus({ Method: "POST", Path: "/zones/" + zone + "/dns_records", Payload: query })
    }

    public dnsRecordUpdate(zone: string, rid: string, query: ZoneRecordCreate): Promise<Payload> {
        return this.bus({ Method: "PUT", Path: "/zones/" + zone + "/dns_records/" + rid, Payload: query })
    }

    public dnsRecordDelete(zone: string, rid: string): Promise<Payload> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + zone + "/dns_records/" + rid })
    }

    // Custom Hostnames

    public customHostnames(zone: string): Promise<Payload & { Datasets: CustomHostnameItem[] }> {
        return this.bus({ Method: "GET", Path: "/zones/" + zone + "/custom_hostnames" })
    }

    public customHostnamesCreate(zone: string, query: CustomHostnameCreate): Promise<Payload> {
        return this.bus({ Method: "PUT", Path: "/zones/" + zone + "/custom_hostnames", Payload: query })
    }

    public customHostnamesUpdate(zone: string, query: CustomHostnameCreate): Promise<Payload> {
        return this.bus({ Method: "PUT", Path: "/zones/" + zone + "/custom_hostnames", Payload: query })
    }

    public customHostnamesDelete(zone: string, rid: string): Promise<Payload> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + zone + "/custom_hostnames/" + rid })
    }

    // Custom Hostnames - Fallback Origin

    public fallbackOrigin(zone: string): Promise<Payload & { Datasets: FallbackOrigin }> {
        return this.bus({ Method: "GET", Path: "/zones/" + zone + "/custom_hostnames/fallback_origin" })
    }

    public fallbackOriginUpdate(zone: string, origin: string): Promise<Payload & { Datasets: FallbackOrigin }> {
        return this.bus({ Method: "PUT", Path: "/zones/" + zone + "/custom_hostnames/fallback_origin", Payload: { origin } })
    }

    public fallbackOriginDelete(zone: string): Promise<Payload> {
        return this.bus({ Method: "DELETE", Path: "/zones/" + zone + "/custom_hostnames/fallback_origin" })
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
