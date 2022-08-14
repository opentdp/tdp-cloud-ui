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
    Addr: string
    Stat: {
        Hostname: string
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
    Addr: string
    Payload: {
        Content: string
        Username: string
        CommandType: string
        WorkingDirectory: string
        Timeout: number
    }
}
