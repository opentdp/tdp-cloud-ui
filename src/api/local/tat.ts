import { HttpClient } from "../basic/http"

export class TATModel extends HttpClient {
    public listScript(): Promise<TATItem[]> {
        return this.get("/tat/script")
    }

    public createScript(src: Omit<TATItem, "Id">) {
        return this.post("/tat/script/", src)
    }

    public updateScript(src: TATItem) {
        return this.patch("/tat/script/" + src.Id, src)
    }

    public deleteScript(id: string) {
        return this.delete("/tat/script/" + id)
    }

    public listHistory(): Promise<TATHistoryItem[]> {
        return this.get("/tat/history/")
    }

    public createHistory(src: {
        Name: string,
        Region: string,
        InvocationId: string
    }) {
        return this.post("/tat/history/", src)
    }

    public updateHistory(id: number, query: { InvocationStatus: string, InvocationResultJson: string }) {
        return this.patch("/tat/history/" + id, query)
    }

    public deleteHistory(id: number) {
        return this.delete("/tat/history/" + id)
    }
}


export interface TATItem {
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
