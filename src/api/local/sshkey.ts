import { HttpClient, HttpMessage } from "../basic/http"

export class SSHKeyModel extends HttpClient {
    public list(): Promise<SSHKeyItem[]> {
        return this.get("/sshkey")
    }

    public create(rq: SSHKeyRequest): Promise<HttpMessage> {
        return this.post("/sshkey", rq)
    }

    public update(rq: SSHKeyItem): Promise<HttpMessage> {
        return this.patch("/sshkey/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/sshkey/" + id)
    }
}

export interface SSHKeyItem {
    Id: number
    UserId: number
    PublicKey: string
    PrivateKey: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}

export interface SSHKeyRequest {
    PublicKey: string
    PrivateKey: string
    Description: string
}
