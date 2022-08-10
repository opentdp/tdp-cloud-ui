import { HttpClient } from "../basic/http"

export class AgentModel extends HttpClient {
    public getNodes(): Promise<{ Ip: string }[]> {
        return this.get("/agent/node")
    }
    public runCommand(query: ShellRequest): Promise<[]> {
        return this.post("/agent/command", query)
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
