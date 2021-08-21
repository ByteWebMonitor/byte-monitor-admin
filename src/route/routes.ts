import Home from '@/pages/home'
import ErrorPage from '@/pages/public/errorPage'

import UserList from '@/pages/user/list'
import UserEdit from '@/pages/user/edit'

import RoleList from '@/pages/role/list'

import Map from '@/pages/map'

import Error_log from '@/pages/error_show/error_log'

import Img1 from '@/pages/error_show/device/shuzhuangtu'
import Img2 from '@/pages/error_show/device/bingzhuangtu'
import Test from '@/pages/error_show/error_msg'


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
    path: '/user',
    name: '用户管理',
    key: 'user',
    routes: [
      {
        path: '/user/list',
        name: '用户列表',
        exact: true,
        key: 'user:list:view',
        component: UserList
      },
      {
        path: '/user/list/add',
        name: '新增用户',
        exact: true,
        key: 'user:list:add',
        component: UserEdit
      },
      {
        path: '/user/list/edit',
        name: '编辑用户',
        exact: true,
        key: 'user:list:edit',
        component: UserEdit
      }
    ]
  },
  {
    path: '/role',
    name: '角色管理',
    key: 'role',
    routes: [
      {
        path: '/role/list',
        name: '角色列表',
        exact: true,
        key: 'role:list:view',
        component: RoleList
      }
    ]
  },
  {
    path: '/map',
    name: '地图',
    key: 'map',
    component: Map
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
        key:'error:img_show',
        component:Img1
      },
      {
        path:'/error_show/img2',
        name:'操作系统与浏览器占比',
        exact: true,
        key:'error:img_show1',
        component:Img2
      },
      {
        path:'/error_show/img3',
        name:'错误日记',
        exact: true,
        key:'error:img_show2',
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
