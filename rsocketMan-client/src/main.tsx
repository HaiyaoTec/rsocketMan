import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom";
import App from './App'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import 'normalize.css/normalize.css'
import 'antd/dist/antd.css';
import './index.css';
import {store} from './store/store'
import {Provider} from 'react-redux'
import {message} from "antd";
message.config({
  duration: 2,
  maxCount: 3,
  rtl:true
});


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)
