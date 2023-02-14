import { HttpClient } from "@/api/basic/http"

export class PassportModel extends HttpClient {
    public login(rq: UserRequest): Promise<LoginResponse> {
        return this.post("/passport/login", rq)
    }

    public register(rq: UserRequest): Promise<{ Id: number }> {
        return this.post("/passport/register", rq)
    }

    public detail(): Promise<UserInfoResponse> {
        return this.get("/passport/info")
    }

    public updateInfo(rq: UpdateInfoRequest): Promise<null> {
        return this.patch("/passport/info", rq)
    }

    public updatePassword(rq: UpdatePasswordRequest): Promise<null> {
        return this.patch("/passport/password", rq)
    }

    public summary(): Promise<UserSummary> {
        return this.get("/passport/summary")
    }
}

export interface UserRequest {
    Username: string
    Password: string
}

export interface LoginResponse {
    AppId: string
    Username: string
    Description: string
    Token: string
}

export interface UserInfoResponse {
    Id: number
    AppId: string
    Username: string
    Description: string
}

export interface UpdateInfoRequest {
    Description: string
}

export interface UpdatePasswordRequest {
    OldPassword: string
    NewPassword: string
}

export interface UserSummary {
    Domain: number
    Keypair: number
    Machine: number
    Script: number
    Vendor: number
}