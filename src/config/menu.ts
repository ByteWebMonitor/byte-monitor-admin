import { HomeOutlined, UserOutlined, AuditOutlined } from '@ant-design/icons'

const menus = [
  {
    path: '/',
    name: '首页',
    key: 'home',
    icon: HomeOutlined,
    routes: []
  },
  {
    path: '/user',
    name: '用户管理',
    key: 'user',
    type: 'subMenu',
    icon: UserOutlined,
    iconfont: 'icon-xiaoshouzongjian',
    routes: [
      {
        path: '/user/list',
        name: '用户列表',
        key: 'user:list:view'
      }
    ]
  },
  {
    path: '/role',
    name: '角色管理',
    key: 'role',
    type: 'subMenu',
    icon: AuditOutlined,
    routes: [
      {
        path: '/role/list',
        name: '角色列表',
        key: 'role:list:view'
      }
    ]
  },
  {
    path: '/map',
    name: '地图',
    key: 'map',
    icon: HomeOutlined,
    routes: []
  },
  {
    path: '/error_show',
    name: '错误',
    key: 'error',
    type: 'subMenu',
    routes: [
      {
        path:'/error_show/img',
        name:'可视化1',
        key:'error:img_show',
      },
      {
        path:'/error_show/img2',
        name:'可视化2',
        key:'error:img_show1',
      },
      {
        path:'/error_show/img3',
        name:'可视化3',
        key:'error:img_show',
      }
    ]
  }
]

export default menus
