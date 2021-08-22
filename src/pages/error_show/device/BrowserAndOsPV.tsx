import MyEcharts from '@/components/common/myEcharts'
import React, { useEffect, useState } from 'react'
import { Card, Radio, Table } from 'antd'
import api from '@/api'
import './BrowserAndOsPV.less'
import { toPercent } from '@/utils'

interface BrowserAndOsPVProps {
  appId?: String
}

const BrowserAndOsPV: React.FC<BrowserAndOsPVProps> = React.memo((props: BrowserAndOsPVProps) => {
  const radioValueMap = {
    a: 30, b: 720, c: 1440, d: 10080
  }
  const initBrowserData = [{ 'value': 0, 'name': 'Chrome', proportion: '0%' }]
  const initOsData = [{ 'value': 0, 'name': 'Windows', proportion: '0%' }]
  const appId = props.appId

  const [time, setTime] = useState(60)
  const [browserData, setBrowserData] = useState(initBrowserData)
  const [osData, setOsData] = useState(initOsData)

  const getBrowserOption = () => {
    return {
      color: ['#f9637a', '#73c0de', '#ea7ccc', '#26a5fb', '#76dec0', '#fac858'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        bottom: 'bottom',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          data: browserData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  const getOsOption = () => {
    return {
      color: ['#26a5fb', '#76dec0', '#fac858', '#f9637a', '#73c0de', '#26cbcb', '#ea7ccc'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        bottom: 'bottom',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['40%', '70%'],
          data: osData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
  const getBrowser = (time) => {
    api.getBrowser({
      'app_id': appId,
      'xMin': time
    }).then(res => {
      let temp = []
      let total = 0
      res.data.forEach(item => {
        total += item.num
      })
      for (let i = 0; i < res.data.length; i++) {
        temp.push({
          value: res.data[i]['num'],
          name: res.data[i]['browser'],
          key: res.data[i]['browser'],
          proportion: total ? toPercent(res.data[i]['num'] / total) : '0%'
        })
      }
      if (temp.length) {
        setBrowserData(temp)
      } else {
        setBrowserData(initBrowserData)
      }
    }).catch(e => {
      console.log(e)
    })
  }
  const getOs = (time) => {
    api.getOs({
      'app_id': appId,
      'xMin': time
    }).then(res => {
        let temp = []
        let total = 0
        res.data.forEach(item => {
          total += item.num
        })
        for (let i = 0; i < res.data.length; i++) {
          temp.push({
            value: res.data[i]['num'],
            name: res.data[i]['OS'],
            key: res.data[i]['os'],
            // @ts-ignore
            proportion: total ? toPercent(res.data[i]['num'] / total) : '0%'
          })
        }
        if (temp.length) {
          setOsData(temp)
        } else {
          setOsData(initOsData)
        }
      }
    ).catch(e => {console.log(e)})
  }
  const changeTime = (time) => {
    setTime(time)
    getBrowser(time)
    getOs(time)
  }
  const onChangeRadio = (e) => {
    const value = e.target.value
    changeTime(radioValueMap[value])
  }

  useEffect(() => {
    changeTime(time)
    // eslint-disable-next-line
  }, [])

  const browserColumns = [
    {
      title: '类型',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '数量',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      sorter: (a, b) => a - b
    },
    {
      title: '占比',
      dataIndex: 'proportion',
      key: 'proportion',
      align: 'center',
      sorter: (a, b) => parseFloat(a) - parseFloat(b)
    },
  ]
  const osColumns = [
    {
      title: '类型',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '数量',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      sorter: (a, b) => a.value - b.value
    },
    {
      title: '占比',
      dataIndex: 'proportion',
      key: 'proportion',
      align: 'center',
      sorter: (a, b) => parseFloat(a.proportion) - parseFloat(b.proportion)
    },
  ]

  return (
    <div className={'browserAndOsPV-wrapper'}>
      <div className={'browserAndOsPV-radio'}>
        <Radio.Group defaultValue="a" onChange={onChangeRadio} buttonStyle="solid">
          <Radio.Button value="a">一小时</Radio.Button>
          <Radio.Button value="b">一天</Radio.Button>
          <Radio.Button value="c">一周</Radio.Button>
          <Radio.Button value="d">一个月</Radio.Button>
        </Radio.Group>
      </div>
      <div className={'browserAndOsPV-card-wrapper'}>
        <Card className={'browserAndOsPV-card'} title={'浏览器使用占比'} >
          <div className={'browserAndOsPV-echarts-table'}>
            <div className={'browserAndOsPV-echarts'}>
              <MyEcharts
                option={getBrowserOption()}
                style={{ width: '100%', height: '200px' }}
              />
            </div>
            <div className={'browserAndOsPV-table'}>
              <Table
                // @ts-ignore
                columns={browserColumns} dataSource={browserData} size={'small'} pagination={false}/>
            </div>
          </div>
        </Card>
        <Card className={'browserAndOsPV-card'} title={'操作系统使用占比'}>
          <div className={'browserAndOsPV-echarts-table'}>

            <div className={'browserAndOsPV-echarts'}>
              <MyEcharts
                option={getOsOption()}
                style={{ width: '100%', height: '200px' }}
              />
            </div>
            <div className={'browserAndOsPV-table'}>
              <Table
                // @ts-ignore
                columns={osColumns} dataSource={osData} size={'small'} pagination={false}/>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
})

export default BrowserAndOsPV

