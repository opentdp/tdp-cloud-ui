import { HttpClient, HttpMessage } from "@/api/basic/http"

export class MachineModel extends HttpClient {
    public list(): Promise<MachineItem[]> {
        return this.get("/machine")
    }

    public detail(id: number): Promise<MachineItem> {
        return this.get("/machine/" + id)
    }

    public create(rq: MachineRequest): Promise<HttpMessage> {
        return this.post("/machine", rq)
    }

    public update(rq: MachineItem): Promise<HttpMessage> {
        return this.patch("/machine/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/machine/" + id)
    }
}

export interface MachineItem {
    Id: number
    UserId: number
    VendorId: number
    HostName: string
    IpAddress: string
    OSType: string
    Region: string
    Model: "local/worker" | "qcloud/lighthouse"
    CloudId: string
    CloudMeta: Record<string, unknown>
    Description: string
    Status: string
    CreatedAt: string
    UpdatedAt: string
}

export interface MachineRequest {
    VendorId: number
    HostName: string
    IpAddress: string
    OSType: string
    Region: string
    Model: "local/worker" | "qcloud/lighthouse"
    CloudId: string
    CloudMeta: string
    Description: string
    Status: string
}
