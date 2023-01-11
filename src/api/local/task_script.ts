import { HttpClient, HttpMessage } from "../basic/http"

export class TaskScriptModel extends HttpClient {
    public list(): Promise<TaskScriptItem[]> {
        return this.get("/task/script")
    }

    public create(rq: TaskScriptRequest): Promise<HttpMessage> {
        return this.post("/task/script/", rq)
    }

    public update(rq: TaskScriptItem): Promise<HttpMessage> {
        return this.patch("/task/script/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/task/script/" + id)
    }
}

export interface TaskScriptItem {
    Id: number
    UserId: number
    Name: string
    Username: string
    Description: string
    Content: string
    CommandType: string
    WorkDirectory: string
    Timeout: number
}

export interface TaskScriptRequest {
    Name: string
    Username: string
    Description: string
    Content: string
    CommandType: string
    WorkDirectory: string
    Timeout: number
}
