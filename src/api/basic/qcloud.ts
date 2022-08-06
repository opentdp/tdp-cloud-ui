import { HttpClient, HttpClientParams } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected q(q: { action: string, region?: string, endpoint?: string, query?: unknown, expiry?: number }) {
        const header: HeadersInit = {
            service: this.qService,
            version: this.qVersion,
            action: q.action,
        }
        if (q.region) {
            header.region = q.region
        }
        if (q.endpoint) {
            header.endpoint = q.endpoint
        }
        const params: HttpClientParams = {
            method: "POST",
            url: "/",
            header: {
                "TDP-QCloud": JSON.stringify(header)
            },
            query: q.query
        }
        if (!q.expiry) {
            return this.request(params)
        }
        return this.rcache(Object.assign(params, { expiry: q.expiry }))
    }
}
