import { HttpClient } from "../basic/http"

export class SSHKeyModel extends HttpClient {
    public list(): Promise<SSHKeyItem[]> {
        return this.get("/sshkey")
    }

    public create(data: SSHKeyRequest): Promise<SSHKeyResponse> {
        return this.post("/sshkey", data)
    }

    public update(data: SSHKeyItem): Promise<SSHKeyResponse> {
        return this.patch("/secret/" + data.Id, data)
    }

    public remove(id: number): Promise<SSHKeyResponse> {
        return this.delete("/sshkey/" + id)
    }
}

export interface SSHKeyRequest {
    PublicKey: string
    PrivateKey: string
    Description: string
}

export interface SSHKeyResponse {
    Message: string
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
