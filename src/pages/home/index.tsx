import React, { FC } from 'react'
import { Card, Col, Row, Typography } from 'antd'
import './Home.module.less'

const Home: FC = () => {
  return (
    <div className="home-index">
      <Row>
        <Col span={12}>
          <Card title="主要功能" style={{ marginBottom: '12px', marginRight: '6px' }}>
            <ul>
              <li>app管理：显示所有app列表</li>
              <li>图表详情：以图表形式展示当前app的各项数据</li>
              <li>错误日志：以列表形式显示前端收集到的各种错误信息</li>
              <li>设备统计：以列表形式显示前端收集到的各种设备信息</li>
              <li>性能统计：以列表形式显示前端收集到的dns响应时间、加载页面时间等信息</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="技术选型" style={{ marginBottom: '12px' }}>
            <ul>
              <li>使用最新的 React Hooks 开发</li>
              <li>使用 Redux 进行全局状态管理</li>
              <li>基于 Ant Design 体系精心设计</li>
              <li>使用字节轻服务Serverless部署</li>
              <li>使用 Github Actions 进行自动化部署</li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Card title="复制/粘贴BI探针">
        <p>
          复制下方代码并粘贴至页面HTML的<code style={{ color: 'blue' }}>{'<'}body{'>'}</code>中。
        </p>
        <p>注意：需要将代码粘贴在<code style={{ color: 'blue' }}>{'<'}body{'>'}</code>内容的第一行。</p>
        <Typography.Text code={true} copyable={true}>
          &lt;script src="https://cdn.vansin.top/jssdk-0.1.2.min.js"&gt;&lt;/script&gt;
          &lt;script&gt; new Monitor&#40;&#123;baseUrl:"https://qcgtsp.app.cloudendpoint.cn/api",
          testMode: true,consoleError: true,app_id: "byte-monitor-docs"&#125;&#41;&lt;/script&gt;
        </Typography.Text>
      </Card>
    </div>
  )
}

export default Home
