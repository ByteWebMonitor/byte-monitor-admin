import $axios from '@/utils/axios'

export default {
  // 登录
  login(body: object) {
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/admin/login', body)
  },
  //获取所有app列表
  getAllApp(params){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/app/getAdminAppIdList',params)
  },
  // 添加app_id
  addApp(params){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/app/adminAddAppId',params)
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
  getErrorLog(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/error/getAllItemList', body)
  },
  getDeviceList(body:object){
    return $axios.post('https://qcgtsp.app.cloudendpoint.cn/api/device/getAllItemList', body)
  }
}
