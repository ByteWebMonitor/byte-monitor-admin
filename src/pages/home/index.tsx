import React, { FC } from 'react'
import { Card} from 'antd'



const Home: FC = () => {


  return (
    <div className="home" style={{ height: '100vh', padding: 20 }}>
          <Card title="复制/粘贴BI探针" >
            <p><a href="javascript:void(0)">复制下方代码</a>并粘贴至页面HTML的
            <code style={{color:"blue"}}>{'<'}body{'>'}</code>中。</p>
            <p>注意：需要将代码粘贴在<code style={{color:"blue"}}>{'<'}body{'>'}</code>内容的第一行。</p>
            <textarea style={{padding: 20,width:"100%"} }>
              &lt;script src="https://cdn.vansin.top/jssdk-0.1.2.min.js"&gt;&lt;/script&gt;
              &lt;script new Monitor&#40;&#123;baseUrl:"https://qcgtsp.app.cloudendpoint.cn/api",
              testMode: true,consoleError: true,app_id: "byte-monitor-docs",&#125;&#41;&lt;/script&gt;
            </textarea>
          </Card>
    </div>
  )
}

export default Home
