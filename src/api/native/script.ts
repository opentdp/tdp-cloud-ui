import { HttpClient, HttpMessage } from "@/api/basic/http"

export class ScriptModel extends HttpClient {
    public list(): Promise<ScriptPaged> {
        return this.get("/script")
    }

    public create(rq: ScriptOrig): Promise<HttpMessage> {
        return this.post("/script/", rq)
    }

    public update(rq: Partial<ScriptItem>): Promise<HttpMessage> {
        return this.patch("/script/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/script/" + id)
    }

    public osFilter(list: ScriptItem[], os: string) {
        return list.filter(s => {
            if (s.CommandType == "SHELL") {
                return os != "windows"
            }
            if (s.CommandType == "BAT" || s.CommandType == "POWERSHELL") {
                return os == "windows"
            }
        })
    }
}

export interface ScriptOrig {
    Name: string
    CommandType: string
    Username: string
    WorkDirectory: string
    Content: string
    Description: string
    Timeout: number
}

export interface ScriptItem extends ScriptOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface ScriptPaged {
    Datasets: ScriptItem[]
    Datainfo?: unknown
}
