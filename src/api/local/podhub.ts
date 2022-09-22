import { HttpClient } from "../basic/http"

export class PodhubModel extends HttpClient {
    public list(): Promise<Worker[]> {
        return this.get("/podhub")
    }

    public exec(rq: WorkserExecRequest): Promise<[]> {
        return this.post("/podhub/exec", rq)
    }
}

export interface Worker {
    HostId: string
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

export interface WorkserExecRequest {
    HostId: string
    Payload: {
        Name: string
        CommandType: string
        Content: string
        Username: string
        WorkingDirectory: string
        Timeout: number
    }
}
