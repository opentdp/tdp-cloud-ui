import { HttpClient } from "../basic/http"

export class AgentModel extends HttpClient {
    public listNode(): Promise<AgentNode[]> {
        return this.get("/agent/node")
    }
    public runCommand(rq: ShellRequest): Promise<[]> {
        return this.post("/agent/command", rq)
    }
}

export interface AgentNode {
    Addr: string
    Stat: {
        CpuPercent: number
        DiskFree: number
        DiskTotal: number
        DiskUsedPercent: number
        Hostname: string
        MemoryAvailable: number
        MemoryPercent: number
        MemoryTotal: number
        MemoryUsed: number
        NetBytesRecv: number
        NetBytesSent: number
        OS: string
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
