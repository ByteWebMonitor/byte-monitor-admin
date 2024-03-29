import React, { useEffect, useState } from 'react'
import './index.less'
import 'echarts/map/js/china'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import { Button, Form, Input, Modal, notification, Space, Table } from 'antd'
import api from '@/api'
import dayjs from 'dayjs'
import { useHistory } from 'react-router-dom'

interface Props extends ReduxProps {}

const App: React.FC<Props> = React.memo(({
                                           storeData: { userInfo = {} }
                                         }) => {
  const initFormData = {
    'admin_name': userInfo.userName,
    'app_id': '',
    'app_name': '',
    'app_desc': ''
  }
  let history = useHistory();
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState(initFormData)
  const [form] = Form.useForm()
  const columns = [
    {
      title: 'app_id',
      dataIndex: 'app_id',
      key: 'app_id',
      align: 'center'
    },
    {
      title: '管理员',
      dataIndex: 'admin_name',
      align: 'center'
    },
    {
      title: 'app名称',
      dataIndex: 'app_name',
      key: 'app_name',
      align: 'center'
    },
    {
      title: 'app描述',
      dataIndex: 'app_desc',
      key: 'app_desc',
      align: 'center',
      width: '100px'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (date) => {
        return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      render: (date) => {
        return dayjs(date).format('YYYY-MM-DD hh:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (record) => (
        <Space>
          <Button onClick={()=>onClickDetail(record)} size={'small'}>详情</Button>
          <Button onClick={()=>onClickErrorLog(record)} size={'small'}>错误日志</Button>
          <Button onClick={()=>onClickDeviceList(record)} size={'small'}>设备统计</Button>
          <Button onClick={()=>onClickPerformanceList(record)} size={'small'}>性能统计</Button>
        </Space>
      ),
    }
  ]

  const getAllApp = () => {
    setLoading(true)
    api.getAllApp({ admin_name: 'admin' }).then(res => {
        if (res.status === 200) {
          setTableData(res.data.map(item => {
            return {
              ...item,
              key: item._id
            }
          }))
        }
        setLoading(false)
      }
    ).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    getAllApp()
  }, [])

  const addApp = () => {
    setVisible(true)
  }
  const handleCancel = () => {
    setFormData(initFormData)
    form.resetFields()
    setVisible(false)
  }
  const onChangeAppId = (e) => {
    setFormData({ ...formData, app_id: e.target.value })
  }
  const onChangeAppName = (e) => {
    setFormData({ ...formData, app_name: e.target.value })
  }
  const onChangeAppDesc = (e) => {
    setFormData({ ...formData, app_desc: e.target.value })
  }

  const onClickSubmit = () => {
    form.validateFields().then(validateRes => {
      api.addApp(formData).then(res => {
        if (res.data.code === 20000) {
          notification.success({ message: '添加成功！' })
          handleCancel()
          getAllApp()
        } else if (res.data.code === 20001) {
          notification.error({ message: 'app_id已存在！' })
        }
      }).catch(err => {
        console.error(err)
      })
    }).catch(err => {
    })
  }
  const onClickDetail = (record) => {
    history.push(`/detail?app_id=${record.app_id}`)
  }
  const onClickErrorLog=(record)=>{
    history.push(`/errorLog?app_id=${record.app_id}`)
  }
  const onClickDeviceList=(record)=>{
    history.push(`/deviceList?app_id=${record.app_id}`)
  }
  const onClickPerformanceList=(record)=>{
    history.push(`/performanceList?app_id=${record.app_id}`)
  }
  return (
    <div className={'app-wrapper'}>
      <div className={'button-group'}>
        <Button type="primary" onClick={addApp}>添加</Button>
      </div>

      <Table
        // @ts-ignore
        columns={columns} dataSource={tableData} bordered loading={loading}
      />

      <Modal title="添加App" visible={visible} footer={null} onCancel={handleCancel} maskClosable={false}>
        <Form
          labelCol={{ span: 5 }}
          initialValues={initFormData}
          form={form}
        >
          <Form.Item
            label="管理员"
            name="admin_name"
            rules={[{ required: true, message: '不能为空！', validateTrigger: 'blur' }]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            label="appId"
            name="app_id"
            rules={[{ required: true, message: '不能为空！', validateTrigger: 'blur' }]}
          >
            <Input allowClear onChange={onChangeAppId}/>
          </Form.Item>
          <Form.Item
            label="app名称"
            name="app_name"
            rules={[{ required: true, message: '不能为空！' }]}
          >
            <Input allowClear onChange={onChangeAppName}/>
          </Form.Item>
          <Form.Item label="app描述" name="app_desc">
            <Input allowClear onChange={onChangeAppDesc}/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={onClickSubmit}>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})

export default connect(
  (state) => state,
  actions
)(App)
