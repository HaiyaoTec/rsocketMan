/** @jsxImportSource @emotion/react */
import {useEffect, useState} from 'react'
import logo from './logo.svg'
import {css, jsx} from '@emotion/react'
import Configure from "./components/Configure/Configure";
import {
  RSocketClient,
  JsonSerializers,
  APPLICATION_JSON,
  encodeCompositeMetadata,
  TEXT_PLAIN,
  MESSAGE_RSOCKET_ROUTING,
  encodeRoute,
  MESSAGE_RSOCKET_AUTHENTICATION,
  encodeSimpleAuthMetadata,
  MESSAGE_RSOCKET_COMPOSITE_METADATA,
  BufferEncoders
} from 'rsocket-core';
import RSocketWebsocketClient from 'rsocket-websocket-client';
import {Flowable} from 'rsocket-flowable';
import {ISubscription} from "rsocket-types/ReactiveStreamTypes";
import React from 'react';
import Head from "./components/Header/Header";
import {Layout} from "antd";
import './App.css'
import add from './assets/svg/add.svg'
import DataDisplay from "./components/DataDisplay/DataDisplay";
import {useDispatch, useSelector} from "react-redux";
import {updateDataDisplay} from "./store/slice/DataDisplaySlice";
import {store} from "./store/store";
import SideBarItem from "./components/SideBarItem/SideBarItem";

const {Header, Footer, Sider, Content} = Layout;


async function createClient(options: any) {
  const transportOptions = {
    url: `ws://${options.host}:${options.port}`,
    // In non-browser environments we need to provide a
    // factory method which can return an instance of a
    // websocket object. Browsers however, have this
    // functionality built-in.
    wsCreator: (url: string | URL) => {
      return new WebSocket(url);
    }
  };
  const route = 'page/abc'

  const setupOptions = {
    keepAlive: 10000000,
    lifetime: 100000,
    dataMimeType: 'application/octet-stream',
    metadataMimeType: 'text/plain'
    ,
    payload: {
      metadata: '13',
      data: '133'
    }
  };

  const transport = new RSocketWebsocketClient(transportOptions);
  const client = new RSocketClient({setup: setupOptions, transport});
  return client.connect();
}

async function run() {

  const rsocket = await createClient({
    host: '127.0.0.1',
    port: 10081,
  });

  rsocket.fireAndForget({})

  // rsocket.requestResponse({
  //   data: 'hello12131 world!!!!!!!!!',
  //   metadata:'123'
  // }).then((data) => {
  //   console.log(data)
  // })


  let cancel = null;
  // rsocket
  //   .requestResponse({data: '1231231', metadata: '3123123',})
  //   .subscribe({
  //     onComplete: (response) => {
  //       console.log(`requestResponse response`, response);
  //     },
  //   })
  // .subscribe({
  //   onComplete: (response) => {
  //     console.log(`requestResponse response`, response);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   onSubscribe: (_cancel) => {
  //     cancel = _cancel;
  //   },
  // });


  // const source = rsocket.requestStream({data: 'hello', metadata: 'world'})
  //
  // source.subscribe({
  //   onNext: (msg) => {
  //     console.log(`message received`, JSON.stringify(msg));
  //   },
  //   onComplete: () => {
  //     console.log(`requestStream completed`);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //   },
  //   onSubscribe: ({cancel, request}) => {
  //     console.log(`requestStream requesting random ints`);
  //     request(3)
  //   },
  // })


  // const playLoad1 = {data: '123999'}
  // const playLoad2 = {data: '456'}
  // rsocket.requestChannel(Flowable.just(playLoad1, playLoad2)).map((data) => {
  //   console.log(data)
  // }).subscribe(()=>{})
}


function App() {
  const [count, setCount] = useState(0)
  const fireAndForgetArray = useSelector((state) => state.fireAndForgetReducer.fireAndForgetArray)
  useEffect(() => {
    // run().then(resulet=>console.log('success')).catch(err=>console.log('err'))
  }, [])


  return (
    <div css={css`height: 100%`} className="App">
      <Configure/>
      <Layout css={css`height: 100%;`}>
        <Head/>
        <Layout>
          <Sider
            css={
              css`
                overflow: auto;
                background-color: #ffffff;
                min-width: 300px !important;
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
              color: #000000;
              font-size: 30px;
              background-color: #cccccc`}
                 onClick={() => {
                   store.dispatch(updateDataDisplay({
                     id: '',
                     metadata: '',
                     route: '',
                     data: '',
                     receive: [],
                     method: ''
                   }))
                 }}
            >
              <img src={add} css={css`
                width: 40px;
                margin-right: 10px`}/>
              Add Request
            </div>

            {/*SideBar*/}

            {fireAndForgetArray.map((item) => (
              <SideBarItem/>
            ))}

            <div css={css`height: 200px;
              background-color: blue;
              border: 1px solid #ccc`}>888123123111
            </div>
            <div css={css`height: 200px;
              background-color: blue;
              border: 1px solid #ccc`}>888123123
            </div>
            <div css={css`height: 200px;
              background-color: blue;
              border: 1px solid #ccc`}>888123123
            </div>
            <div css={css`height: 200px;
              background-color: blue;
              border: 1px solid #ccc`}>888123123
            </div>
            <div css={css`height: 200px;
              background-color: blue;
              border: 1px solid #ccc`}>888123123
            </div>
          </Sider>
          <Content css={css`background-color: pink;
            overflow: auto`}>
            <DataDisplay/>
          </Content>
        </Layout>
      </Layout>
      {/*<Layout css={css`height: 100%`}>*/}
      {/*  <Head/>*/}
      {/*  <Layout>*/}
      {/*    <Sider css={css`*/}
      {/*      overflow: auto;*/}
      {/*      height: 100vh;*/}
      {/*      position: fixed;*/}
      {/*      left: 0;*/}
      {/*      min-width: 300px !important;*/}
      {/*    `}>*/}
      {/*      <div css={css`position: sticky;*/}
      {/*        top: 0;*/}
      {/*        height: 50px;*/}
      {/*        text-align: center;*/}
      {/*        cursor: pointer;*/}
      {/*        color: #000000;*/}
      {/*        font-size: 30px;*/}
      {/*        background-color: #cccccc`}>*/}
      {/*        <img src={add} css={css`width: 40px;margin-right: 10px`}/>*/}
      {/*        Add Request*/}
      {/*      </div>*/}
      {/*      <div style={{height: 500, backgroundColor: "green"}}>888123123</div>*/}
      {/*      <div style={{height: 500, backgroundColor: "green"}}>123123</div>*/}
      {/*      <div style={{height: 500, backgroundColor: "green"}}>123123</div>*/}
      {/*      <div style={{height: 500, backgroundColor: "green"}}>123123</div>*/}
      {/*    </Sider>*/}
      {/*    <Content css={css`background-color: pink;`}>12313</Content>*/}
      {/*  </Layout>*/}
      {/*</Layout>*/}
      {/*  <Head/>*/}
    </div>
  )
}

export default App
