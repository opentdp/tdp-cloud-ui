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

    protected async rcache(req: HttpRequest & { expiry: number }) {
        let res = this.cached.get(req)
        if (!res) {
            res = await this.request(req)
            this.cached.set(req, res, req.expiry)
        }
        return res
    }

    protected async request(req: HttpRequest) {
        // 构造请求头
        const headers: HeadersInit = {
            Accept: "application/json",
        }
        if (req.header) {
            Object.assign(headers, req.header)
        }
        if (this.session.token) {
            headers.Authorization = this.session.token
        }
        // 构造请求参数
        const request: RequestInit = {
            method: req.method,
            headers
        }
        if (req.query) {
            if (/GET|DELETE/.test(req.method)) {
                req.url += "?" + this.buildQuery(req.query)
            }
            else if (/PATCH|POST/.test(req.method)) {
                request.body = JSON.stringify(req.query)
                headers["Content-Type"] = "application/json"
            }
        }
        // 发起请求并返回结构数据
        return this.newFetch(req.url, request)
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

export interface HttpRequest {
    url: string
    header?: HeadersInit
    method: "GET" | "DELETE" | "POST" | "PATCH"
    query?: unknown
}

export interface HttpMessage {
    Message: string
}
