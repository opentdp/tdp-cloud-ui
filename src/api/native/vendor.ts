import { HttpClient } from '@/api/basic/http';

export class VendorModel extends HttpClient {
    public list(rq: { Provider?: string }): Promise<VendorPaged> {
        return this.post('/vendor/list', rq);
    }

    public detail(id: number): Promise<VendorDetail> {
        return this.post('/vendor/detail', { Id: id });
    }

    public create(rq: VendorOrig): Promise<{ Id: number }> {
        return this.post('/vendor/create', rq);
    }

    public update(rq: Partial<VendorItem>): Promise<null> {
        return this.post('/vendor/update', rq);
    }

    public remove(id: number): Promise<null> {
        return this.post('/vendor/delete', { Id: id });
    }
}

export const ProviderList: Record<string, string> = {
    'cloudflare': 'Cloudflare',
    'tencent': '腾讯云',
};

export interface VendorOrig {
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
}

export interface VendorItem extends VendorOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface VendorDetail {
    Item: VendorItem
}

export interface VendorPaged {
    Items: VendorItem[]
}
