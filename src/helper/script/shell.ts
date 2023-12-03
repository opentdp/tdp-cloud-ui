import { NaApi } from '@/api';
import { ScriptPayload } from '@/api/native/typings';
import { codeTrim } from '@/helper/format';

// 安装 TDP-Worker

export const installWorker: ScriptPayload = {
    Name: '安装 TDP-Worker',
    Username: 'root',
    Description: '',
    Content: codeTrim(`
        export TDP_SERVICE=install
        export TDP_REMOTE_URL="${NaApi.workhub.getRegisterURL()}"
        wget -qO- https://get.opentdp.org/cloud/service-worker.sh | sh -
    `),
    CommandType: 'SHELL',
    WorkDirectory: '/root',
    Timeout: 300,
};

// 导出所有脚本

export default [installWorker];
