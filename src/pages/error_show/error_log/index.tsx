import React, { useEffect, useState } from 'react'
import './index.less'
import { Table, Descriptions } from 'antd'
import api from '@/api'
import { url2Map } from '@/utils'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'

interface ErrorLogProps {
  appId?: String
}

const ErrorLog: React.FC<ErrorLogProps> = (props: ErrorLogProps) => {
  const params = url2Map(useLocation().search)
  const appIdFromUrl = params?.get('app_id')
  const limit = 10
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [data, setData] = useState([])

  const columns = [
    {
      title: '错误类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center'
    },
    {
      title: 'appId',
      dataIndex: 'app_id',
      key: 'app_id',
      align: 'center'
    },
    {
      title: '用户id',
      dataIndex: 'user_id',
      key: 'user_id',
      align: 'center'
    },
    {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center'
    },
    {
      title: '发生时间',
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
    const getErrorLog = () => {
      api.getErrorLog({ app_id: appIdFromUrl, skip, limit }).then(res => {
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
    getErrorLog()
    // eslint-disable-next-line
  }, [skip])
  const expandedRowRender = (record) => {
    return (
      <Descriptions column={6}>
        <Descriptions.Item label="记录id" span={2}>{record._id}</Descriptions.Item>
        <Descriptions.Item label="错误信息" span={4}>{record.error_info}</Descriptions.Item>
        <Descriptions.Item label="错误url" span={6}>{record.error_url}</Descriptions.Item>
        <Descriptions.Item label="行" span={2}>{record.error_row}</Descriptions.Item>
        <Descriptions.Item label="列" span={4}>{record.error_col}</Descriptions.Item>
        <Descriptions.Item label="备注" span={2}>{JSON.stringify(record.error_extra)}</Descriptions.Item>
        <Descriptions.Item label="hash" span={4}>{record.hash}</Descriptions.Item>
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

export default ErrorLog
