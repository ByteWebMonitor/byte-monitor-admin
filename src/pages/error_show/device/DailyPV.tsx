import MyEcharts from '@/components/common/myEcharts'
import React, { useEffect, useState } from 'react'
import { Card, InputNumber, Select, Space } from 'antd'
import api from '@/api'
import dayjs from 'dayjs'
import './DailyPV.less'

interface DailyPVProps {
  appId?: String
}

const DailyPV: React.FC<DailyPVProps> = React.memo((props: DailyPVProps) => {
  const appId = props.appId
  const [selectType, setSelectType] = useState('hour')
  const [hourOrDay, setHourOrDay] = useState(24)
  const [xAxisData, setXAxisData] = useState([])
  const [series, setSeries] = useState([])
  const getOption = () => {
    return {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis'
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
        type: 'line',
        symbolSize: 12
      }]
    }
  }
  const getHourPV = () => {
    api.getHours({
      'app_id': appId,
      'xHour': hourOrDay
    }).then(res => {
      let temp1 = []
      let temp2 = []
      for (let i = 0; i < res.data['list'].length; i++) {
        temp1.push(res.data['list'][i]['num'])
        temp2.push(dayjs(res.data['list'][i]['date']).format('M-D H:m'))
      }
      setXAxisData(temp2)
      setSeries(temp1)
    }).catch(e => {console.log(e)})
  }
  const getDayPV = () => {
    api.getDays({
      'app_id': appId,
      'xDay': hourOrDay
    }).then(res => {
      let temp1 = []
      let temp2 = []
      for (let i = 0; i < res.data['list'].length; i++) {
        temp1.push(res.data['list'][i]['num'])
        temp2.push(dayjs(res.data['list'][i]['date']).format('M-D'))
      }
      setXAxisData(temp2)
      setSeries(temp1)
    }).catch(e => {console.log(e)})
  }
  const changeInput = (value) => {
    setHourOrDay(value)
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
    // eslint-disable-next-line
  }, [selectType,hourOrDay])
  return (
    <div className={'dailyPV-wrapper'}>
      <Card>
        <Space>
          <span>最近</span>
          <InputNumber value={hourOrDay} min={1} max={48} style={{ width: '60px' }} size={'small'}
                       onChange={(value) => changeInput(value)}/>
          <Select defaultValue="hour" style={{ width: 80 }} size={'small'}
                  onChange={handleSelectChange}>
            <Select.Option value="hour">小时</Select.Option>
            <Select.Option value="day">天</Select.Option>
          </Select>
          <span>PV量</span>
        </Space>
        <MyEcharts option={getOption()}
                   style={{ width: '100%', height: '400px' }}/>
      </Card>
    </div>
  )
})

export default DailyPV

