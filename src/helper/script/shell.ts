import { NaApi } from "@/api"
import { ScriptItem } from "@/api/native/script"

function trim(s: string) {
    return s.replace(/\n {8}/g, "\n").trim()
}

export const installTDPWorker: ScriptItem = {
    Id: 0,
    UserId: 0,
    Name: "安装 TDP Worker",
    Username: "root",
    Description: "",
    Content: trim(`
        export TDP_BIN_ARGS="--remote ${NaApi.workhub.getRegisterURL()}"
        wget -qO- https://apps.rehiy.com/tdp-cloud/worker-linux | sh -
    `),
    CommandType: "shell",
    WorkDirectory: "/root",
    Timeout: 300,
    CreatedAt: 0,
    UpdatedAt: 0,
}

// 导出所有脚本

export default [installTDPWorker]
