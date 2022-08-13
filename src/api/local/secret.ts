import { HttpClient } from "../basic/http"

export class SecretModel extends HttpClient {
    public list(): Promise<SecretItem[]> {
        return this.get("/secret")
    }

    public create(rq: SecretRequest): Promise<SecretResponse> {
        return this.post("/secret", rq)
    }

    public update(rq: SecretItem): Promise<SecretResponse> {
        return this.patch("/secret/" + rq.Id, rq)
    }

    public remove(id: number): Promise<SecretResponse> {
        return this.delete("/secret/" + id)
    }
}

export interface SecretItem {
    Id: number
    UserId: number
    SecretId: string
    SecretKey: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}

export interface SecretRequest {
    SecretId: string
    SecretKey: string
    Description: string
}

export interface SecretResponse {
    Message: string
}
