import { HttpClient, HttpMessage } from "@/api/basic/http"

export class VendorModel extends HttpClient {
    public list(): Promise<VendorItem[]> {
        return this.get("/vendor")
    }

    public create(rq: VendorOrig): Promise<HttpMessage> {
        return this.post("/vendor", rq)
    }

    public update(rq: VendorItem): Promise<HttpMessage> {
        return this.patch("/vendor/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/vendor/" + id)
    }
}

export const ProviderList = {
    "cloudflare": "Cloudflare",
    "qcloud": "腾讯云",
}

export interface VendorOrig {
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
}

export interface VendorItem extends VendorOrig {
    Id: number
    UserId?: number
    CreatedAt?: string
    UpdatedAt?: string
}
