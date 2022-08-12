import { HttpClient, HttpClientParams } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected q(q: QCloudClientParams) {
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
        const params: HttpClientParams = {
            url: "/",
            method: "POST",
            query: q.query || {},
            header: {
                "TDP-QCloud": JSON.stringify(header)
            }
        }
        if (!q.expiry || q.expiry < 0) {
            return this.request(params)
        }
        return this.rcache(Object.assign(params, { expiry: q.expiry }))
    }
}

export interface QCloudClientParams {
    action: string
    query?: unknown
    region?: string
    endpoint?: string
    expiry?: number
}
