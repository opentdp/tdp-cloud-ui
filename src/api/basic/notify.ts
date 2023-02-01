import { ElMessage } from "element-plus"

const Message: Record<string, string> = {
    UKN: "未知错误",
    EOF: "参数错误",
}

export function okMessage(data: string | { Message: string }) {
    let msg = (typeof data != "string" ? data.Message : data) || "UKN"
    msg = Message[msg] || msg
    ElMessage({
        type: 'success',
        grouping: true,
        message: msg,
    })
    return msg
}

export function errMessage(data: string | { Message: string }) {
    let msg = (typeof data != "string" ? data.Message : data) || "UKN"
    msg = Message[msg] || msg
    ElMessage({
        type: 'error',
        grouping: true,
        message: msg,
    })
    return msg
}
