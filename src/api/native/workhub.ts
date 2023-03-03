import { HttpClient } from "@/api/basic/http"

import { SummaryStat, DetailStat, ScriptPayload } from "./typings"

export class WorkhubModel extends HttpClient {
    public host(): Promise<HostDetail> {
        return this.get("/workhub")
    }

    public list(): Promise<WorkerPaged> {
        return this.get("/workhub/list")
    }

    public stat(id: string): Promise<DetailStat> {
        return this.get("/workhub/stat/" + id)
    }

    public exec(id: string, rq: ScriptPayload): Promise<{ Id: number }> {
        return this.post("/workhub/exec/" + id, rq)
    }

    public getRegisterURL() {
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.AppId + "/workhub"
        return origin + wsurl
    }
}

export interface HostDetail {
    Stat: DetailStat
}

export interface WorkerOrig {
    WorkerId: string
    WorkerMeta: SummaryStat
}

export interface WorkerItem extends WorkerOrig {
    Id: number
    UserId: number
    MachineId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface WorkerPaged {
    Datasets: WorkerItem[]
    Datainfo?: unknown
}
