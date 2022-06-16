/**
 * 工具仓库
 */

export function bytesToSize(a: number, d = 2) {
  if (0 == a) return "0 Bytes"
  const c = 1024
  const e = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
  const f = Math.floor(Math.log(a) / Math.log(c))
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

export function dateFormat(t: string, fmt: string) {
  const d = new Date(t)
  const o = {
    "M+": d.getMonth() + 1,
    "d+": d.getDate(),
    "h+": d.getHours(),
    "m+": d.getMinutes(),
    "s+": d.getSeconds(),
    "q+": Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (d.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      )
    }
  }
  return fmt
}
