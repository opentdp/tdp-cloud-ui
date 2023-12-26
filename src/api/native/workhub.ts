import { HttpClient } from '@/api/basic/http';

import { GoMemoryStat, SummaryStat, DetailStat, FilerRequest, FileInfo, ScriptPayload } from './typings';

export class WorkhubModel extends HttpClient {
    public list(): Promise<WorkerPaged> {
        return this.post('/workhub/list', {});
    }

    public detail(id: string): Promise<NodeDetail> {
        id = id && id != 'host' ? '/' + id : '';
        return this.post('/workhub/detail' + id, {});
    }

    public exec(id: string, rq: ScriptPayload): Promise<{ Id: number }> {
        id = id && id != 'host' ? '/' + id : '';
        rq = { ...rq, Name: 'Exec: ' + rq.Name };
        return this.post('/workhub/exec' + id, rq);
    }

    public filer(id: string, rq: FilerRequest): Promise<FileInfo[]> {
        id = id && id != 'host' ? '/' + id : '';
        rq.Path = rq.Path.replace(/\\+/g, '/').replace(/\/+/g, '/');
        return this.post('/workhub/filer' + id, rq);
    }

    public getRegisterURL() {
        const origin = location.origin.replace(/^http/, 'ws');
        const wsurl = '/wsi/' + this.session.AppId + '/workhub';
        return origin + wsurl;
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
