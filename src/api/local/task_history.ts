import { HttpClient } from "../basic/http"

export class TaskHistoryModel extends HttpClient {
    public list(): Promise<TaskHistoryItem[]> {
        return this.get("/task/history")
    }
}

export interface TaskHistoryItem {
    Id: number
    UserId: number
    HostId: string
    Subject: string
    HostName: string
    Request: TaskHistoryRequest
    Response: TaskHistoryResponse
    Status: string
    CreatedAt: number
    UpdatedAt: number
}

export interface TaskHistoryRequest {
    Name: string
    CommandType: string
    Content: string
    Username: string
    WorkDirectory: string
    Timeout: number
}

export interface TaskHistoryResponse {
    Output: string
}
