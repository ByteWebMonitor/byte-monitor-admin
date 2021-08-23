import MyEcharts from '@/components/common/myEcharts'
import React, { useEffect, useState } from 'react'
import { Card, Slider } from 'antd'
import api from '@/api'
import './PerformanceAvg.less'

interface PerformanceAvgProps {
  appId?: String
}

const PerformanceAvg: React.FC<PerformanceAvgProps> = React.memo((props: PerformanceAvgProps) => {
  const appId = props.appId
  const [time, setTime] = useState(1440)
  const [transparentData, setTransparentData] = useState([])
  const [redirectData, setRedirectData] = useState([])
  const [dnsData, setDnsData] = useState([])
  const [reqData, setReqTime] = useState([])
  const [ttfbData, setTtfbData] = useState([])
  const [loadPageData, setLoadPageData] = useState([])

  const getOption = () => {
    console.log(loadPageData)
    console.log(transparentData)
    return {
      title: {
        text: '页面加载瀑布图'
      },
      color: ['#f9637a', '#73c0de', '#ea7ccc', '#26a5fb', '#76dec0', '#fac858'],
      grid: {
        left: '10%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          let tar
          params.forEach(item => {
            if (item.value !== '-') {
              tar = item
            }
          })
          return tar.name + ':' + tar.value + 'ms'
        }
      },
      legend: {
        data: ['LoadPageTime', 'TTFBTime', 'RequestTime', 'DNSTime', 'RedirectTime']
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['LoadPageTime', 'TTFBTime', 'RequestTime', 'DNSTime', 'RedirectTime']
      },
      series: [
        {
          name: 'help',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: transparentData
        },
        {
          name: 'LoadPageTime',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'right'
          },
          data: loadPageData
        },
        {
          name: 'TTFBTime',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'right'
          },
          data: ttfbData
        },
        {
          name: 'RequestTime',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'right'
          },
          data: reqData
        },
        {
          name: 'DNSTime',
          type: 'bar',
          stack: '总量',
          label: {
            show: true,
            position: 'right'
          },
          data: dnsData
        },
        {
          name: 'RedirectTime',
          type: 'bar',
          barWidth: 16,
          stack: '总量',
          label: {
            show: true,
            position: 'right'
          },
          data: redirectData
        },
      ]
    }
  }

  function debounce(fn, delay) {
    let timer = null;

    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, arguments);
      }, delay);
    }
  }

  function getPerformanceAvg() {
    api.getPerformanceAvg({
      'app_id': appId,
      'xMin': time
    }).then(res => {
      if (res.data.code === 20000) {
        const { redirectTime, dnsTime, reqTime, ttfbTime, loadPageTime } = res.data.performance
        setRedirectData(['-', '-', '-', '-', redirectTime.toFixed(4)])
        setDnsData(['-', '-', '-', dnsTime.toFixed(4), '-'])
        setReqTime(['-', '-', reqTime.toFixed(4), '-', '-'])
        setTtfbData(['-', ttfbTime.toFixed(4), '-', '-', '-'])
        setLoadPageData([loadPageTime.toFixed(4), '-', '-', '-', '-',])
        setTransparentData([
          (redirectTime + dnsTime + reqTime + ttfbTime).toFixed(4),
          (redirectTime + dnsTime + reqTime).toFixed(4),
          (redirectTime + dnsTime).toFixed(4),
          redirectTime.toFixed(4),
          '-'
        ])
      }
    }).catch(e => {console.error(e)})
  }

  const onChangeSlider = (value) => {
    setTime(value)
  }
  useEffect(() => {
    getPerformanceAvg()
    // eslint-disable-next-line
  }, [time])
  return (
    <div className={'dailyPV-wrapper'}>
      <span>最近</span>
      <Slider defaultValue={720} max={14400} style={{ width: '30%', display: 'inline-block', marginBottom: '0' }}
              tooltipVisible onChange={debounce(onChangeSlider, 300)}/>
      <span>分钟app平均性能</span>
      <Card>
        <MyEcharts option={getOption()} style={{ width: '100%', height: '400px' }}/>
      </Card>
    </div>
  )
})

export default PerformanceAvg

