import React from 'react'
import './Detail.less'
import 'echarts/map/js/china'
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
import { url2Map } from '@/utils'
import { useLocation } from 'react-router-dom'
import BrowserAndOsPV from '@/pages/error_show/device/BrowserAndOsPV'
import DailyPV from '@/pages/error_show/device/DailyPV'
import PerformanceAvg from '@/pages/performance/PerformanceAvg'

interface Props extends ReduxProps {}

const Detail: React.FC<Props> = React.memo(() => {
  const params = url2Map(useLocation().search)
  const appId = params?.get('app_id')

  return (
    <>
      <BrowserAndOsPV
        // @ts-ignore
        appId={appId}
      />
      <DailyPV
        // @ts-ignore
        appId={appId}
      />
      <PerformanceAvg
        // @ts-ignore
        appId={appId}
      />
    </>
  )
})

export default connect(
  (state) => state,
  actions
)(Detail)
