import { HttpClient } from "../basic/http"

export class SocketModel extends HttpClient {
    public getAgentURL() {
        const token = this.session.appToken
        const auth = "0:" + token

        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + auth + "/agent"

        return origin + wsurl
    }

    public getWebsshURL(rq: SSHRequest) {
        const token = this.session.token
        const keyid = this.session.keyid || 0
        const auth = keyid + ":" + token

        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + auth + "/ssh?"
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
