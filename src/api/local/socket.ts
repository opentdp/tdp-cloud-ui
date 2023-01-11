import { HttpClient } from "../basic/http"

export class SocketModel extends HttpClient {
    public getWorkerURL() {
        const token = this.session.appToken

        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + token + "/worker"

        return origin + wsurl
    }

    public getWebsshURL(rq: SSHRequest) {
        const token = this.session.token

        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + token + "/ssh?"
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
