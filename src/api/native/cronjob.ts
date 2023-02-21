import { HttpClient } from "@/api/basic/http"

export class CronjobModel extends HttpClient {
    public list(): Promise<CronjobPaged> {
        return this.get("/cronjob")
    }

    public detail(id: number): Promise<CronjobItem> {
        return this.get("/cronjob/" + id)
    }

    public create(rq: CronjobOrig): Promise<{ Id: number }> {
        return this.post("/cronjob", rq)
    }

    public update(rq: Partial<CronjobItem>): Promise<null> {
        return this.patch("/cronjob/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/cronjob/" + id)
    }
}

export interface CronjobOrig {
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

export interface CronjobItem extends CronjobOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface CronjobPaged {
    Datasets: CronjobItem[]
    Datainfo?: unknown
}
