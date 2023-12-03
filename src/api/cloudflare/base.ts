import { HttpClient, HttpRequest } from '@/api/basic/http';

export class CloudflareClient extends HttpClient {
    static VendorId = '';

    protected bus(query: CloudflareRequest, expiry = 0) {
        const req: HttpRequest = {
            method: 'POST',
            url: '/cloudflare/' + CloudflareClient.VendorId,
            query: query
        };

        if (expiry > 0) {
            return this.rcache(req, expiry);
        }

        return this.request(req);
    }

}

export function CloudflareVendor(id: number | string) {
    CloudflareClient.VendorId = id + '';
}

export interface CloudflareRequest {
    Method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    Path: string
    Query?: unknown
    Payload?: unknown
}
