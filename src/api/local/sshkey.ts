import { HttpClient, HttpMessage } from "@/api/basic/http"

export class SSHKeyModel extends HttpClient {
    public list(): Promise<SSHKeyItem[]> {
        return this.get("/sshkey")
    }

    public create(rq: SSHKeyOrig): Promise<HttpMessage> {
        return this.post("/sshkey", rq)
    }

    public update(rq: SSHKeyItem): Promise<HttpMessage> {
        return this.patch("/sshkey/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/sshkey/" + id)
    }
}

export interface SSHKeyOrig {
    PublicKey: string
    PrivateKey: string
    Description: string
}

export interface SSHKeyItem extends SSHKeyOrig {
    Id: number
    UserId?: number
    CreatedAt?: string
    UpdatedAt?: string
}
