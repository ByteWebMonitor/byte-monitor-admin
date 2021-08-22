import $axios from '@/utils/axios'

export default {
  // 获取数据
  getList(params?: object): Promise<CommonObjectType<string>> {
    return $axios.get('https://randomuser.me/api', params)
  },
  getBrowser(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/statXMinRecentPvBrowserRatio', body)
  },
  getOs(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/statXMinRecentPvOsRatio', body)
  },
  getDays(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/statXDayPerDayPv', body)
  },
  getHours(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/statXHourPerHourPv', body)
  },

}
