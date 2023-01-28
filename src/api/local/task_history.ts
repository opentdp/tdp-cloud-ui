import { HttpClient } from "@/api/basic/http"
import { TaskScriptOrig } from "./task_script"

export class TaskHistoryModel extends HttpClient {
    public list(): Promise<TaskHistoryItem[]> {
        return this.get("/task/history")
    }
}

export interface TaskHistoryOrig {
    Subject: string
    HostName: string
    WorkerId: string
    Request: TaskScriptOrig
    Response: TaskHistoryResponse
    Status: string
}

export interface TaskHistoryItem extends TaskHistoryOrig {
    Id: number
    UserId?: number
    CreatedAt?: number
    UpdatedAt?: number
}

export interface TaskHistoryResponse {
    Output: string
}
