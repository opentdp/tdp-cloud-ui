import { HttpClient, HttpRequest } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected vendorId = 0

    protected q(q: QCloudRequest) {
        const header: HeadersInit = {
            Service: this.qService,
            Version: this.qVersion,
            Action: q.action,
        }
        if (q.region) {
            header.Region = q.region
        }
        if (q.endpoint) {
            header.Endpoint = q.endpoint
        }
        const params: HttpRequest = {
            url: "/",
            method: "POST",
            query: q.query || {},
            header: {
                "TDP-QCloud": JSON.stringify(header),
                "TDP-Vendor": String(this.vendorId)
            }
        }
        if (!q.expiry || q.expiry < 0) {
            return this.request(params)
        }
        return this.rcache(Object.assign(params, { expiry: q.expiry }))
    }

    public vendor(id: number) {
        this.vendorId = id
        return this
    }
}

export interface QCloudRequest {
    action: string
    query?: unknown
    region?: string
    endpoint?: string
    expiry?: number
}
