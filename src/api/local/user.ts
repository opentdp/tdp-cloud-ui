import { HttpClient } from "../basic/http"

export class UserClient extends HttpClient {
  public login(data: LoginRequest): Promise<LoginResponse> {
    return this.post("/local/user/login", data)
  }

  public register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.post("/local/user/register", data)
  }

  public createSecret(data: SecretRequest): Promise<SecretResponse> {
    return this.post("/local/user/secret", data)
  }

  public deleteSecret(id: number): Promise<SecretResponse> {
    return this.delete("/local/user/secret/" + id)
  }

  public fetchSecrets(): Promise<SecretItem[]> {
    return this.get("/local/user/secret")
  }
}

export interface SecretItem {
  Id: number
  UserId: number
  SecretId: string
  SecretKey: string
  Description: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string
}

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  keyId: number
  token: string
}

interface RegisterRequest {
  username: string
  password: string
}

interface RegisterResponse {
  Result: string
}

interface SecretRequest {
  secretId: string
  secretKey: string
  description: string
}

interface SecretResponse {
  Result: string
}
