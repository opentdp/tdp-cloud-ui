import { HttpClient } from "../basic/http"

export class TATClient extends HttpClient {
    public fetchTATList(): Promise<TATItem[]> {
        return this.get("/tat")
    }

    public updateTAT(src: { id: number, name: string, description: string, content: string }) {
        return this.patch("/tat/" + src.id, src)
    }

    public newTAT(src: { name: string, description: string, content: string }) {
        return this.post("/tat/", src)
    }

    public deleteTAT(id: string) {
        return this.delete("/tat/" + id)
    }
}


export interface TATItem {
    Id: number
    UserId: number
    Name: string
    Description: string
    Content: string
}
