import { HttpClient, HttpRequest } from "./http"

export class QcloudClient extends HttpClient {
    static vendorId = ""

    protected qService = ""
    protected qVersion = ""

    protected q(query: QcloudRequest, expiry = 0) {
        const req: HttpRequest = {
            method: "POST",
            url: "/qcloud/" + QcloudClient.vendorId,
            query: Object.assign({
                Service: this.qService,
                Version: this.qVersion,
            }, query)
        }

        if (expiry > 0) {
            return this.rcache(req, expiry)
        }

        return this.request(req)
    }
}

export function QcloudVendor(id: number | string) {
    QcloudClient.vendorId = id + ""
}

export interface QcloudRequest {
    Service?: string
    Version?: string
    Action: string
    Payload?: unknown
    Region?: string
    Endpoint?: string
}
