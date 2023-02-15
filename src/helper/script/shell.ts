import { NaApi } from "@/api"
import { ScriptPayload } from "@/api/native/typings"

function trim(s: string) {
    return s.replace(/\n {8}/g, "\n").trim()
}

// 安装 TDP-Worker

export const installWorker: ScriptPayload = {
    Name: "安装 TDP-Worker",
    Username: "root",
    Description: "",
    Content: trim(`
        export TDP_REMOTE_URL="${NaApi.workhub.getRegisterURL()}"
        wget -qO- https://apps.rehiy.com/tdp-cloud/worker-linux | sh -
    `),
    CommandType: "SHELL",
    WorkDirectory: "/root",
    Timeout: 300,
}

// 导出所有脚本

export default [installWorker]
