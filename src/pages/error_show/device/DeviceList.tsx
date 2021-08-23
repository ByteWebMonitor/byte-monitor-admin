import React, { useEffect, useState } from 'react'
import './DeviceList.less'
import { Table, Descriptions } from 'antd'
import api from '@/api'
import { url2Map } from '@/utils'
import { useLocation } from 'react-router-dom'

interface DeviceListProps {
  appId?: String
}

const DeviceList: React.FC<DeviceListProps> = (props: DeviceListProps) => {
  const params = url2Map(useLocation().search)
  const appIdFromUrl = params?.get('app_id')
  const limit = 10
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState([])

  const columns = [
    {
      title: 'appId',
      dataIndex: 'app_id',
      key: 'app_id',
      align: 'center'
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      align: 'center'
    },
    {
      title: '操作系统',
      dataIndex: 'OS',
      key: 'OS',
      align: 'center'
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
      align: 'center'
    },
    {
      title: '用户id',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center'
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center'
    },
  ]

  const onChangePageNumber = (currentPageNumber) => {
    setSkip(currentPageNumber - 1)
  }

  useEffect(() => {
    const getDeviceList = () => {
      api.getDeviceList({ app_id: appIdFromUrl, skip, limit }).then(res => {
        if (res.data.code === 20000) {
          setTotal(res.data.total)
          setData(res.data.ItemList.map(item => {
            return {
              ...item,
              key: item._id
            }
          }))
        }
        setLoading(false)
      })
    }
    getDeviceList()
    // eslint-disable-next-line
  }, [skip])

  const help = (str) => {
    const index = str.indexOf('&nbsp;')
    if (index !== -1) {
      return str.slice(0, index) + ',' + str.slice(index + 12)
    }
    return str
  }
  const expandedRowRender = (record) => {
    return (
      <Descriptions column={6}>
        <Descriptions.Item label="记录id" span={2}>{record._id}</Descriptions.Item>
        <Descriptions.Item label="浏览器信息" span={4}>{help(record.browserInfo)}</Descriptions.Item>
        <Descriptions.Item label="屏幕朝向" span={2}>{record.orientation}</Descriptions.Item>
        <Descriptions.Item label="语言" span={4}>{record.language}</Descriptions.Item>
        <Descriptions.Item label="屏幕高度" span={2}>{record.screenHeight}</Descriptions.Item>
        <Descriptions.Item label="屏幕宽度" span={2}>{record.screenWidth}</Descriptions.Item>
      </Descriptions>
    )
  }

  return (
    <div className={'errorLog-wrapper'}>
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={data}
        loading={loading}
        expandedRowRender={expandedRowRender}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          total: total,
          showTotal: (total) => `共 ${total} 条`,
          defaultCurrent: 1,
          onChange: onChangePageNumber,
          showSizeChanger: false
        }}
      />
    </div>
  )
}

export default DeviceList
