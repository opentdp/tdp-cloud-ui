/**
 * go byte array helper
 */

// 将Base64字符串转换为Uint8Array
export function base64ToBuffer(data: string) {
    const binstr = atob(data);
    const bytes = new Uint8Array(binstr.length);
    for (let i = 0; i < binstr.length; i++) {
        bytes[i] = binstr.charCodeAt(i);
    }
    return bytes;
}

// 将Uint8Array转换为Base64字符串
export function bufferToBase64(data: Uint8Array) {
    const binstr = Array.prototype.map.call(data, ch => {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

// 将File转为go的[]byte序列化值
export function fileToBase64(file: File, fn: (data: string) => void) {
    const reader = new FileReader();
    reader.onload = () => {
        const bytes = new Uint8Array(reader.result as ArrayBuffer);
        fn && fn(bufferToBase64(bytes));
    };
    reader.readAsArrayBuffer(file);
}

// 将go的[]byte序列化值转为下载
export function base64ToDownload(input: string, filename: string) {
    const data = base64ToBuffer(input);
    const blob = new Blob([data], {
        type: 'application/octet-stream'
    });
    const url = URL.createObjectURL(blob);
    // 创建一个隐藏的a元素
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.download = filename;
    a.href = url;
    a.click();
    // 清理资源
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
