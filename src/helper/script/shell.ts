import { Api } from "@/api"
import { TaskScriptOrig } from "@/api/local/task_script"

function trim(s: string) {
    return s.replace(/\n {8}/g, "\n").trim()
}

export const installTDPWorker: TaskScriptOrig = {
    Name: "安装 TDP Worker",
    Username: "root",
    Description: "",
    Content: trim(`
        TDP_EXEC_ARGS="--remote ${Api.socket.getWorkerURL()}"
        wget -qO- http://tdp.icu/worker-linux | sh -
    `),
    CommandType: "shell",
    WorkDirectory: "/root",
    Timeout: 300
}
