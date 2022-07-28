import { HttpClient } from "../basic/http"

export class TerminalClient extends HttpClient {
    public getWebsshWsurl(query: SSHRequest) {
        if (this.session.token) {
            const token = this.session.token
            const keyid = this.session.keyid || 0
            query.auth = keyid + ":" + token
        }

        const param = this.buildQuery(query)
        const wsurl = "/wsl/terminal/ssh?" + param
        const origin = location.origin.replace(/^http/, "ws")

        return origin + wsurl
    }
}

export interface SSHRequest {
    auth?: string
    addr: string
    user: string
    password?: string
    publicKey?: string
}
