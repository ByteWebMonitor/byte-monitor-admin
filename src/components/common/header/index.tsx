import React, { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Dropdown, Layout, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Breadcrumb from '@/components/common/breadcrumb'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import style from './Header.module.less'

interface Props extends ReduxProps {}

const Header: FC<Props> = ({
  storeData: { theme, userInfo },
  setStoreData
}) => {
  const history = useHistory()
  const { userName = '-' } = userInfo
  const firstWord = userName.slice(0, 1)
  const [collapsed, setCollapsed] = useState(false)
  const logout = async () => {
    await setStoreData('SET_USERINFO', {})
    history.replace({ pathname: '/login' })
  }

  const changeTheme = (themes: string) => {
    setStoreData('SET_THEME', themes)
  }

  const menu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  const changeMenu = (
    <Menu>
      <Menu.Item onClick={() => changeTheme('')}>
        <span>暗黑主题</span>
      </Menu.Item>
      <Menu.Item onClick={() => changeTheme('default')}>
        <span>亮白主题</span>
      </Menu.Item>
    </Menu>
  )

  const toggle = (): void => {
    setCollapsed(!collapsed)
    setStoreData('SET_COLLAPSED', !collapsed)
  }

  // 更换主题
  useEffect(() => {
    if (theme === 'default') {
      const script = document.createElement('script')
      script.id = 'themeJs'
      script.src = '/less.min.js'
      document.body.appendChild(script)

      setTimeout(() => {
        const themeStyle = document.getElementById('less:color')
        if (themeStyle) localStorage.setItem('themeStyle', themeStyle.innerText)
      }, 500)
    } else {
      const themeJs = document.getElementById('themeJs')
      const themeStyle = document.getElementById('less:color')
      if (themeJs) themeJs.remove()
      if (themeStyle) themeStyle.remove()
      localStorage.removeItem('themeStyle')
    }
  }, [theme])

  return (
    <Layout.Header className={style.header}>
      <div className={style.toggleMenu} onClick={toggle}>
        {collapsed ? (
          <MenuUnfoldOutlined className={style.trigger} />
        ) : (
          <MenuFoldOutlined className={style.trigger} />
        )}
      </div>
      <Breadcrumb />
      <Dropdown className={`fr ${style.content}`} overlay={menu}>
        <span className={style.user}>
          <span className="avart">{firstWord}</span>
          <span>{userName}</span>
        </span>
      </Dropdown>
      <Dropdown overlay={changeMenu}>
        <div className="fr webTheme" />
      </Dropdown>
    </Layout.Header>
  )
}
export default connect(
  (state) => state,
  actions
)(Header)
