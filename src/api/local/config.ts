import { HttpClient, HttpMessage } from "@/api/basic/http"

export class ConfigModel extends HttpClient {
    public list(): Promise<ConfigItem[]> {
        return this.get("/config")
    }

    public detail(name: string): Promise<ConfigItem> {
        return this.get("/config/" + name)
    }

    public create(rq: ConfigOrig): Promise<HttpMessage> {
        return this.post("/config", rq)
    }

    public update(rq: ConfigItem): Promise<HttpMessage> {
        return this.patch("/config/" + rq.Name, rq)
    }

    public remove(name: string): Promise<HttpMessage> {
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
    CreatedAt?: string
    UpdatedAt?: string
}
