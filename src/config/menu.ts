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
]

export default menus
