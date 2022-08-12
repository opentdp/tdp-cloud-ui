import { HttpClient } from "../basic/http"

export class TATModel extends HttpClient {
    public getTATList(): Promise<TATItem[]> {
        return this.get("/tat/script")
    }

    public updateTAT(src: TATItem) {
        return this.patch("/tat/script/" + src.Id, src)
    }

    public newTAT(src: Omit<TATItem, "Id">) {
        return this.post("/tat/script/", src)
    }

    public deleteTAT(id: string) {
        return this.delete("/tat/script/" + id)
    }

    public newTATHistory(src: {
        Name: string,
        Region: string,
        InvocationId: string
    }) {
        return this.post("/tat/history/", src)
    }

    public getTATHistoryList(): Promise<TATHistoryItem[]> {
        return this.get("/tat/history/")
    }

    public deleteTATHistory(id: number) {
        return this.delete("/tat/history/" + id)
    }

    public updateTATHistory(id: number, query: { InvocationStatus: string, InvocationResultJson: string }) {
        return this.patch("/tat/history/" + id, query)
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
