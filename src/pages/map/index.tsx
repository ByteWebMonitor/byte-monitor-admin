import React, { useEffect, useState } from 'react'
import './index.less'
import echarts from 'echarts/lib/echarts'
import 'echarts/map/js/china'

const Map: React.FC = React.memo(() => {
  const [data, setData] = useState([
    { name: '北京', value: Math.round(Math.random() * 1000) },
    { name: '天津', value: Math.round(Math.random() * 1000) },
    { name: '上海', value: Math.round(Math.random() * 1000) },
    { name: '重庆', value: Math.round(Math.random() * 1000) },
    { name: '河北', value: Math.round(Math.random() * 1000) },
    { name: '河南', value: Math.round(Math.random() * 1000) },
    { name: '云南', value: Math.round(Math.random() * 1000) },
    { name: '辽宁', value: Math.round(Math.random() * 1000) },
    { name: '黑龙江', value: Math.round(Math.random() * 1000) },
    { name: '湖南', value: Math.round(Math.random() * 1000) },
    { name: '安徽', value: Math.round(Math.random() * 1000) },
    { name: '山东', value: Math.round(Math.random() * 1000) },
    { name: '新疆', value: Math.round(Math.random() * 1000) },
    { name: '江苏', value: Math.round(Math.random() * 1000) },
    { name: '浙江', value: Math.round(Math.random() * 1000) },
    { name: '江西', value: Math.round(Math.random() * 1000) },
    { name: '湖北', value: Math.round(Math.random() * 1000) },
    { name: '广西', value: Math.round(Math.random() * 1000) },
    { name: '甘肃', value: Math.round(Math.random() * 1000) },
    { name: '山西', value: Math.round(Math.random() * 1000) },
    { name: '内蒙古', value: Math.round(Math.random() * 1000) },
    { name: '陕西', value: Math.round(Math.random() * 1000) },
    { name: '吉林', value: Math.round(Math.random() * 1000) },
    { name: '福建', value: Math.round(Math.random() * 1000) },
    { name: '贵州', value: Math.round(Math.random() * 1000) },
    { name: '广东', value: Math.round(Math.random() * 1000) },
    { name: '青海', value: Math.round(Math.random() * 1000) },
    { name: '西藏', value: Math.round(Math.random() * 1000) },
    { name: '四川', value: Math.round(Math.random() * 1000) },
    { name: '宁夏', value: Math.round(Math.random() * 1000) },
    { name: '海南', value: Math.round(Math.random() * 1000) },
    { name: '台湾', value: Math.round(Math.random() * 1000) },
    { name: '香港', value: Math.round(Math.random() * 1000) },
    { name: '澳门', value: Math.round(Math.random() * 1000) }
  ])
  const option = {
    title: {
      text: '各省份使用情况',
      subtext: '数据暂虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    visualMap: {
      min: 0,
      max: 2500,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'], // 文本，默认为数值文本
      calculable: true
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['热力值']
    },
    series: [
      {
        name: '热力值',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          show: true
        },
        data: data
      },
    ]
  }
  const bond = (option) => {
    const dom = document.getElementById('echartsMapId')
    const chart = echarts.init(dom)
    chart.setOption(option)
  }

  useEffect(() => {
    bond(option)
    // eslint-disable-next-line
  }, [data])

  return (
    <>
      <div id="china-map">
        <h2>中国地理位置分布统计图</h2>
        <div id='echartsMapId' style={{ width: '100', height: '25rem' }}/>
      </div>
    </>
  )
})

export default Map
