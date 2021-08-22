import './axios'
import './echarts-dark-theme'

// 四舍五入保留2位小数（不够位数，则用0替补）
export function toPercent(num) {
  return Number(num * 100).toFixed(2) + '%'
}

export function url2Map(url) {
  if (url.indexOf('?') === -1) {
    return
  }
  const array = url.split('?')[1].split('&')
  const map = new Map()
  array.forEach(item => {
    const temp = item.split('=')
    map.set(temp[0], temp[1])
  })
  return map
}
