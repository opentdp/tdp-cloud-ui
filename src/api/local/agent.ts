import { HttpClient } from "../basic/http"

export class AgentModel extends HttpClient {
    public list(): Promise<AgentNode[]> {
        return this.get("/agent/node")
    }

    public exec(rq: ShellRequest): Promise<[]> {
        return this.post("/agent/exec", rq)
    }
}

export interface AgentNode {
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

export interface ShellRequest {
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
