import { HttpClient, HttpRequest } from "./http"

export class QcloudClient extends HttpClient {
    static vendorId = ""

    protected qService = ""
    protected qVersion = ""

    protected q(q: QcloudRequest) {
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
            url: "/qcloud",
            method: "POST",
            query: q.query || {},
            header: {
                "TDP-Qcloud": JSON.stringify(header),
                "TDP-Vendor": QcloudClient.vendorId
            }
        }

        if (q.expiry && q.expiry > 0) {
            return this.rcache(Object.assign(params, { expiry: q.expiry }))
        }

        return this.request(params)
    }
}

export function QcloudVendor(id: number | string) {
    QcloudClient.vendorId = id + ""
}

export interface QcloudRequest {
    action: string
    query?: unknown
    region?: string
    endpoint?: string
    expiry?: number
}
