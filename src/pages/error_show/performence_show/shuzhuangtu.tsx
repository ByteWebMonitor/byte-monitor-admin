import * as echarts from 'echarts';
import React,{ useEffect} from 'react'
import request from './require.js';
import { connect } from 'react-redux';
interface Props extends ReduxProps {}
//需要解决的一个点，如何获取当前模式，如暗黑模式，这样子图表根据系统自动切换
const Img1: React.FC<Props> = React.memo((
  {storeData: { theme, userInfo },
  setStoreData}) => {
    // request.post('/device/statXMinRecentPvBrowserRatio', {
    //     app_id: '114514114514abc',
    //     "xMin": 60000
    // }).then( res=> {
    //     console.log(res.data)
    // }).catch(e=>{
    //     console.log(e)
    // })
  var ThemeMode=theme==="default"?'':'dark'
  var data1=['1','1']
    var option = {
      color: ["#3398DB"],
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
    };
    const bond = (option) => {
        const dom = document.getElementById('1111')
        const chart = echarts.init(dom,ThemeMode)
        chart.setOption(option)
      }
      useEffect(() => {
        bond(option)
      })
    return (
      <>
        <div>
          <h2>实时访问次数</h2>
            <div id='1111' style={{ width: '100', height: '25rem' }}></div>
        </div>
      </>
    )
  })
  
export default connect((state)=>state)(Img1)

