import { HttpClient } from "../basic/http"

export class WorkhubModel extends HttpClient {
    public list(): Promise<WorkerItem[]> {
        return this.get("/workhub")
    }

    public exec(rq: WorkerExecRequest): Promise<[]> {
        return this.post("/workhub/exec", rq)
    }
}

export interface WorkerItem {
    OSType: string
    HostId: string
    HostName: string
    RemoteAddr: string
    SystemStat: {
        HostName: string
        Uptime: number
        OS: string
        CpuCore: number
        CpuPercent: number
        MemoryTotal: number
        MemoryUsed: number
        DiskTotal: number
        DiskUsed: number
        NetBytesRecv: number
        NetBytesSent: number
    }
}

export interface WorkerExecRequest {
    HostId: string
    Payload: {
        Name: string
        CommandType: string
        Content: string
        Username: string
        WorkDirectory: string
        Timeout: number
    }
}
