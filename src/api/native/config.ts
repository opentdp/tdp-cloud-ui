import { HttpClient } from "@/api/basic/http"

export class ConfigModel extends HttpClient {
    public list(): Promise<ConfigPaged> {
        return this.get("/config")
    }

    public detail(id: number): Promise<ConfigItem> {
        return this.get("/config/" + id)
    }

    public detailName(name: string): Promise<ConfigItem> {
        return this.get("/config/name/" + name)
    }

    public create(rq: ConfigOrig): Promise<{ Id: number }> {
        return this.post("/config", rq)
    }

    public update(rq: Partial<ConfigItem>): Promise<null> {
        return this.patch("/config/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/config/" + id)
    }

    public ui(): Promise<UIOption> {
        return this.get("/config/ui")
    }
}

export interface ConfigOrig {
    Name: string
    Value: string
    Module: string
    Description: string
}

export interface ConfigItem extends ConfigOrig {
    Id: number
    CreatedAt: number
    UpdatedAt: number
}

export interface ConfigPaged {
    Datasets: ConfigItem[]
    Datainfo?: unknown
}

export interface UIOption {
    register: boolean
}
