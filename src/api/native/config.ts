import { HttpClient } from "@/api/basic/http"

export class ConfigModel extends HttpClient {
    public list(): Promise<ConfigPaged> {
        return this.get("/config")
    }

    public detail(name: string): Promise<ConfigItem> {
        return this.get("/config/" + name)
    }

    public create(rq: ConfigOrig): Promise<{ Id: number }> {
        return this.post("/config", rq)
    }

    public update(rq: Partial<ConfigItem>): Promise<null> {
        return this.patch("/config/" + rq.Name, rq)
    }

    public remove(name: string): Promise<null> {
        return this.delete("/config/" + name)
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
