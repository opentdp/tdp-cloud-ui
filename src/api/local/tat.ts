import { HttpClient } from "../basic/http"

export class TATClient extends HttpClient {


    public fetchTATList(): Promise<TATItem[]> {
        return this.get("/tat")
    }
}


export interface TATItem {
    Id: number
    UserId: number
    Name: string
    Description: string
    Content: string
}
