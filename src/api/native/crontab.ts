import { HttpClient } from "@/api/basic/http"

export class CrontabModel extends HttpClient {
    public list(): Promise<CrontabPaged> {
        return this.post("/crontab/list", {})
    }

    public detail(id: number): Promise<CrontabItem> {
        return this.post("/crontab/detail", { Id: id })
    }

    public create(rq: CrontabOrig): Promise<{ Id: number }> {
        return this.post("/crontab/create", rq)
    }

    public update(rq: Partial<CrontabItem>): Promise<null> {
        return this.post("/crontab/update", rq)
    }

    public remove(id: number): Promise<null> {
        return this.post("/crontab/delete", { Id: id })
    }
}

export interface CrontabOrig {
    Name: string
    Type: string
    Content: string
    Second: string
    Minute: string
    Hour: string
    DayofMonth: string
    Month: string
    DayofWeek: string
    Location: string
    PrevTime: number
    NextTime: number
}

export interface CrontabItem extends CrontabOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CrontabPaged {
    Datasets: CrontabItem[]
    Datainfo?: unknown
}
