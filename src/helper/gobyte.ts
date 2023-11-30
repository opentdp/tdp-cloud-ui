/**
 * go byte array helper
 */

// 解析go的[]byte序列化值
export function decodeByteArray(data: string) {
    const rawString = atob(data)
    const byteArray = new Uint8Array(rawString.length)
    for (let i = 0; i < rawString.length; i++) {
        byteArray[i] = rawString.charCodeAt(i)
    }
    return byteArray
}

// 编码为go的[]byte序列化值
export function encodeByteArray(data: Uint8Array) {
    const byteArray = Array.prototype.slice.call(data)
    const rawString = String.fromCharCode.apply(null, byteArray)
    return btoa(rawString)
}

// 将Uint8Array转换为字符串
export function byteArrayToText(data: string) {
    const decoder = new TextDecoder('utf8')
    return decoder.decode(decodeByteArray(data))
}

// 将File转为go的[]byte序列化值
export function fileToByteArrayString(file: File, fn: (data: string) => void) {
    const reader = new FileReader()
    reader.onload = function () {
        const byteArray = new Uint8Array(reader.result as ArrayBuffer)
        const base64String = encodeByteArray(byteArray)
        fn && fn(base64String)
    }
    reader.readAsArrayBuffer(file)
}

// 将go的[]byte序列化值转为下载
export function byteArrayStringToFile(input: string, filename: string) {
    const data = decodeByteArray(input)
    const blob = new Blob([data], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    // 创建一个隐藏的a元素
    const a = document.createElement("a")
    document.body.appendChild(a)
    a.style.display = "none"
    a.download = filename
    a.href = url
    a.click()
    // 清理资源
    URL.revokeObjectURL(url)
    document.body.removeChild(a)
}
