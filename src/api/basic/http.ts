export class HttpClient {
    protected async get(url: string) {
        const body = await fetch('/api' + url, {
            method: 'GET',
            headers: this.buildHeader(),
        });
        const data = await body.json();
        if (data.Payload) {
            return data.Payload;
        }
    }

    protected async post(url: string, input: Record<string | number, any>) {
        const body = await fetch('/api' + url, {
            method: 'POST',
            headers: this.buildHeader('json'),
            body: JSON.stringify(input),
        });
        const data = await body.json();
        if (data.Payload) {
            return data.Payload;
        }
    }

    protected async delete(url: string) {
        const body = await fetch('/api' + url, {
            method: 'DELETE',
        });
        const data = await body.json();
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
