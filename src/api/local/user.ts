import { HttpClient } from "../basic/http"

export class UserModel extends HttpClient {
    public login(rq: LoginRequest): Promise<LoginResponse> {
        return this.post("/user/login", rq)
    }

    public register(rq: RegisterRequest): Promise<RegisterResponse> {
        return this.post("/user/register", rq)
    }

    public detail(): Promise<UserInfoResponse> {
        return this.get("/user/info")
    }

    public updateInfo(rq: UpdateInfoRequest): Promise<UpdateInfoResponse> {
        return this.patch("/user/info", rq)
    }

    public updatePassword(rq: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
        return this.patch("/user/password", rq)
    }
}

export interface LoginRequest {
    Username: string
    Password: string
}

export interface LoginRequest {
    Username: string
    Password: string
}

export interface LoginResponse {
    KeyId: number
    AppToken: string
    Username: string
    Description: string
    SessionToken: string
}

export interface RegisterRequest {
    Username: string
    Password: string
}

export interface RegisterResponse {
    Message: string
}

export interface UserInfoResponse {
    Id: number
    Username: string
    AppToken: string
    Description: string
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
