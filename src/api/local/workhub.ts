import { HttpClient } from "@/api/basic/http"

import { TaskScriptOrig } from "./task_script"

export class WorkhubModel extends HttpClient {
    public list(): Promise<WorkerItem[]> {
        return this.get("/workhub")
    }

    public exec(rq: WorkerExecRequest): Promise<[]> {
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

export interface WorkerOrig {
    WorkerId: string
    WorkerMeta: WorkerMeta
}

export interface WorkerItem extends WorkerOrig {
    Id: number
    UserId?: number
    MachineId?: number
    CreatedAt?: number
    UpdatedAt?: number
}

export interface WorkerExecRequest {
    WorkerId: string
    Payload: TaskScriptOrig
}
