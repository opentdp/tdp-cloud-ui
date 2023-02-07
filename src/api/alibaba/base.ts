import { HttpClient, HttpRequest } from "@/api/basic/http"

export class AlibabaClient extends HttpClient {
    static VendorId = ""

    protected Service = ""
    protected Version = ""

    protected bus(query: AlibabaRequest, expiry = 0) {
        const req: HttpRequest = {
            method: "POST",
            url: "/alibaba/" + AlibabaClient.VendorId,
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

export function AlibabaVendor(id: number | string) {
    AlibabaClient.VendorId = id + ""
}

export interface AlibabaRequest {
    Service?: string
    Version?: string
    Action: string
    RegionId?: string
    Payload?: unknown
    Query?: unknown
}
