import { number } from "echarts"
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
