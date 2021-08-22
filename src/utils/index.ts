import './axios'
import './echarts-dark-theme'

// 四舍五入保留2位小数（不够位数，则用0替补）
export function toPercent(num){
  return Number(num*100).toFixed(2)+'%'
}
