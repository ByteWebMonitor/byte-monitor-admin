import React, { Component } from 'react'
import * as echarts from 'echarts'

export default class Test extends Component {
  componentDidMount() {
    var data1 = ['1', '1']
    var option = {
      color: ['#3398DB'],
      xAxis: {
        type: 'category',
        data: data1
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }]
    }
    var mychart = echarts.init(document.getElementById('main'))
    console.log(mychart.setOption())
    mychart.setOption(option)
  }

  render() {
    return (
      <div>
        <div id='main'></div>
      </div>
    )
  }
}

