import { HttpClient } from "../basic/http"

export class SecretModel extends HttpClient {
    public create(data: SecretRequest): Promise<SecretResponse> {
        return this.post("/secret", data)
    }

    public remove(id: number): Promise<SecretResponse> {
        return this.delete("/secret/" + id)
    }

    public fetch(): Promise<SecretItem[]> {
        return this.get("/secret")
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
