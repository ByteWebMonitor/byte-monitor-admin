import MyEcharts from '@/components/common/myEcharts'
import React, { useEffect, useState } from 'react'
import { Card, InputNumber, Select } from 'antd'
import api from '@/api'
import dayjs from 'dayjs'
import './DailyPV.less'

interface Props extends ReduxProps {}

const DailyPV: React.FC<Props> = React.memo(() => {
  const [selectType, setSelectType] = useState('hour')
  const [hourOrDay, setHourOrDay] = useState(12)
  const [xAxisData, setXAxisData] = useState([])
  const [series, setSeries] = useState([])
  const getOption = () => {
    return {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: series,
        type: 'line'
      }]
    }
  }
  const getHourPV = () => {
    api.getHours({
      'app_id': '114514114514abc',
      'xHour': hourOrDay
    }).then(res => {
      let temp1 = []
      let temp2 = []
      for (let i = 0; i < res.data['list'].length; i++) {
        temp1.push(res.data['list'][i]['num'])
        temp2.push(dayjs(res.data['list'][i]['date']).format('MM-DD hh:mm:ss'))
      }
      setXAxisData(temp2)
      setSeries(temp1)
    }).catch(e => {console.log(e)})
  }
  const getDayPV = () => {
    api.getDays({
      'app_id': '114514114514abc',
      'xDay': hourOrDay
    }).then(res => {
      let temp1 = []
      let temp2 = []
      for (let i = 0; i < res.data['list'].length; i++) {
        temp1.push(res.data['list'][i]['num'])
        temp2.push(dayjs(res.data['list'][i]['date']).format('MM-DD'))
      }
      setXAxisData(temp2)
      setSeries(temp1)
    }).catch(e => {console.log(e)})
  }
  const changeInput = (value) => {
    setHourOrDay(value)
    if (selectType === 'hour') {
      getHourPV()
    } else if (selectType === 'day') {
      getDayPV()
    }
  }

  const handleSelectChange = (value) => {
    setSelectType(value)
  }
  useEffect(() => {
    if (selectType === 'hour') {
      getHourPV()
    } else if (selectType === 'day') {
      getDayPV()
    }
  }, [selectType])
  return (
    <div className={'dailyPV-wrapper'}>
      <Card>
        <span>最近</span>
        <InputNumber value={hourOrDay} max={72} style={{ width: '60px' }} size={'small'}
                     onChange={(value) => changeInput(value)}/>
        <Select defaultValue="hour" style={{ width: 80 }} size={'small'}
                onChange={handleSelectChange}>
          <Select.Option value="hour">小时</Select.Option>
          <Select.Option value="day">天</Select.Option>
        </Select>
        <span>PV量</span>
        <MyEcharts option={getOption()}
                   style={{ width: '100%', height: '400px' }}/>
      </Card>
    </div>
  )
})

export default DailyPV

