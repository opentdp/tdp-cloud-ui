import { HttpClient, HttpMessage } from "@/api/basic/http"

export class KeypairModel extends HttpClient {
    public list(): Promise<KeypairPaged> {
        return this.get("/keypair")
    }

    public create(rq: KeypairOrig): Promise<HttpMessage> {
        return this.post("/keypair", rq)
    }

    public update(rq: Partial<KeypairItem>): Promise<HttpMessage> {
        return this.patch("/keypair/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
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
    CreatedAt: string
    UpdatedAt: string
}

export interface KeypairPaged {
    Datasets: KeypairItem[]
    Datainfo?: unknown
}
