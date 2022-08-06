import { HttpClient, HttpClientParams } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected q(q: { action: string, query?: unknown, region?: string, endpoint?: string, expiry?: number }) {
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
