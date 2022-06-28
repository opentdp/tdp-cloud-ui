import { HttpClient } from "../basic/http"

export class MemberClient extends HttpClient {
    public login(data: LoginRequest): Promise<LoginResponse> {
        return this.post("/local/member/login", data)
    }

    public register(data: RegisterRequest): Promise<RegisterResponse> {
        return this.post("/local/member/register", data)
    }

    public createSecret(data: SecretRequest): Promise<SecretResponse> {
        return this.post("/local/member/secret", data)
    }

    public deleteSecret(id: number): Promise<SecretResponse> {
        return this.delete("/local/member/secret/" + id)
    }

    public fetchSecrets(): Promise<SecretItem[]> {
        return this.get("/local/member/secret")
    }

    public updateInfo(data: { description: string }): Promise<string> {
        return this.patch("/local/member/info", data)
    }

    public updatePassword(data: {
        oldPassword: string
        newPassword: string
    }): Promise<string> {
        return this.patch("/local/member/password", data)
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
    DeletedAt: string
}

interface LoginRequest {
    username: string
    password: string
}

interface LoginResponse {
    keyid: number
    token: string
    username: string
    description: string
}

interface RegisterRequest {
    username: string
    password: string
}

interface RegisterResponse {
    Message: string
}

interface SecretRequest {
    secretId: string
    secretKey: string
    description: string
}

interface SecretResponse {
    Message: string
}
