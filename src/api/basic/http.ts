import { ElMessage } from "element-plus"

import sessionStore from "@/store/session"

export class HttpClient {
  private _session: ReturnType<typeof sessionStore>

  protected get session() {
    return this._session || (this._session = sessionStore())
  }

  protected async get(url: string, query?: unknown) {
    if (query) {
      url += "?" + this.buildQuery(query)
    }
    const body = await fetch("/api" + url, {
      method: "GET",
      headers: this.buildHeader(),
    })
    return this.parseResponse(body)
  }

  protected async post(url: string, query: unknown) {
    const body = await fetch("/api" + url, {
      method: "POST",
      headers: this.buildHeader("json"),
      body: JSON.stringify(query),
    })
    return this.parseResponse(body)
  }

  protected async patch(url: string, query: unknown) {
    const body = await fetch("/api" + url, {
      method: "PATCH",
      headers: this.buildHeader("json"),
      body: JSON.stringify(query),
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

    if (data.Error) {
      const msg = data.Error.Message || "未知错误"
      ElMessage.error(msg)
      throw new Error(msg)
    }

    if (data.Payload) {
      return data.Payload
    }
  }

  protected buildHeader(type = "") {
    const headers: HeadersInit = {}

    const keyid = this.session.keyid || 0
    const token = this.session.token || ""

    if (token) {
      headers.Authorization = keyid + ":" + token
    }

    if (type === "json") {
      headers["Content-Type"] = "application/json"
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
        for (const i in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, i)) {
            const k = key ? key + "[" + i + "]" : i
            result.push(this.buildQuery(obj[i], k))
          }
        }
        break
    }

    return result.join("&")
  }
}
