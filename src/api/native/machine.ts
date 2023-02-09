import { HttpClient } from "@/api/basic/http"

export class MachineModel extends HttpClient {
    public list(): Promise<MachinePaged> {
        return this.get("/machine")
    }

    public detail(id: number): Promise<MachineItem> {
        return this.get("/machine/" + id)
    }

    public create(rq: MachineOrig): Promise<{ Id: number }> {
        return this.post("/machine", rq)
    }

    public update(rq: Partial<MachineItem>): Promise<null> {
        return this.patch("/machine/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/machine/" + id)
    }
}

export const MachineModels: Record<string, string> = {
    "native/worker": "独立节点",
    "tencent/cvm": "腾讯云/CVM",
    "tencent/lighthouse": "腾讯云/LH",
    "alibaba/ecs": "阿里云/ECS",
    "alibaba/swas": "阿里云/SWAS",
}

export interface MachineOrig {
    VendorId: number
    HostName: string
    IpAddress: string
    OSType: string
    Region: string
    Model: keyof (typeof MachineModels)
    CloudId: string
    CloudMeta: unknown
    WorkerId: string
    WorkerMeta: unknown
    Description: string
    Status: number
}

export interface MachineItem extends MachineOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface MachinePaged {
    Datasets: MachineItem[]
    Datainfo?: unknown
}
