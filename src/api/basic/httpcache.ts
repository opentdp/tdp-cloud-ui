
type MethodType = "GET" | "POST"

interface CacheItem {
    key: string
    content: string
    expires: string
}

export class HttpCache {

    private url: string
    private method: MethodType
    private param: unknown
    private version: string

    constructor(url: string, method: MethodType, param: unknown, version?: string) {
        this.url = url
        this.method = method
        this.param = param
        this.version = version ? version : ""
    }

    private CacheKey(): string {
        return `cache==${this.version}==${this.method}==${this.url}==${JSON.stringify(this.param)}`
    }

    public Get() {
        if (this.version == undefined) {
            this.version = ""
        }
        const key = this.CacheKey()
        const res_str = localStorage.getItem(key)
        if (res_str) {
            const cache_item: CacheItem = JSON.parse(res_str)
            if (Number(cache_item.expires) > Date.now()) {
                return JSON.parse(cache_item.content)
            }
        }
        return null
    }

    public Set(content: any) {
        if (this.version == undefined) {
            this.version = ""
        }
        const key = this.CacheKey()
        const cacheItem: CacheItem = {
            key: key,
            content: JSON.stringify(content),
            expires: String(Date.now() + 10 * 60 * 1000)
        }
        localStorage.setItem(key, JSON.stringify(cacheItem))
    }

    public static CleanCache() {
        //TODO 清理所有 localStorage 中所有 cache== 开头的项
    }

    public static UpdaCache() {
        //TODO 清理所有 localStorage 中所有过期的项目
    }
}

