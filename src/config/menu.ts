import { HomeOutlined,AppstoreAddOutlined } from '@ant-design/icons'

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
    icon: AppstoreAddOutlined,
    routes: []
  },
  {
    path: '/error_show',
    name: '错误',
    key: 'error',
    type: 'subMenu',
    routes: [
      {
        path: '/error_show/img3',
        name: '错误日记',
        key: 'error:errorDaily',
      }
    ]
  }
]

export default menus
