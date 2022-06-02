export class HttpClient {
    protected async get(url: string) {
        const res = await fetch('/api' + url, {
            method: 'GET',
            headers: this.buildHeader(),
        });
        return await res.json();
    }

    protected async post(url: string, data: unknown) {
        const res = await fetch('/api' + url, {
            method: 'POST',
            headers: this.buildHeader('json'),
            body: JSON.stringify(data),
        });
        return await res.json();
    }

    protected buildHeader(type = '') {
        const headers = {
            secretId: localStorage.getItem('vt_username'),
            secretKey: localStorage.getItem('vt_password'),
        };

        if (type === 'json') {
            headers['Content-Type'] = 'application/json';
        }

        return headers;
    }
}
