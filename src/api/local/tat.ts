import { HttpClient } from "../basic/http"

export class TATModel extends HttpClient {
    public listScript(): Promise<TATScriptItem[]> {
        return this.get("/tat/script")
    }

    public createScript(rq: Omit<TATScriptItem, "Id">) {
        return this.post("/tat/script/", rq)
    }

    public updateScript(rq: TATScriptItem) {
        return this.patch("/tat/script/" + rq.Id, rq)
    }

    public deleteScript(id: string) {
        return this.delete("/tat/script/" + id)
    }

    public listHistory(): Promise<TATHistoryItem[]> {
        return this.get("/tat/history/")
    }

    public createHistory(rq: { Name: string, Region: string, InvocationId: string }) {
        return this.post("/tat/history/", rq)
    }

    public updateHistory(id: number, rq: { InvocationStatus: string, InvocationResultJson: string }) {
        return this.patch("/tat/history/" + id, rq)
    }

    public deleteHistory(id: number) {
        return this.delete("/tat/history/" + id)
    }
}


export interface TATScriptItem {
    Id: number
    UserId: number
    Name: string
    Description: string
    Content: string
    Username: string
    CommandType: string
    WorkingDirectory: string
    Timeout: number
}

export interface TATHistoryItem {
    Id: number
    UserId: number
    KeyId: number
    Name: string
    Region: string
    InvocationId: string
    InvocationStatus: string
    InvocationResultJson: string
}
