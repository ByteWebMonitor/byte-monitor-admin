import Home from '@/pages/home'
import App from '@/pages/app'
import ErrorPage from '@/pages/public/errorPage'
import Error_log from '@/pages/error_show/error_log'
import DailyPV from '@/pages/error_show/device/DailyPV.tsx'
import BrowserAndOsPV from '@/pages/error_show/device/BrowserAndOsPV.tsx'

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
    path: '/error_show',
    name: '错误信息展示',
    key: 'error',
    routes:[
      {
        path:'/error_show/img',
        name:'一段时间内的访问量',
        exact: true,
        key:'error:visit',
        component:DailyPV
      },
      {
        path:'/error_show/img2',
        name:'操作系统与浏览器占比',
        exact: true,
        key:'error:os',
        component:BrowserAndOsPV
      },
      {
        path:'/error_show/img3',
        name:'错误日记',
        exact: true,
        key:'error:errorDaily',
        component:Error_log
      },
    ]
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
