import { HttpClient } from "../basic/http"

export class SSHKeyModel extends HttpClient {
    public list(): Promise<SSHKeyItem[]> {
        return this.get("/sshkey")
    }

    public create(rq: SSHKeyRequest): Promise<SSHKeyResponse> {
        return this.post("/sshkey", rq)
    }

    public update(rq: SSHKeyItem): Promise<SSHKeyResponse> {
        return this.patch("/sshkey/" + rq.Id, rq)
    }

    public remove(id: number): Promise<SSHKeyResponse> {
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

export interface SSHKeyResponse {
    Message: string
}
