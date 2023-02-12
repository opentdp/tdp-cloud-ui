import { HttpClient } from "@/api/basic/http"

import { ScriptOrig } from "./script"

export class TasklineModel extends HttpClient {
    public list(): Promise<TasklinePaged> {
        return this.get("/taskline")
    }

    public detail(id: number): Promise<TasklineItem> {
        return this.get("/taskline/" + id)
    }

    public create(rq: TasklineOrig): Promise<{ Id: number }> {
        return this.post("/taskline/", rq)
    }

    public update(rq: Partial<TasklineItem>): Promise<null> {
        return this.patch("/taskline/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/taskline/" + id)
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
