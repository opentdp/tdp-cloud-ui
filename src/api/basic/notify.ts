import { ElMessage } from "element-plus"

const Message: Record<string, string> = {
    UKN: "未知错误",
    EOF: "参数错误",
}

export function okNotify(msg: string) {
    msg = Message[msg] || msg
    ElMessage.success(msg)
    return msg
}

export function errNotify(data: string | { Message: string }) {
    let msg: string
    if (typeof data !== "string") {
        msg = data.Message || "UKN"
    } else {
        msg = data || "UKN"
    }
    msg = Message[msg] || msg
    ElMessage.error(msg)
    return msg
}
