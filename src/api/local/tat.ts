import { HttpClient } from "../basic/http"

export class TATModel extends HttpClient {
    public fetchTATList(): Promise<TATItem[]> {
        return this.get("/tat")
    }

    public updateTAT(src: TATItem) {
        return this.patch("/tat/" + src.Id, src)
    }

    public newTAT(src: Omit<TATItem, "Id">) {
        return this.post("/tat/", src)
    }

    public deleteTAT(id: string) {
        return this.delete("/tat/" + id)
    }

    public newTATHistory(src: {
        Name: string,
        Region: string,
        InvocationId: string
    }) {
        return this.post("/tat/history/", src)
    }

    public fetchTATHistoryList(): Promise<TATHistoryItem[]> {
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

