import { HttpClient, HttpRequest } from "@/api/basic/http"

export class QcloudClient extends HttpClient {
    static VendorId = ""

    protected Service = ""
    protected Version = ""

    protected bus(query: QcloudRequest, expiry = 0) {
        const req: HttpRequest = {
            method: "POST",
            url: "/qcloud/" + QcloudClient.VendorId,
            query: Object.assign({
                Service: this.Service,
                Version: this.Version,
            }, query)
        }

        if (expiry > 0) {
            return this.rcache(req, expiry)
        }

        return this.request(req)
    }
}

export function QcloudVendor(id: number | string) {
    QcloudClient.VendorId = id + ""
}

export interface QcloudRequest {
    Service?: string
    Version?: string
    Action: string
    Payload?: unknown
    Region?: string
    Endpoint?: string
}
