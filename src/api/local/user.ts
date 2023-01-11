import { HttpClient, HttpMessage } from "../basic/http"

export class UserModel extends HttpClient {
    public login(rq: LoginRequest): Promise<LoginResponse> {
        return this.post("/user/login", rq)
    }

    public register(rq: RegisterRequest): Promise<HttpMessage> {
        return this.post("/user/register", rq)
    }

    public detail(): Promise<UserInfoResponse> {
        return this.get("/user/info")
    }

    public updateInfo(rq: UpdateInfoRequest): Promise<HttpMessage> {
        return this.patch("/user/info", rq)
    }

    public updatePassword(rq: UpdatePasswordRequest): Promise<HttpMessage> {
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
    AppToken: string
    Username: string
    Description: string
    SessionToken: string
}

export interface RegisterRequest {
    Username: string
    Password: string
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

export interface UpdatePasswordRequest {
    OldPassword: string
    NewPassword: string
}
