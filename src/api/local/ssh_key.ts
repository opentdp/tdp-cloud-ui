import { HttpClient } from "../basic/http"

export class SSHKeyModel extends HttpClient {
    public create(data: SSHKeyRequest): Promise<SSHKeyResponse> {
        return this.post("/sshkey", data)
    }

    public remove(id: number): Promise<SSHKeyResponse> {
        return this.delete("/sshkey/" + id)
    }

    public fetch(): Promise<SSHKeyItem[]> {
        return this.get("/sshkey")
    }
}

export interface SSHKeyRequest {
    publicKey: string
    privateKey: string
    description: string
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
    DeletedAt: string
}
