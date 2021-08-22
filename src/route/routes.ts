import Home from '@/pages/home'
import App from '@/pages/app'
import ErrorPage from '@/pages/public/errorPage'
import ErrorLog from '@/pages/error_show/error_log'
import Detail from '@/pages/detail/Detail'
import DeviceList from '@/pages/error_show/device/DeviceList'

/**
 * path 跳转的路径
 * component 对应路径显示的组件
 * exact 匹配规则，true的时候则精确匹配。
 */
const menus = [
  {
    path: '/',
    name: '首页',
    exact: true,
    key: 'home',
    component: Home
  },
  {
    path: '/app',
    name: 'app管理',
    key: 'app',
    component: App
  },
  {
    path: '/detail',
    name: '详情',
    key: 'detail',
    component: Detail
  },
  {
    path: '/errorLog',
    name: '错误日志',
    key: 'errorLog',
    component: ErrorLog
  },
  {
    path: '/deviceList',
    name: '设备日志',
    key: 'deviceList',
    component: DeviceList
  },
  {
    path: '/403',
    name: '暂无权限',
    exact: true,
    key: '/403',
    component: ErrorPage
  }
]

export default menus
