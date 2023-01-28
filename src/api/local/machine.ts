import { HttpClient, HttpMessage } from "@/api/basic/http"

export class MachineModel extends HttpClient {
    public list(): Promise<MachineItem[]> {
        return this.get("/machine")
    }

    public detail(id: number): Promise<MachineItem> {
        return this.get("/machine/" + id)
    }

    public create(rq: MachineOrig): Promise<HttpMessage> {
        return this.post("/machine", rq)
    }

    public update(rq: Partial<MachineItem>): Promise<HttpMessage> {
        return this.patch("/machine/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/machine/" + id)
    }
}

export interface MachineOrig {
    VendorId: number
    HostName: string
    IpAddress: string
    OSType: string
    Region: string
    Model: "local/worker" | "qcloud/lighthouse"
    CloudId: string
    CloudMeta: unknown
    WorkerId: string
    WorkerMeta: unknown
    Description: string
    Status: number
}

export interface MachineItem extends MachineOrig {
    Id: number
    UserId?: number
    CreatedAt?: string
    UpdatedAt?: string
}
