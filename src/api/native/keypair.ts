import { HttpClient } from "@/api/basic/http"

export class KeypairModel extends HttpClient {
    public list(): Promise<KeypairPaged> {
        return this.get("/keypair")
    }

    public detail(name: string): Promise<KeypairItem> {
        return this.get("/keypair/" + name)
    }

    public create(rq: KeypairOrig): Promise<{ Id: number }> {
        return this.post("/keypair", rq)
    }

    public update(rq: Partial<KeypairItem>): Promise<null> {
        return this.patch("/keypair/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/keypair/" + id)
    }
}

export const KeypairTypeList: Record<string, string> = {
    "ssh": "SSH 登录密钥",
}

export interface KeypairOrig {
    PublicKey: string
    PrivateKey: string
    KeyType: string
    Description: string
}

export interface KeypairItem extends KeypairOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface KeypairPaged {
    Datasets: KeypairItem[]
    Datainfo?: unknown
}
