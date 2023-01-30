import { LoApi } from "@/api"
import { TaskScriptItem } from "@/api/local/task_script"

function trim(s: string) {
    return s.replace(/\n {8}/g, "\n").trim()
}

export const installTDPWorker: TaskScriptItem = {
    Id: 0,
    Name: "安装 TDP Worker",
    Username: "root",
    Description: "",
    Content: trim(`
        TDP_EXEC_ARGS="--remote ${LoApi.workhub.getRegisterURL()}"
        wget -qO- https://apps.rehiy.com/tdp-cloud/worker-linux | sh -
    `),
    CommandType: "shell",
    WorkDirectory: "/root",
    Timeout: 300
}

// 导出所有脚本

export default [installTDPWorker]
