import React from 'react'
import './index.less'
import { Table } from 'antd'

const New: React.FC = React.memo(() => {
  const columns = [
    {
      title: 'user_id',
      dataIndex: 'user_id',
      key: 'ueser_id',
    },
    {
      title: '_id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'deviceType',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: 'user_id',
      dataIndex: 'user_id',
      key: 'ueser_id',
    },
    {
      title: 'user_id',
      dataIndex: 'user_id',
      key: 'ueser_id',
    },

  ]

  const data = [
    {
      '_id': '611f4f659d3067316a9e8c5f',
      'deviceType': 'PC',
      'OS': 'Linux',
      'OSVersion': '',
      'screenHeight': 1200,
      'screenWidth': 1920,
      'language': 'en',
      'netWork': '4g',
      'orientation': '横屏',
      'browser': 'Chrome',
      'browserInfo': 'Chrome（版本: 92.0.4515.131&nbsp;&nbsp;内核: Blink）',
      'user_id': 'xT8nX8ZiNX',
      'time': '2021-08-20T06:35:46.187Z',
      'app_id': '114514114514abc',
      'ip': '::ffff:127.0.0.1',
      'createdAt': '2021-08-20T06:44:53.095Z',
      'updatedAt': '2021-08-20T06:44:53.095Z'
    },
    {
      '_id': '611f4d659d3067316a9e8c5d',
      'deviceType': 'PC',
      'OS': 'Linux',
      'OSVersion': '',
      'screenHeight': 1200,
      'screenWidth': 1920,
      'language': 'en',
      'netWork': '4g',
      'orientation': '横屏',
      'browser': 'Chrome',
      'browserInfo': 'Chrome（版本: 92.0.4515.131&nbsp;&nbsp;内核: Blink）',
      'user_id': 'ryiRQZMnyM',
      'time': '2021-08-20T06:36:19.679Z',
      'app_id': '114514114514abc',
      'ip': '::ffff:127.0.0.1',
      'createdAt': '2021-08-20T06:36:21.700Z',
      'updatedAt': '2021-08-20T06:36:21.700Z'
    }
  ]
  return (
    <>
      <Table columns={columns} dataSource={data}/>
    </>
  )
})

export default New
