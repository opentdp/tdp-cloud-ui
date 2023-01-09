import { HttpClient } from "../basic/http"

export class MachineModel extends HttpClient {
    public list(): Promise<MachineItem[]> {
        return this.get("/machine")
    }

    public detail(name: string): Promise<MachineItem> {
        return this.get("/machine/" + name)
    }

    public create(rq: MachineRequest): Promise<MachineResponse> {
        return this.post("/machine", rq)
    }

    public update(rq: MachineItem): Promise<MachineResponse> {
        return this.patch("/machine/" + rq.Name, rq)
    }

    public remove(name: string): Promise<MachineResponse> {
        return this.delete("/machine/" + name)
    }
}

export interface MachineItem {
    Id: number
    UserId: number
    VendorId: number
    HostName: string
    Address: string
    Status: string
    CloudData: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}

export interface MachineRequest {
    VendorId: number
    HostName: string
    Address: string
    Status: string
    CloudData: string
    Description: string
}

export interface MachineResponse {
    Message: string
}
