import { HttpClient } from "@/api/basic/http"

export class SocketModel extends HttpClient {
    public getWorkerURL() {
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.appid + "/worker"
        return origin + wsurl
    }

    public getWebsshURL(rq: SSHRequest) {
        const origin = location.origin.replace(/^http/, "ws")
        const wsurl = "/wsi/" + this.session.token + "/ssh?"
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
