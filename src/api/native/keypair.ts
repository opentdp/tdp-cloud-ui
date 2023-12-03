import { HttpClient } from '@/api/basic/http';

export class KeypairModel extends HttpClient {
    public list(): Promise<KeypairPaged> {
        return this.post('/keypair/list', {});
    }

    public detail(name: string): Promise<KeypairDetail> {
        return this.post('/keypair/detail', { Name: name });
    }

    public create(rq: KeypairOrig): Promise<{ Id: number }> {
        return this.post('/keypair/create', rq);
    }

    public update(rq: Partial<KeypairItem>): Promise<null> {
        return this.post('/keypair/update', rq);
    }

    public remove(id: number): Promise<null> {
        return this.post('/keypair/delete', { Id: id });
    }

    public keygen(type: string): Promise<KeypairOrig> {
        return this.post('/keypair/keygen', { KeyType: type });
    }
}

export const KeypairTypeList: Record<string, string> = {
    'ssh': 'SSH 登录密钥',
};

export interface KeypairOrig {
    PublicKey: string
    PrivateKey: string
    KeyType: string
    Description: string
}

export interface KeypairItem extends KeypairOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface KeypairDetail {
    Item: KeypairItem
}

export interface KeypairPaged {
    Items: KeypairItem[]
}
