<h1 align="center">byte-monitor-admin</h1>

<div align="center">🛠️监控管理系统🛠️</div>

## 特性

- 🚅: **追求前沿**：全站使用 `React Hooks` 开发，抛弃 `Class`
- 💎: **优雅美观**：基于 `Ant Design` 体系精心设计
- 🚀: **流行技术**：使用 `React/Redux/Antd` 等前端前沿技术开发
- 🎨: **主题样式**：使用流行的`暗黑模式`主题，支持`深/浅色`主题切换

## 特点

- 多 tab 页签➕右键菜单，提升效率
- Redux 状态管理➕持久化
- 封装实用 axios 请求
- 动态链式面包屑导航
- 菜单页面路由权限控制
- less➕css module 样式隔离
- 列表➕分页➕多选➕搜索联动组件
- 可自定义 webpack 配置➕优化打包

## 使用

### 使用命令行
```bash
$ npm install -g typescript
$ npm install 或者 yarn install
$ npm start 或者 yarn start         # 访问 http://localhost:666
```
### 路由/菜单配置
```
# 所有路由写在 /src/route/routes.ts （包括菜单栏的路由）
  用于路由权限控制

# 左侧菜单路由写在 /src/config/menu.ts
  仅用于菜单栏展示

# 分两套的原因是，方便维护，如果不嫌麻烦，可以都写在 routes 里，用一个字段标识菜单路由即可
```

### Redux 的使用说明
```
# 在/src/store/actionTypes/index.tsx 定义新字段，格式如下
export default {
  ...,
  SET_ACTION: {
    name: 'SET_ACTION',
    field: 'action'
  }
}

# 在/src/store/state/index.tsx 也定义新字段，格式如下
interface StoreState {
  ...;
  action: string;
}
const initState: StoreState = {
  ...,
  action: ''
}

# 在要使用的组件中
import { connect } from 'react-redux'
import * as actions from '@/store/actions'
export default connect(
  (state) => state,
  actions
)(ComponentName)

# 然后在 props 就有 setStoreData 属性，可用来 dispatch
setStoreData('SET_ACTION', '')

# 只需要定义 type 和 state，不需要写每个action，效率提高了木有有！！！
```


### 关于换肤配置
> 本框架是使用 less.js 实现动态切换主题，js文件在 /public/less.min.js
```
# 主题配置文件在 /public/color.less

引用了 antd 组件后，基本不需要自己额外自定义主题样式，因为主题文件里都有。
但是！！！
如果自己写了自定义组件，切换主题后样式显示不正常，
则需要自己在 color.less 底部添加深浅主题对应的样式，具体参考主题文件内额外配置。

```

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions
