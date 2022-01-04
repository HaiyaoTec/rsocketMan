/** @jsxImportSource @emotion/react */
import {FC, useEffect, useState} from 'react'
import {css, jsx} from '@emotion/react'
import Configure from "./components/Configure/Configure";
import React from 'react';
import Header from "./components/Header/Header";
import {Layout} from "antd";
import './App.css'
// @ts-ignore
import add from './assets/svg/add.svg'
import DataDisplay from "./components/DataDisplay/DataDisplay";
import {useDispatch, useSelector} from "react-redux";
import {store} from "./store/store";
import SideBarItem from "./components/SideBarItem/SideBarItem";
import {addRequestItem, updateRequestItem} from "./store/slice/RequestSlice";
import {nanoid} from 'nanoid'
import {Route, Routes} from 'react-router-dom';

const {Footer, Sider, Content} = Layout;

function App() {
  const [count, setCount] = useState(0)
  const requestItems = useSelector((state) => state.requestSliceReducer)
  console.log(requestItems)
  useEffect(() => {
    // run().then(resulet=>console.log('success')).catch(err=>console.log('err'))
  }, [])


  // @ts-ignore
  return (
    <div css={css`height: 100%;`}>
      <Configure/>
      <Layout css={css`height: 100%;`}>
        <Header/>
        <Layout>
          <Sider
            css={
              css`
                border: 1px solid #000000;
                overflow: auto;
                &::-webkit-scrollbar {
                  display: none
                }
                background-color: #272b30;
                min-width: 305px !important;
                padding: 0 !important;
              `
            }
          >
            <div css={css`
              position: sticky;
              top: 0;
              height: 50px;
              text-align: center;
              cursor: pointer;
              font-weight: bold;
              font-size: 26px;
              vertical-align: middle;
              background-color: #16191b;
              color: #FFFFFF;
              border-left: 0;
              border-right: 0;
            `
            }
                 onClick={() => {
                   store.dispatch(addRequestItem({
                     id: `${nanoid()}`,
                     metadata: '',
                     route: '/xxx/xxx',
                     data: '',
                     receive: [],
                     method: 'fireAndForget'
                   }))
                 }}
            >
              <div css={css`& > svg {
                width: 10px;
                height: 10px;
                background-color: red;
              }`}>
                <img src={add} css={css`width: 30px;
                  margin-right: 10px`}/>
                Add Request
              </div>
            </div>
            {/*SideBar*/}
            {requestItems.map((item, index) => (
              <SideBarItem key={index} info={item}/>
            ))}
          </Sider>
          <Content css={css`
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            background-color: #272b30;
            overflow: auto`}>
            <Routes>
              <Route path=":requestID" element={<DataDisplay/>}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
