import { HttpClient } from "@/api/basic/http"

import { ScriptPayload } from "./typings"

export class ScriptModel extends HttpClient {
    public list(): Promise<ScriptPaged> {
        return this.post("/script/list", {})
    }

    public detail(name: string): Promise<ScriptItem> {
        return this.post("/script/detail", { Name: name })
    }

    public create(rq: ScriptPayload): Promise<{ Id: number }> {
        return this.post("/script/create", rq)
    }

    public update(rq: Partial<ScriptItem>): Promise<null> {
        return this.post("/script/update", rq)
    }

    public remove(id: number): Promise<null> {
        return this.post("/script/delete", { Id: id })
    }

    public osFilter(list: ScriptPayload[], os: string) {
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
