import { HttpClient } from "../basic/http"

export class SecretModel extends HttpClient {
    public fetch(): Promise<SecretItem[]> {
        return this.get("/secret")
    }

    public create(data: SecretRequest): Promise<SecretResponse> {
        return this.post("/secret", data)
    }

    public update(data: SecretItem): Promise<SecretResponse> {
        return this.patch("/secret/" + data.Id, data)
    }

    public remove(id: number): Promise<SecretResponse> {
        return this.delete("/secret/" + id)
    }
}

export interface SecretRequest {
    SecretId: string
    SecretKey: string
    Description: string
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
}
