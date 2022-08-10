import { HttpClient } from "../basic/http"

export class AgentModel extends HttpClient {
    public fetch(): Promise<{ Ip: string }[]> {
        return this.get("/agent/node")
    }
    public shell(query: ShellRequest): Promise<[]> {
        return this.post("/agent/shell", query)
    }
}

export interface ShellRequest {
    Addr: string
    Payload: {
        Content: string
        Username: string
        CommandType: string
        WorkingDirectory: string
        Timeout: number
    }
}
