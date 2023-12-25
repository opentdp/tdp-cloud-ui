import { HttpClient } from '@/api/basic/http';

export class UpgradeModel extends HttpClient {
    public check(): Promise<VersionInfo> {
        return this.post('/upgrade/check', {});
    }

    public apply() {
        return this.post('/upgrade/apply', {});
    }
}

export interface VersionInfo {
    Type: string // 更新方式
    Error: string // 错误信息
    Message: string // 提示信息
    Release: string // 更新说明
    Version: string // 最新版本
    Package: string // 下载地址
}
