import { HttpClient } from "@/api/basic/http"

export class TerminalModel extends HttpClient {
    public getWebsshURL(rq: SSHRequest) {
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.token + "/terminal/ssh?"
        const query = this.buildQuery(rq)
        return origin + wsurl + query
    }
}

export interface SSHRequest {
    Addr: string
    User: string
    Password?: string
    PrivateKey?: string
}
