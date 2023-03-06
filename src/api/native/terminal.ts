import { HttpClient } from "@/api/basic/http"

export class TerminalModel extends HttpClient {
    public getWebsshURL(rq: SSHRequest, id = 0) {
        if (rq.PrivateKey && /^\d+$/.test(rq.PrivateKey)) {
            id = +rq.PrivateKey
            delete rq.PrivateKey
        }
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.Token + "/terminal/ssh/" + id
        return origin + wsurl + "?" + this.buildQuery(rq)
    }
}

export interface SSHRequest {
    Addr: string
    User: string
    Password?: string
    PrivateKey?: string
}
