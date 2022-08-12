import { HttpClient } from "../basic/http"

export class UserModel extends HttpClient {
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
    Username: string
    Password: string
}

export interface LoginResponse {
    KeyId: number
    Token: string
    Username: string
    Description: string
}

export interface RegisterRequest {
    Username: string
    Password: string
}

export interface RegisterResponse {
    Message: string
}

export interface UpdateInfoRequest {
    Description: string
}

export interface UpdateInfoResponse {
    Message: string
}

export interface UpdatePasswordRequest {
    OldPassword: string
    NewPassword: string
}

export interface UpdatePasswordResponse {
    Message: string
}
