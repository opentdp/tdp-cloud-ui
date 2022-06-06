import { ElMessage } from 'element-plus';

export class HttpClient {
    protected async get(url: string) {
        const body = await fetch('/api' + url, {
            method: 'GET',
            headers: this.buildHeader(),
        });
        return this.parseResponse(body);
    }

    protected async post(url: string, input: Record<string | number, any>) {
        const body = await fetch('/api' + url, {
            method: 'POST',
            headers: this.buildHeader('json'),
            body: JSON.stringify(input),
        });
        return this.parseResponse(body);
    }

    protected async delete(url: string) {
        const body = await fetch('/api' + url, {
            method: 'DELETE',
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
}
