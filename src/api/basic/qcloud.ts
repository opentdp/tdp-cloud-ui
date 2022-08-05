import { HttpClient } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected q(q: { action: string, region?: string, endpoint?: string, query?: unknown, expiry?: number }) {
        const header: HeadersInit = {
            "X-TC-Service": this.qService,
            "X-TC-Version": this.qVersion,
            "X-TC-Action": q.action,
        }
        if (q.region) {
            header["X-TC-Region"] = q.region
        }
        if (q.endpoint) {
            header["X-TC-Endpoint"] = q.endpoint
        }
        if (q.expiry) {
            return this.rcache({ method: "POST", url: "/", header, query: q.query, expiry: q.expiry })
        } else {
            return this.request({ method: "POST", url: "/", header, query: q.query })
        }
    }
}
