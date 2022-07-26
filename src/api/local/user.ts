import { HttpClient } from "../basic/http"

export class UserClient extends HttpClient {
    public clear() {
        this.cached.clear(true)
    }

    public login(data: LoginRequest): Promise<LoginResponse> {
        return this.post("/user/login", data)
    }

    public register(data: RegisterRequest): Promise<RegisterResponse> {
        return this.post("/user/register", data)
    }

    public updateInfo(data: UpdateInfoRequest): Promise<UpdateInfoResponse> {
        return this.patch("/user/info", data)
    }

    public updatePassword(data: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
        return this.patch("/user/password", data)
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
