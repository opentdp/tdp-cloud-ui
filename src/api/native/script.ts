import { HttpClient } from "@/api/basic/http"

import { ScriptPayload } from "./typings"

export class ScriptModel extends HttpClient {
    public list(): Promise<ScriptPaged> {
        return this.get("/script")
    }

    public detail(name: string): Promise<ScriptItem> {
        return this.get("/script/" + name)
    }

    public create(rq: ScriptPayload): Promise<{ Id: number }> {
        return this.post("/script/", rq)
    }

    public update(rq: Partial<ScriptItem>): Promise<null> {
        return this.patch("/script/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
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

export interface ScriptItem extends ScriptPayload {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface ScriptPaged {
    Datasets: ScriptItem[]
    Datainfo?: unknown
}
