import { HttpClient } from "@/api/basic/http"

export class CrontabModel extends HttpClient {
    public list(): Promise<CrontabPaged> {
        return this.get("/crontab")
    }

    public detail(id: number): Promise<CrontabItem> {
        return this.get("/crontab/" + id)
    }

    public create(rq: CrontabOrig): Promise<{ Id: number }> {
        return this.post("/crontab", rq)
    }

    public update(rq: Partial<CrontabItem>): Promise<null> {
        return this.patch("/crontab/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/crontab/" + id)
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
