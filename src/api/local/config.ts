import { HttpClient } from "../basic/http"

export class ConfigModel extends HttpClient {
    public list(): Promise<ConfigItem[]> {
        return this.get("/config")
    }

    public detail(name: string): Promise<ConfigItem> {
        return this.get("/config/" + name)
    }

    public create(data: ConfigRequest): Promise<ConfigResponse> {
        return this.post("/config", data)
    }

    public update(data: ConfigItem): Promise<ConfigResponse> {
        return this.patch("/config/" + data.Name, data)
    }

    public remove(name: string): Promise<ConfigResponse> {
        return this.delete("/config/" + name)
    }
}

export interface ConfigRequest {
    Name: string
    Value: string
    Module: string
    Description: string
}

export interface ConfigResponse {
    Message: string
}

export interface ConfigItem {
    Id: number
    Name: string
    Value: string
    Module: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}
