import { HttpClient } from "@/api/basic/http"

import { ScriptPayload } from "./typings"

export class TasklineModel extends HttpClient {
    public list(): Promise<TasklinePaged> {
        return this.post("/taskline/list", { Order: "id DESC" })
    }

    public detail(id: number): Promise<TasklineItem> {
        return this.post("/taskline/detail", { Id: id })
    }

    public create(rq: TasklineOrig): Promise<{ Id: number }> {
        return this.post("/taskline/", rq)
    }

    public update(rq: Partial<TasklineItem>): Promise<null> {
        return this.post("/taskline/update", rq)
    }

    public remove(id: number): Promise<null> {
        return this.post("/taskline/delete", { Id: id })
    }
}

export interface TasklineOrig {
    Subject: string
    HostName: string
    WorkerId: string
    Request: ScriptPayload
    Response: TasklineResult
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

export interface TasklineResult {
    Error: string
    Output: string
}
