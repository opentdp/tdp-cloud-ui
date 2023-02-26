import { HttpClient } from "@/api/basic/http"

export class CertbotModel extends HttpClient {
    public list(): Promise<CertbotPaged> {
        return this.get("/certbot")
    }

    public detail(id: number): Promise<CertbotItem & { Cert: Certificate }> {
        return this.get("/certbot/" + id)
    }

    public create(rq: CertbotOrig): Promise<{ Id: number }> {
        return this.post("/certbot", rq)
    }

    public update(rq: Partial<CertbotItem>): Promise<null> {
        return this.patch("/certbot/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/certbot/" + id)
    }
}

export const CaTypeList: Record<string, string> = {
    "letsencrypt": "Let's Encrypt",
    "zerossl": "ZeroSSL",
}

export interface CertbotOrig {
    VendorId: number
    Email: string
    Domain: string
    CaType: string
}

export interface CertbotItem extends CertbotOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CertbotPaged {
    Datasets: CertbotItem[]
    Datainfo?: unknown
}

export interface Certificate {
    Names: string
    NotAfter: number
    NotBefore: number
    Certificate: string[]
    PrivateKey: string
}