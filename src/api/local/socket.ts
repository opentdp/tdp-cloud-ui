import { HttpClient } from "../basic/http"

export class SocketModel extends HttpClient {
    public getWebsshURL(query: SSHRequest) {
        if (this.session.token) {
            const token = this.session.token
            const keyid = this.session.keyid || 0
            query.Auth = keyid + ":" + token
        }

        const param = this.buildQuery(query)
        const wsurl = "/wsi/ssh?" + param
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
