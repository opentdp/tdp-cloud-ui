import { HttpClient } from "../basic/http"

export class DomainModel extends HttpClient {
    public list(): Promise<DomainItem[]> {
        return this.get("/domain")
    }

    public detail(name: string): Promise<DomainItem> {
        return this.get("/domain/" + name)
    }

    public create(rq: DomainRequest): Promise<DomainResponse> {
        return this.post("/domain", rq)
    }

    public update(rq: DomainItem): Promise<DomainResponse> {
        return this.patch("/domain/" + rq.Name, rq)
    }

    public remove(name: string): Promise<DomainResponse> {
        return this.delete("/domain/" + name)
    }
}

export interface DomainItem {
    Id: number
    Name: string
    Value: string
    Module: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}

export interface DomainRequest {
    Name: string
    Value: string
    Module: string
    Description: string
}

export interface DomainResponse {
    Message: string
}
