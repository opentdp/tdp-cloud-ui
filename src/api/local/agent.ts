import { HttpClient } from "../basic/http"

export class AgentModel extends HttpClient {
    public fetch(): Promise<{ Ip: string }[]> {
        return this.get("/agent/node")
    }
}
