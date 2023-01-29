import { HttpClient, HttpRequest } from "./http"

export class QcloudClient extends HttpClient {
    static vendorId = ""

    protected qService = ""
    protected qVersion = ""

    protected q(q: QcloudRequest) {
        const query: QcloudParams = {
            Service: this.qService,
            Version: this.qVersion,
            Action: q.action,
            Payload: q.query || {},
        }

        q.region && (query.Region = q.region)
        q.endpoint && (query.Endpoint = q.endpoint)

        const req: HttpRequest = {
            url: "/qcloud/" + QcloudClient.vendorId,
            method: "POST",
            query: query
        }

        if (q.expiry && q.expiry > 0) {
            return this.rcache(Object.assign(req, { expiry: q.expiry }))
        }

        return this.request(req)
    }
}

export function QcloudVendor(id: number | string) {
    QcloudClient.vendorId = id + ""
}

export interface QcloudParams {
    Service: string
    Version: string
    Action: string
    Payload: unknown
    Region?: string
    Endpoint?: string
}

export interface QcloudRequest {
    action: string
    query?: unknown
    region?: string
    endpoint?: string
    expiry?: number
}
