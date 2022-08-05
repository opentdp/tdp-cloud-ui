import { HttpClient } from "./http"

export class QCloudClient extends HttpClient {
    protected api = "/api/qcloud"

    protected qService = ""
    protected qVersion = ""

    protected q(q: { action: string, region?: string, endpoint?: string, query?: unknown, expiry?: number }) {
        let header: HeadersInit = {
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
        header = {
            "TDP-Cloud": JSON.stringify(header)
        }
        if (q.expiry) {
            return this.rcache({ method: "POST", url: "/", header, query: q.query, expiry: q.expiry })
        } else {
            return this.request({ method: "POST", url: "/", header, query: q.query })
        }
    }
}
