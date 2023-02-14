import { HttpClient } from "@/api/basic/http"

import { ScriptOrig } from "./script"

export class WorkhubModel extends HttpClient {
    public host(): Promise<HostResponse> {
        return this.get("/workhub")
    }

    public list(): Promise<WorkerPaged> {
        return this.get("/workhub/list")
    }

    public exec(rq: WorkerExecRequest): Promise<{ Id: number }> {
        return this.post("/workhub/exec", rq)
    }

    public getRegisterURL() {
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.appid + "/workhub"
        return origin + wsurl
    }
}

export interface WorkerMeta {
    HostId: string
    HostName: string
    Uptime: number
    OS: string
    CpuCore: number
    CpuPercent: number
    MemoryTotal: number
    MemoryUsed: number
    DiskTotal: number
    DiskUsed: number
    IpAddress: string
    NetBytesRecv: number
    NetBytesSent: number
}

export interface HostResponse {
    HostInfo: WorkerMeta
}

export interface WorkerOrig {
    WorkerId: string
    WorkerMeta: WorkerMeta
}

export interface WorkerItem extends WorkerOrig {
    Id: number
    UserId: number
    MachineId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface WorkerPaged {
    Datasets: WorkerItem[]
    Datainfo?: unknown
}

export interface WorkerExecRequest {
    WorkerId: string
    Payload: ScriptOrig
}
