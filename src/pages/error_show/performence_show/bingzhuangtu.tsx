import MyEcharts from '@/components/common/myEcharts'
import React,{useEffect, useState} from 'react'
import { Radio,Card } from 'antd';
import api from '@/api'

const Img2: React.FC = React.memo(() => {
    const [time,setTime] = useState(0)
    const [data,setData] = useState([{'value':0,'name':'没有浏览器访问，请检查或者刷新'}])
    const [data1,setData1] = useState([{'value':0,'name':'没有操作系统访问，请检查或者刷新'}])
    const subtext=['5分钟以内','30分钟以内',"一小时以内","一天以内"]
    const getOption1 = () => {
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
          left: 'left',
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: data,
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
    const getOption2 = () => {
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
          left: 'left',
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: data1,
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
    const changeTime = (time) => {
        setTime(time)
        api.getBroswer(
          {
            "app_id": "114514114514abc",
            "xMin": 60000
        }
        ).
        then(res=> {          
          var temp=[]
          for(let i=0;i<res.data.length;i++){
            temp.push({value:res.data[i]['num'],name:res.data[i]['browser']})
          }
          setData(temp)
      }).catch(e=>{
          console.log(e)
      })
      api.getOs({
        "app_id": "114514114514abc",
        "xMin": 50000}).then(
            res=>{
              for(let i=0;i<res.data.length;i++){
                res.data[i]=({value:res.data[i]['num'],name:res.data[i]['OS']})
              }
              setData1(res.data)
            }
            ).catch(e=>{console.log(e)})
      }
    return (
      <>
        <div>
          <Radio.Group  defaultValue="a" buttonStyle="solid">
            <Radio.Button onClick={() => changeTime(0)} value="a">5分钟</Radio.Button>
            <Radio.Button value="b" onClick={() => changeTime(1)}>30分钟</Radio.Button>
            <Radio.Button value="c" onClick={() => changeTime(2)}>一小时</Radio.Button>
            <Radio.Button value="d" onClick={() => changeTime(3)}>一天</Radio.Button>
          </Radio.Group>
          <Card>
            <MyEcharts
                option={getOption1()}
                style={{ width: '100%', height: '500px' }}
              />
          </Card>
          <Card>
            <MyEcharts
                option={getOption2()}
                style={{ width: '100%', height: '500px' }}
              />
          </Card>
      </div>
      </>
    )
  })
  
export default Img2

