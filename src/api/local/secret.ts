import { HttpClient } from "../basic/http"

export class SecretClient extends HttpClient {
    public clear() {
        this.cached.clear(true)
    }

    public create(data: SecretRequest): Promise<SecretResponse> {
        return this.post("/local/secret", data)
    }

    public remove(id: number): Promise<SecretResponse> {
        return this.delete("/local/secret/" + id)
    }

    public fetch(): Promise<SecretItem[]> {
        return this.get("/local/secret")
    }
}

export interface SecretRequest {
    secretId: string
    secretKey: string
    description: string
}

export interface SecretResponse {
    Message: string
}

export interface SecretItem {
    Id: number
    UserId: number
    SecretId: string
    SecretKey: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
}
