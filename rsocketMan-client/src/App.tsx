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
import {Route, Routes, useNavigate} from 'react-router-dom';

const {Footer, Sider, Content} = Layout;

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const requestItems = useSelector((state) => state.requestSliceReducer)
  console.log(requestItems)
  useEffect(() => {
  }, [])


  // @ts-ignore
  return (
    <div css={css`height: 100%;`}>
      <Configure/>
      <Layout css={css`height: 100%;`}>
        <Header/>
        <Layout css={css`background-color: #1c1d22`}>
          <Sider
            css={
              css`
                border: 1px solid #000000;
                overflow: auto;

                &::-webkit-scrollbar {
                  display: none
                }

                background-color: #252730;
                min-width: 336px !important;
                padding: 0 !important;
              `
            }
          >
            <div css={css`
              position: sticky;
              top: 0;
              height: 44px;
              margin: 20px 20px 20px 20px;
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
              <div css={
                css`
                  height: 44px;
                  text-align: center;
                  line-height: 44px;
                  font-family: Poppins, serif;
                  font-style: normal;
                  font-weight: 600;
                  color: #FFFFFF;
                  cursor: pointer;
                  background-color: #7297FC;
                  border-radius: 3px;
                `}>
                + Add Request
              </div>
            </div>
            {/*SideBar*/}
            {requestItems.map((item, index) => (
              <SideBarItem key={index} info={item}/>
            ))}
          </Sider>
          <Content css={css`
            margin: 30px 32px;
            border-left: 0;
            border-right: 0;
            background-color: #1c1d22;
            border-radius: 3px;
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
