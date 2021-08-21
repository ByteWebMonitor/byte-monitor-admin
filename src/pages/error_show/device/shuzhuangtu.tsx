import MyEcharts from '@/components/common/myEcharts'
import React,{ useEffect,useState} from 'react'
import {Card,InputNumber,Button} from 'antd';
import api from '@/api'
interface Props extends ReduxProps {}
//需要解决的一个点，如何获取当前模式，如暗黑模式，这样子图表根据系统自动切换
const Img1: React.FC<Props> = React.memo(() => {
  const [day, setDay] = useState(10)
  const [hour, setHour] = useState(10)
  const [data, setData] = useState([])
  const [data1, setData1] = useState([])
  const [hour_data, setHour_data] = useState([])
  const [hour_data1, setHour_data1] = useState([])
  const getOption1 = () => {
    return {
      title:[{
          text:day+'天内每天的PV'
      }
      ],
      color: ["#3398DB"],
        xAxis: {
            type: 'category',
            data: data1     
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: data,
            type: 'line'
        }]
    }}
  const getOption2 = () => {
    return {
      title:[{
          text:hour+'小时内的PV'
      }
      ],
      color: ["#3398DB"],
        xAxis: {
            type: 'category',
            data: hour_data    
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: hour_data1,
            type: 'line'
        }]
    }}

    const changeDay=(day)=>{
      setDay(day)
      api.getDays({
        "app_id": "114514114514abc",
        "xDay": day
      }).then(res=>{
        if(res.data.code==20001){
          alert('不能请求超过60天')
          changeHour(10)
        }
        else{
          console.log('ok1')
          var temp1=[]
          var temp2=[]
          for(let i=0;i<res.data['list'].length;i++){
            temp1.push(res.data['list'][i]['num'])
            temp2.push(res.data['list'][i]['date'])
          }
          setData(temp1)
          setData1(temp2)
        }
      }).catch(e=>{console.log(e)})
    }
    const changeHour=(hour)=>{
      setHour(hour)
      api.getHours({
        "app_id": "114514114514abc",
        "xHour": hour
      }).then(res=>{
        console.log("ok")
        if(res.data.code==20001){
          alert('不能请求超过72小时')
          changeHour(10)
        }
        else{
          var temp1=[]
          var temp2=[]
          for(let i=0;i<res.data['list'].length;i++){
            temp1.push(res.data['list'][i]['num'])
            temp2.push(res.data['list'][i]['date'])
          }
          setHour_data(temp2)
          setHour_data1(temp1)
        }
      }).catch(e=>{console.log(e)})
    }
    // useEffect(()=>{
    //   changeDay(day)
    //   changeHour(hour)
    // })
    return (
      <>
        <div>
          <Card>
              <MyEcharts
                  option={getOption1()}
                  style={{ width: '100%', height: '300px' }}
                /> 
                <InputNumber id='day' value={day} onChange={(value)=>changeDay(value)} />
          </Card>
          <Card>
              <MyEcharts
                  option={getOption2()}
                  style={{ width: '100%', height: '300px' }}
                /> 
                <InputNumber id='hour' value={hour} onChange={(value)=>changeHour(value)} />
          </Card>

        </div>
      </>
    )
  })
  
export default Img1

