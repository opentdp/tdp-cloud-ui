import { ElMessage } from 'element-plus';

export class HttpClient {
    protected async get(url: string, param?: Record<string | number, any>) {
        if (param) {
            url += '?' + this.buildQuery(param);
        }
        const body = await fetch('/api' + url, {
            method: 'GET',
            headers: this.buildHeader(),
        });
        return this.parseResponse(body);
    }

    protected async post(url: string, param: Record<string | number, any>) {
        const body = await fetch('/api' + url, {
            method: 'POST',
            headers: this.buildHeader('json'),
            body: JSON.stringify(param),
        });
        return this.parseResponse(body);
    }

    protected async delete(url: string, param?: Record<string | number, any>) {
        if (param) {
            url += '?' + this.buildQuery(param);
        }
        const body = await fetch('/api' + url, {
            method: 'DELETE',
            headers: this.buildHeader(),
        });
        return this.parseResponse(body);
    }

    protected async parseResponse(body: Response) {
        const data = await body.json();

        if (data.Error) {
            const msg = data.Error.message || '未知错误';
            ElMessage.error(msg);
            throw new Error(msg);
        }

        if (data.Payload) {
            return data.Payload;
        }
    }

    protected buildHeader(type = '') {
        const headers: HeadersInit = {};

        const token = localStorage.getItem('vt_token') || '';
        const keyid = localStorage.getItem('vt_keyid') || 0;

        if (token) {
            headers.Authorization = keyid + ':' + token;
        }

        if (type === 'json') {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }

    protected buildQuery(obj: any, key?: string) {
        if (!obj && !key) {
            return '';
        }

        if (obj == null) {
            return key + '=';
        }

        if (typeof obj !== 'object') {
            return key + '=' + encodeURIComponent(obj);
        }

        const result = [];
        for (const i in obj) {
            if (obj.hasOwnProperty(i)) {
                const k = key ? key + '[' + i + ']' : i;
                result.push(this.buildQuery(obj[i], k));
            }
        }
        return result.join('&');
    }
}
