import { ElMessage } from "element-plus"

import { Cached } from "@/helper/cached"
import sessionStore from "@/store/session"

import { Message } from "./mesg"

let cached: Cached
let session: ReturnType<typeof sessionStore>

export class HttpClient {
    protected get cached() {
        return cached || (cached = new Cached('http'))
    }

    protected get session() {
        return session || (session = sessionStore())
    }

    protected async get(url: string, query?: unknown, expiry = 0) {
        if (expiry > 0) {
            const cres = this.cached.get({ url, query })
            if (cres) {
                return cres
            }
        }
        // 请求远程接口
        if (query) {
            url += "?" + this.buildQuery(query)
        }
        const body = await fetch("/api" + url, {
            method: "GET",
            headers: this.buildHeader(),
        })
        const res = await this.parseResponse(body)
        // 写入本地缓存
        this.cached.set({ url, query }, res, expiry)
        return res
    }

    protected async post(url: string, query: unknown, expiry = 0) {
        if (expiry > 0) {
            const cres = this.cached.get({ url, query })
            if (cres) {
                return cres
            }
        }
        // 请求远程接口
        const body = await fetch("/api" + url, {
            method: "POST",
            headers: this.buildHeader("json"),
            body: JSON.stringify(query || {}),
        })
        const res = await this.parseResponse(body)
        this.cached.set({ url, query }, res, expiry)
        return res
    }

    protected async patch(url: string, query: unknown) {
        const body = await fetch("/api" + url, {
            method: "PATCH",
            headers: this.buildHeader("json"),
            body: JSON.stringify(query || {}),
        })
        return this.parseResponse(body)
    }

    protected async delete(url: string, query?: unknown) {
        if (query) {
            url += "?" + this.buildQuery(query)
        }
        const body = await fetch("/api" + url, {
            method: "DELETE",
            headers: this.buildHeader(),
        })
        return this.parseResponse(body)
    }

    protected async parseResponse(body: Response) {
        const data = await body.json()
        // 捕获错误信息
        if (data.Error) {
            const err = data.Error.Message || data.Error || "UKN"
            ElMessage.error(Message[err] || err)
            throw new Error(err)
        }
        // 处理正确结果
        if (data.Payload) {
            if (data.Payload.Message) {
                ElMessage.success(data.Payload.Message)
            }
            return data.Payload
        }
        return data
    }

    protected buildHeader(type?: string) {
        const headers: HeadersInit = {
            Accept: "application/json",
        }
        if (type === "json") {
            headers["Content-Type"] = "application/json"
        }
        if (this.session.token) {
            const token = this.session.token
            const keyid = this.session.keyid || 0
            headers.Authorization = keyid + ":" + token
        }
        return headers
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
