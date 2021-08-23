import React, { useEffect, useState } from 'react'
import './PerformanceList.less'
import { Table, Descriptions } from 'antd'
import api from '@/api'
import { url2Map } from '@/utils'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

interface PerformanceListProps {
  appId?: String
}

const PerformanceList: React.FC<PerformanceListProps> = (props: PerformanceListProps) => {
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
      title: '地址',
      dataIndex: 'url',
      key: 'url',
      align: 'center'
    },
    {
      title: '等待初始响应时间',
      dataIndex: 'ttfbTime',
      key: 'ttfbTime',
      align: 'center'
    },
    {
      title: '加载页面时间',
      dataIndex: 'loadPageTime',
      key: 'loadPageTime',
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
      align: 'center',
      render: (value) => {return dayjs(value).format('YYYY-M-D H:mm:ss')}
    },
  ]

  const onChangePageNumber = (currentPageNumber) => {
    setSkip(currentPageNumber - 1)
  }

  useEffect(() => {
    const getPerformanceList = () => {
      api.getPerformanceList({ app_id: appIdFromUrl, skip, limit }).then(res => {
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
    getPerformanceList()
    // eslint-disable-next-line
  }, [skip])

  const expandedRowRender = (record) => {
    return (
      <div>
        <Descriptions column={8}>
          <Descriptions.Item label="记录id" span={2}>{record._id}</Descriptions.Item>
          <Descriptions.Item label="重定向时间" span={2}>{record.redirectTime}</Descriptions.Item>
          <Descriptions.Item label="DNS查找时间" span={2}>{record.dnsTime}</Descriptions.Item>
          <Descriptions.Item label="请求时间" span={2}>{record.reqTime}</Descriptions.Item>
        </Descriptions>
      </div>
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

export default PerformanceList
