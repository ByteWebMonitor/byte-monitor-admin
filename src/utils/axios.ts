import Axios from 'axios'
import { store } from '@/store'

interface AxiosConfig {
  timeout: number;
  headers: {
    'Content-Type': string
  };
}

const config: AxiosConfig = {
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axios = Axios.create(config)

// const router: CommonObjectType = new HashRouter({})

// token失效，清除用户信息并返回登录界面
// const clearAll = () => {
//   store.dispatch({
//     type: 'SET_USERINFO',
//     payload: {}
//   })
//   router.history.replace({ pathname: '/login' })
// }

// 请求前拦截
axios.interceptors.request.use(
  (req) => {
    const { token = '' } = store.getState().storeData.userInfo || {}
    req.headers.token = token
    return req
  },
  (err) => {
    if (err.message.includes('timeout')) {
      return Promise.reject(err) // reject这个错误信息
    }
    return Promise.reject(err)
  }
)

// 返回后拦截
axios.interceptors.response.use(
  (res): Promise<any> => {
    return Promise.resolve(res)
  },
  (err) => {
    return Promise.reject(err)
  }
)

axios.defaults.validateStatus = (status: number) => {
  // http状态码，2或者3开头的都是成功
  return /^([23])\d{2}$/.test(status.toString())
}

export default axios
