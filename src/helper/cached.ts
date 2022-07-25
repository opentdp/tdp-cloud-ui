/**
 * 缓存中间层
 */

export class Cached {
    protected prefix: string
    protected driver: Storage

    constructor(n: string, s?: Storage) {
        this.prefix = 'tdp/' + n + '/'
        this.driver = s || sessionStorage
    }

    // 获取数据
    public get(key: any) {
        const skey = this.hashkey(key)
        let data: any = this.driver.getItem(skey)
        if (!data || !/^\{.+\}$/.test(data)) {
            return data
        }
        // 尝试反序列化
        try {
            data = JSON.parse(data)
        } catch (e) {
            return null
        }
        // 验证数据有效期
        if (0 < data.expiry && data.expiry < Date.now()) {
            this.driver.removeItem(skey)
            return null
        }
        return data.value
    }

    // 存储数据
    public set(key: any, value: any, expiry = 0) {
        if (value === null) {
            return this.remove(key)
        }
        // 数据序列化
        expiry > 0 && (expiry = Date.now() + expiry * 1000)
        value = JSON.stringify({ key, value, expiry })
        // 存储到后端
        const skey = this.hashkey(key)
        try {
            this.driver.setItem(skey, value)
        } catch (e) {
            this.clear() // 防止容量超限
            this.driver.setItem(skey, value)
        }
    }

    // 删除缓存
    public remove(key: any) {
        const skey = this.hashkey(key)
        this.driver.removeItem(skey)
    }

    // 清理数据
    public clear(all?: boolean) {
        for (const skey in this.driver) {
            if (!skey || skey.indexOf(this.prefix)) {
                continue
            }
            if (all === true) {
                this.driver.removeItem(skey)
            } else {
                this.get(skey.replace(this.prefix, ''))
            }
        }
    }

    // 转换键名
    private hashkey(key: any): string {
        // 字符串作为key
        if (typeof key !== 'object') {
            return this.prefix + key
        }
        // 将对象作为key
        let hash = 0
        key = JSON.stringify(key) || 'null'
        for (let i = 0, l = key.length; i < l; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i)
            hash |= 0
        }
        return this.prefix + 'hash-' + (hash >>> 0)
    }

}
