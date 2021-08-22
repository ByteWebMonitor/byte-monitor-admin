import { HomeOutlined } from '@ant-design/icons'

const menus = [
  {
    path: '/',
    name: '首页',
    key: 'home',
    icon: HomeOutlined,
    routes: []
  },
  {
    path: '/app',
    name: 'app管理',
    key: 'app',
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
        path: '/error_show/img',
        name: '一段时间内的访问量',
        key: 'error:visit',
      },
      {
        path: '/error_show/img2',
        name: '操作系统与浏览器占比',
        key: 'error:os',
      },
      {
        path: '/error_show/img3',
        name: '错误日记',
        key: 'error:errorDaily',
      }
    ]
  }
]

export default menus
