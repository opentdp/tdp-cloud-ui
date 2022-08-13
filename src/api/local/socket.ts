import { HttpClient } from "../basic/http"

export class SocketModel extends HttpClient {
    public getWebsshURL(rq: SSHRequest) {
        if (this.session.token) {
            const token = this.session.token
            const keyid = this.session.keyid || 0
            rq.Auth = keyid + ":" + token
        }

        const query = this.buildQuery(rq)
        const wsurl = "/wsi/ssh?" + query
        const origin = location.origin.replace(/^http/, "ws")

        return origin + wsurl
    }
}

export interface SSHRequest {
    Auth?: string
    Addr: string
    User: string
    Password?: string
    PrivateKey?: string
}
