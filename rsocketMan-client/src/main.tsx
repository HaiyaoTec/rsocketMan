import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import 'normalize.css/normalize.css'
import 'antd/dist/antd.css';
import './index.css';
import {store} from './store/store'
import {Provider} from 'react-redux'


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
)
