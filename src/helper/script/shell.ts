import { NaApi } from "@/api"
import { ScriptPayload } from "@/api/native/typings"
import { codeTrim } from "@/helper/format"

// 安装 TDP-Worker

export const installWorker: ScriptPayload = {
    Name: "安装 TDP-Worker",
    Username: "root",
    Description: "",
    Content: codeTrim(`
        export TDP_REMOTE_URL="${NaApi.workhub.getRegisterURL()}"
        wget -qO- https://apps.rehiy.com/tdp-cloud/worker-linux | sh -
    `),
    CommandType: "SHELL",
    WorkDirectory: "/root",
    Timeout: 300,
}

// 导出所有脚本

export default [installWorker]
