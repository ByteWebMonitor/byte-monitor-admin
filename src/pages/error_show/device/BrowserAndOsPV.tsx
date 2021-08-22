import MyEcharts from '@/components/common/myEcharts'
import React, { useEffect, useState } from 'react'
import { Card, Radio, Table } from 'antd'
import api from '@/api'
import './BrowserAndOsPV.less'
import { toPercent } from '@/utils'

const BrowserAndOsPV: React.FC = React.memo(() => {
  const radioValueMap = {
    a: 30, b: 720, c: 1440, d: 10080
  }
  const subtext = ['5分钟以内', '30分钟以内', '一小时以内', '一天以内']
  const initBrowserData = [{ 'value': 0, 'name': 'Chrome', proportion: '0%' }]
  const initOsData = [{ 'value': 0, 'name': 'Windows', proportion: '0%' }]

  const [time, setTime] = useState(60)
  const [browserData, setBrowserData] = useState(initBrowserData)
  const [osData, setOsData] = useState(initOsData)

  const getBrowserOption = () => {
    return {
      title: {
        text: '浏览器的使用占比',
        subtext: subtext[time],
        left: 'center'
      },
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
          radius: '50%',
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
      title: {
        text: '操作系统的使用占比',
        subtext: subtext[time],
        left: 'center'
      },
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
          radius: '50%',
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
      'app_id': '114514114514abc',
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
      'app_id': '114514114514abc',
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
        <Card className={'browserAndOsPV-card'}>
          <div className={'browserAndOsPV-echarts-table'}>
            <div className={'browserAndOsPV-echarts'}>
              <MyEcharts
                option={getBrowserOption()}
                style={{ width: '100%', height: '300px' }}
              />
            </div>
            <div className={'browserAndOsPV-table'}>
              <Table
                // @ts-ignore
                columns={browserColumns} dataSource={browserData} size={'small'} pagination={false}/>
            </div>
          </div>
        </Card>
        <Card className={'browserAndOsPV-card'}>
          <div className={'browserAndOsPV-echarts-table'}>

            <div className={'browserAndOsPV-echarts'}>
              <MyEcharts
                option={getOsOption()}
                style={{ width: '100%', height: '300px' }}
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

