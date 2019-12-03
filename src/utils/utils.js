export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    const str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function getDate() {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  if (date.getMonth() <= 9) {
    month = `0${date.getMonth() + 1}`
  }
  if (date.getDate() <= 9) {
    day = `0${date.getDate()}`
  }
  return `${year}-${month}-${day}`
}
