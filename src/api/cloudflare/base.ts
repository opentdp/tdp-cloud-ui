import { HttpClient, HttpRequest } from "@/api/basic/http"

export class Cloudflare extends HttpClient {
    static vendorId = ""

    protected qService = ""
    protected qVersion = ""

    protected q(query: CloudflareRequest, expiry = 0) {
        const req: HttpRequest = {
            method: "POST",
            url: "/Cloudflare/" + Cloudflare.vendorId,
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

export function CloudflareVendor(id: number | string) {
    Cloudflare.vendorId = id + ""
}

export interface CloudflareRequest {
    Service?: string
    Version?: string
    Action: string
    Payload?: unknown
    Region?: string
    Endpoint?: string
}
