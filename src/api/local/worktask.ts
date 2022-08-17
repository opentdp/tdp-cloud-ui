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
    Content: string
    Status: string
    Result: string
    CreatedAt: number
    UpdatedAt: number
}
