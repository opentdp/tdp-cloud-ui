import { HttpClient } from "../basic/http"

export class MachineModel extends HttpClient {
    public list(): Promise<MachineItem[]> {
        return this.get("/machine")
    }

    public detail(id: number): Promise<MachineItem> {
        return this.get("/machine/" + id)
    }

    public create(rq: MachineRequest): Promise<MachineResponse> {
        return this.post("/machine", rq)
    }

    public update(rq: MachineItem): Promise<MachineResponse> {
        return this.patch("/machine/" + rq.Id, rq)
    }

    public remove(id: number): Promise<MachineResponse> {
        return this.delete("/machine/" + id)
    }
}

export interface MachineItem {
    Id: number
    UserId: number
    VendorId: number
    HostName: string
    IpAddress: string
    Region: string
    Model: "" | "qcloud/lighthouse"
    CloudId: string
    CloudMeta: Record<string, any>
    Description: string
    Status: string
    CreatedAt: string
    UpdatedAt: string
}

export interface MachineRequest {
    VendorId: number
    HostName: string
    IpAddress: string
    Region: string
    Model: "" | "qcloud/lighthouse"
    CloudId: string
    CloudMeta: string
    Description: string
    Status: string
}

export interface MachineResponse {
    Message: string
}
