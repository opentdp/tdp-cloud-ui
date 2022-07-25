import { HttpClient } from "../basic/http"

export class MemberClient extends HttpClient {
    public clear() {
        this.cached.clear(true)
    }

    public login(data: LoginRequest): Promise<LoginResponse> {
        return this.post("/local/member/login", data)
    }

    public register(data: RegisterRequest): Promise<RegisterResponse> {
        return this.post("/local/member/register", data)
    }

    public updateInfo(data: UpdateInfoRequest): Promise<UpdateInfoResponse> {
        return this.patch("/local/member/info", data)
    }

    public updatePassword(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
        return this.patch("/local/member/password", data)
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
}

export interface LoginRequest {
    username: string
    password: string
}

export interface LoginResponse {
    keyid: number
    token: string
    username: string
    description: string
}

export interface RegisterRequest {
    username: string
    password: string
}

export interface RegisterResponse {
    Message: string
}

export interface UpdateInfoRequest {
    description: string
}

export interface UpdateInfoResponse {
    Message: string
}

export interface UpdatePasswordRequest {
    oldPassword: string
    newPassword: string
}

export interface UpdatePasswordResponse {
    Message: string
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
