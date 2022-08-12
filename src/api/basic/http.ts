import { Cached } from "@/helper/cached"
import sessionStore from "@/store/session"

import { errNotify, okNotify } from "./notify"

let cached: Cached
let session: ReturnType<typeof sessionStore>

export class HttpClient {
    protected api = "/api"

    protected get cached() {
        return cached || (cached = new Cached('http'))
    }

    protected get session() {
        return session || (session = sessionStore())
    }

    protected get(url: string, query?: unknown) {
        return this.request({ method: "GET", url, query })
    }

    protected delete(url: string, query?: unknown) {
        return this.request({ method: "DELETE", url, query })
    }

    protected post(url: string, query: unknown) {
        return this.request({ method: "POST", url, query })
    }

    protected patch(url: string, query: unknown) {
        return this.request({ method: "PATCH", url, query })
    }

    protected async rcache(hcp: HttpClientParams & { expiry: number }) {
        let res = this.cached.get(hcp)
        if (!res) {
            res = await this.request(hcp)
            this.cached.set(hcp, res, hcp.expiry)
        }
        return res
    }

    protected async request(hcp: HttpClientParams) {
        // 构造请求头
        const headers: HeadersInit = {
            Accept: "application/json",
        }
        if (hcp.header) {
            Object.assign(headers, hcp.header)
        }
        if (this.session.token) {
            const token = this.session.token
            const keyid = this.session.keyid || 0
            headers.Authorization = keyid + ":" + token
        }
        // 构造请求参数
        const request: RequestInit = {
            method: hcp.method,
            headers
        }
        if (hcp.query) {
            if (/GET|DELETE/.test(hcp.method)) {
                hcp.url += "?" + this.buildQuery(hcp.query)
            }
            else if (/PATCH|POST/.test(hcp.method)) {
                request.body = JSON.stringify(hcp.query)
                headers["Content-Type"] = "application/json"
            }
        }
        // 发起请求并返回结构数据
        return this.newFetch(hcp.url, request)
    }

    protected async newFetch(url: string, req: RequestInit) {
        const body = await fetch(this.api + url, req)
        const data = await body.json()
        // 捕获错误信息
        if (data.Error) {
            const err = errNotify(data.Error)
            if (/会话已失效|登录后重试/.test(err)) {
                session.$reset(), location.reload()
            }
            throw new Error(err)
        }
        // 处理正确结果
        if (data.Payload) {
            if (data.Payload.Message) {
                okNotify(data.Payload.Message)
            }
            return data.Payload
        }
        return data
    }

    protected buildQuery(obj: unknown, key?: string) {
        if (!obj && !key) {
            return ""
        }
        if (obj == null) {
            return key + "="
        }
        const result = []
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                result.push(key + "=" + encodeURIComponent(obj))
                break
            case "object":
                obj && Object.entries(obj).forEach(o => {
                    const [k, v] = o
                    const i = key ? key + "[" + k + "]" : k
                    result.push(this.buildQuery(v, i))
                })
                break
        }
        return result.join("&")
    }
}

export interface HttpClientParams {
    url: string
    header?: HeadersInit
    method: "GET" | "DELETE" | "POST" | "PATCH"
    query?: unknown
}
