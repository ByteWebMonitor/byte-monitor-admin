import Home from '@/pages/home'
import App from '@/pages/app'

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
  }
]

export default menus
