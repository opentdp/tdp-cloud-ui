import { HttpClient } from "@/api/basic/http"

export class CertjobModel extends HttpClient {
    public list(): Promise<CertjobPaged> {
        return this.get("/certjob")
    }

    public detail(id: number): Promise<CertjobItem> {
        return this.get("/certjob/" + id)
    }

    public create(rq: CertjobOrig): Promise<{ Id: number }> {
        return this.post("/certjob", rq)
    }

    public update(rq: Partial<CertjobItem>): Promise<null> {
        return this.patch("/certjob/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/certjob/" + id)
    }
}

export interface CertjobOrig {
    VendorId: number
    Email: string
    Domain: string
    CaType: string
}

export interface CertjobItem extends CertjobOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CertjobPaged {
    Datasets: CertjobItem[]
    Datainfo?: unknown
}
