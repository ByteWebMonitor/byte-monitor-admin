import Home from '@/pages/home'
import App from '@/pages/app'
import ErrorPage from '@/pages/public/errorPage'
import Error_log from '@/pages/error_show/error_log'
import Detail from '@/pages/detail/Detail'

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
    path: '/error_show',
    name: '错误信息展示',
    key: 'error',
    routes:[
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
