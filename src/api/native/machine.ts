import { HttpClient } from '@/api/basic/http';
9;
import { SummaryStat } from './typings';

export class MachineModel extends HttpClient {
    public list(): Promise<MachinePaged> {
        return this.post('/machine/list', {});
    }

    public detail(id: number): Promise<MachineDetail> {
        return this.post('/machine/detail', { Id: id });
    }

    public create(rq: MachineOrig): Promise<{ Id: number }> {
        return this.post('/machine/create', rq);
    }

    public update(rq: Partial<MachineItem>): Promise<null> {
        return this.post('/machine/update', rq);
    }

    public remove(id: number): Promise<null> {
        return this.post('/machine/delete', { Id: id });
    }
}

export const MachineModels: Record<string, string> = {
    'native/worker': '独立节点',
    'tencent/cvm': '腾讯云:CVM',
    'tencent/lighthouse': '腾讯云:LH',
    'alibaba/ecs': '阿里云:ECS',
    'alibaba/swas': '阿里云:SWAS',
};

export interface MachineOrig {
    VendorId: number
    HostName: string
    IpAddress: string
    OSType: string
    Region: string
    Model: keyof (typeof MachineModels)
    CloudId: string
    CloudMeta: unknown
    WorkerId: string
    WorkerMeta?: SummaryStat
    Status: string
    Description: string
}

export interface MachineItem extends MachineOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface MachineDetail {
    Item: MachineItem
}

export interface MachinePaged {
    Items: MachineItem[]
}
