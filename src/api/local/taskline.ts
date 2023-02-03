import { HttpClient } from "@/api/basic/http"

import { ScriptOrig } from "./script"

export class TasklineModel extends HttpClient {
    public list(): Promise<TasklinePaged> {
        return this.get("/taskline")
    }
}

export interface TasklineOrig {
    Subject: string
    HostName: string
    WorkerId: string
    Request: ScriptOrig
    Response: TasklineResponse
    Status: string
}

export interface TasklineItem extends TasklineOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface TasklinePaged {
    Datasets: TasklineItem[]
    Datainfo?: unknown
}

export interface TasklineResponse {
    Output: string
}
