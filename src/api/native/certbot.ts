import { HttpClient } from "@/api/basic/http"

export class CertbotModel extends HttpClient {
    public list(): Promise<CertbotPaged> {
        return this.post("/certbot/list", {})
    }

    public detail(id: number): Promise<CertbotItem & { Cert: Certificate }> {
        return this.post("/certbot/detail", { Id: id })
    }

    public create(rq: CertbotOrig): Promise<{ Id: number }> {
        return this.post("/certbot/create", rq)
    }

    public update(rq: Partial<CertbotItem>): Promise<null> {
        return this.post("/certbot/update", rq)
    }

    public remove(id: number): Promise<null> {
        return this.post("/certbot/delete", { Id: id })
    }
}

export const CaTypeList: Record<string, { Name: string, Eab: number }> = {
    "letsencrypt": { Name: "Let's Encrypt", Eab: 0 },
    "buypass": { Name: "Buypass", Eab: 0 }, // Eab 忽略
    "google": { Name: "Google Public", Eab: 2 }, // Eab 必填
    "sslcom-ecc": { Name: "SSL.com ECC", Eab: 2 }, // Eab 必填
    "sslcom-rsa": { Name: "SSL.com RSA", Eab: 2 }, // Eab 必填
    "zerossl": { Name: "ZeroSSL", Eab: 1 }, // Eab 选填
    "debug": { Name: "Debug", Eab: 0 },
}

export const JobStatus: Record<string, string> = {
    "queued": "准备中", //刚提交
    "cached": "已签发", //从缓存加载
    "obtaining": "签发中",
    "failed": "签发失败",
    "obtained": "已签发",
}

export interface CertbotOrig {
    VendorId: number
    Email: string
    Domain: string
    CaType: string
    EabKeyId: string
    EabMacKey: string
    History: string
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
    Names: string[]
    NotAfter: number
    NotBefore: number
    Certificate: string[]
    PrivateKey: string
    Issuer: {
        CommonName: string
        Country: string
        Organization: string
    }
}