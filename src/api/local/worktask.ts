import { HttpClient } from "../basic/http"

export class WorktaskModel extends HttpClient {
    public listTask(): Promise<TaskItem[]> {
        return this.get("/worktask")
    }
}

export interface TaskItem {
    Id: number
    UserId: number
    HostId: string
    HostName: string
    Subject: string
    Status: string
    Request: TaskRequest
    Response: TaskResponse
    CreatedAt: number
    UpdatedAt: number
}

export interface TaskRequest {
    CommandType: string
    Content: string
    Name: string
    Timeout: number
    Username: string
    WorkingDirectory: string
}

export interface TaskResponse {
    Output: string
}
