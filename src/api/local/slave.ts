import { HttpClient } from "../basic/http"

export class SlaveModel extends HttpClient {
    public listNode(): Promise<SlaveNode[]> {
        return this.get("/slave/node")
    }

    public listTask(): Promise<TaskItem[]> {
        return this.get("/slave/task")
    }
    public createTask(rq: CreateTaskRequest): Promise<[]> {
        return this.post("/slave/node/exec", rq)
    }
}

export interface SlaveNode {
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

export interface TaskItem {
    Id: number
    UserId: number
    HostId: string
    HostName: string
    Subject: string
    Content: string
    Status: string
    Result: string
    CreatedAt: number
    UpdatedAt: number
}

export interface CreateTaskRequest {
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
