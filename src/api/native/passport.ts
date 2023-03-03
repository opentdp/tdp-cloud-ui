import { HttpClient } from "@/api/basic/http"

export class PassportModel extends HttpClient {
    public login(rq: UserLogin): Promise<LoginResult> {
        return this.post("/passport/login", rq)
    }

    public register(rq: UserRegister): Promise<{ Id: number }> {
        return this.post("/passport/register", rq)
    }

    public detail(): Promise<UserItem> {
        return this.get("/passport/info")
    }

    public update(rq: UserUpdate): Promise<null> {
        return this.patch("/passport/info", rq)
    }

    public summary(): Promise<UserSummary> {
        return this.get("/passport/summary")
    }
}

export interface UserLogin {
    Username: string
    Password: string
}

export interface LoginResult {
    Username: string
    AppId: string
    Email: string
    Token: string
}

export interface UserRegister {
    Username: string
    Password: string
    Email: string
}

export interface UserItem {
    Id: number
    Username: string
    AppId: string
    Email: string
    Description: string
}

export interface UserUpdate {
    Username: string
    Password: string
    Password2: string
    Email: string
    Description: string
    OldPassword: string
}

export interface UserSummary {
    Domain: number
    Keypair: number
    Machine: number
    Script: number
    Vendor: number
}