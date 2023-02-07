import { HttpClient, HttpMessage } from "@/api/basic/http"

export class DomainModel extends HttpClient {
    public list(): Promise<DomainPaged> {
        return this.get("/domain")
    }

    public detail(id: number): Promise<DomainItem> {
        return this.get("/domain/" + id)
    }

    public create(rq: DomainOrig): Promise<HttpMessage> {
        return this.post("/domain", rq)
    }

    public update(rq: Partial<DomainItem>): Promise<HttpMessage> {
        return this.patch("/domain/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/domain/" + id)
    }
}

export const DomainModels: Record<string, string> = {
    "cloudflare/zone": "Cloudflare",
    "tencent/dnspod": "DNSPod",
}

export interface DomainOrig {
    VendorId: number
    Name: string
    NSList: string
    Model: keyof (typeof DomainModels)
    CloudId: string
    CloudMeta: unknown
    Description: string
    Status: number
}

export interface DomainItem extends DomainOrig {
    Id: number
    UserId: number
    CreatedAt: string
    UpdatedAt: string
}

export interface DomainPaged {
    Datasets: DomainItem[]
    Datainfo?: unknown
}
