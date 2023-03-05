import { HttpClient } from "@/api/basic/http"

export class VendorModel extends HttpClient {
    public list(): Promise<VendorPaged> {
        return this.post("/vendor/list", {})
    }

    public detail(id: number): Promise<VendorItem> {
        return this.post("/vendor/detail", { Id: id })
    }

    public create(rq: VendorOrig): Promise<{ Id: number }> {
        return this.post("/vendor/create", rq)
    }

    public update(rq: Partial<VendorItem>): Promise<null> {
        return this.post("/vendor/update" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.post("/vendor/delete", { Id: id })
    }
}

export const ProviderList: Record<string, string> = {
    "cloudflare": "Cloudflare",
    "tencent": "腾讯云",
}

export interface VendorOrig {
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
}

export interface VendorItem extends VendorOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface VendorPaged {
    Datasets: VendorItem[]
    Datainfo?: unknown
}
