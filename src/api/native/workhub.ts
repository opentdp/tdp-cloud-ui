import { HttpClient } from '@/api/basic/http';

import { GoMemoryStat, SummaryStat, DetailStat, FilerRequest, FilerResponse, ScriptPayload } from './typings';

export class WorkhubModel extends HttpClient {

    public getRegisterURL() {
        const origin = location.origin.replace(/^http/, 'ws');
        const wsurl = '/wsi/' + this.session.AppId + '/workhub';
        return origin + wsurl;
    }

    public list(): Promise<WorkerPaged> {
        return this.post('/workhub/list', {});
    }

    public detail(id: string): Promise<NodeDetail> {
        id = id == 'host' ? '/workhub' : '/worker/' + id;
        return this.post(id + '/detail', {});
    }

    public exec(id: string, rq: ScriptPayload): Promise<{ Id: number }> {
        id = id == 'host' ? '/workhub' : '/worker/' + id;
        rq = { ...rq, Name: 'Exec: ' + rq.Name };
        return this.post(id + '/exec', rq);
    }

    public filer(id: string, rq: FilerRequest): Promise<FilerResponse> {
        id = id == 'host' ? '/workhub' : '/worker/' + id;
        rq.Path = rq.Path.replace(/\\+/g, '/').replace(/\/+/g, '/');
        return this.post(id + '/filer', rq);
    }
}

export interface NodeDetail {
    Stat: DetailStat
    MemStat: GoMemoryStat
    NumGoroutine: number
}

export interface WorkerOrig {
    WorkerId: string
    WorkerMeta: SummaryStat
    WorkerVersion: string
}

export interface WorkerItem extends WorkerOrig {
    Id: number
    UserId: number
    MachineId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface WorkerDetail {
    Item: WorkerItem
}

export interface WorkerPaged {
    Items: WorkerItem[]
}
