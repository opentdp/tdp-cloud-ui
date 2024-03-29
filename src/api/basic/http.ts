import sessionStore from '@/store/session';

import { StorageMan } from './storage';
import { errMessage, okMessage } from './notify';

let storage: StorageMan;
let session: ReturnType<typeof sessionStore>;

export class HttpClient {
    protected api = '/api';

    protected get session() {
        return session || (session = sessionStore());
    }

    protected get storage() {
        return storage || (storage = new StorageMan('http'));
    }

    protected get(url: string, query?: unknown) {
        return this.request({ method: 'GET', url, query });
    }

    protected post(url: string, query: unknown) {
        return this.request({ method: 'POST', url, query });
    }

    protected async rcache(req: HttpRequest, expiry: number) {
        let res = this.storage.get(req);
        if (!res) {
            res = await this.request(req);
            this.storage.set(req, res, expiry);
        }
        return res;
    }

    protected async request(req: HttpRequest) {
        // 构造请求头
        const headers: HeadersInit = {
            Accept: 'application/json',
            Authorization: 'Bearer ' + this.session.Token,
            'Content-Type': 'application/json',
        };
        if (req.header) {
            Object.assign(headers, req.header);
        }
        // 构造请求参数
        const request: RequestInit = {
            body: JSON.stringify(req.query),
            method: req.method,
            headers,
        };
        // 返回结构数据
        this.session.Loading++;
        return this.newFetch(req.url, request).finally(() => {
            this.session.Loading--;
        });
    }

    protected async newFetch(url: string, req: RequestInit) {
        const resp = await fetch(this.api + url, req);
        const data = await resp.json();
        // 捕获HTTP错误
        if (resp.status != 200 && !data) {
            throw new Error('HTTP Error: ' + resp.status);
        }
        // 捕获错误信息
        if (data.Error) {
            const err = errMessage(data.Error);
            if (data.Error.Code == 401) {
                session.$reset(), location.reload();
            }
            throw new Error(err);
        }
        // 刷新登录令牌
        data.Token && this.session.updateToken(data.Token);
        // 显示提示消息
        data.Message && okMessage(data.Message);
        // 处理正确结果
        return data.Payload || data;
    }

    protected buildQuery(obj: unknown, key?: string) {
        if (!obj && !key) {
            return '';
        }
        if (obj == null) {
            return key + '=';
        }
        const result = [];
        switch (typeof obj) {
            case 'string':
            case 'number':
            case 'boolean':
                result.push(key + '=' + encodeURIComponent(obj));
                break;
            case 'object':
                obj && Object.entries(obj).forEach(o => {
                    const [k, v] = o;
                    const i = key ? key + '[' + k + ']' : k;
                    result.push(this.buildQuery(v, i));
                });
                break;
        }
        return result.join('&');
    }
}

export interface HttpRequest {
    method: 'GET' | 'DELETE' | 'POST' | 'PATCH'
    header?: HeadersInit
    url: string
    query?: unknown
}

export interface HttpMessage {
    Message: string
}

export type Callback = (d: string) => void
