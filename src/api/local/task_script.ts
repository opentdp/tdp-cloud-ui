import { HttpClient, HttpMessage } from "@/api/basic/http"

export class TaskScriptModel extends HttpClient {
    public list(): Promise<TaskScriptPaged> {
        return this.get("/task/script")
    }

    public create(rq: TaskScriptOrig): Promise<HttpMessage> {
        return this.post("/task/script/", rq)
    }

    public update(rq: Partial<TaskScriptItem>): Promise<HttpMessage> {
        return this.patch("/task/script/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/task/script/" + id)
    }

    public osFilter(list: TaskScriptItem[], os: string) {
        return list.filter(s => {
            if (s.CommandType == "SHELL") {
                return os != "windows"
            }
            if (s.CommandType == "CMD" || s.CommandType == "POWERSHELL") {
                return os == "windows"
            }
        })
    }
}

export interface TaskScriptOrig {
    Name: string
    CommandType: string
    Username: string
    WorkDirectory: string
    Content: string
    Description: string
    Timeout: number
}

export interface TaskScriptItem extends TaskScriptOrig {
    Id: number
    UserId: number
    CreatedAt: string
    UpdatedAt: string
}

export interface TaskScriptPaged {
    Datasets: TaskScriptItem[]
    Datainfo?: unknown
}
