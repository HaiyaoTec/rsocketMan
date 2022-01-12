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
  BufferEncoders,
  RSocketResumableTransport, CompositeMetadata,
  decodeCompositeMetadata
} from 'rsocket-core';
import RSocketWebsocketClient from 'rsocket-websocket-client';
import {Flowable} from 'rsocket-flowable';
import {ISubscription} from "rsocket-types/ReactiveStreamTypes";
import {store} from "../store/store";
import {useSelector} from "react-redux";
import {Payload} from "rsocket-types";
import {updateRequestItem} from "../store/slice/RequestSlice";
import {Buffer} from "buffer";
import * as buffer from "buffer";
import {nanoid} from "nanoid";
import {message} from 'antd';

type type = 'application/json' | 'text/plain' | any
//TODO 需要修改
export const transformData = (data: unknown, type: type) => {

  switch (type) {
    case 'application/json':
      console.log('jsonParse')
      if (!data) data = '{}'
      console.log(data)
      try {
        data = JSON.stringify(JSON.parse(data as string))
      }catch (e) {
        // @ts-ignore
      }
      break;
    case 'text/plain':
      if (!data) data = ''
      if (typeof data === 'string') {
        data = data.toString()
      }
      break;
  }

  return Buffer.from(data as string)
}

// metadata:encodeCompositeMetadata([[APPLICATION_JSON,Buffer.from(JSON.stringify({"sessionId":"u20as","clientId":"123141231","clientType":"browser"}))]]),

export const transformMetaData = (data: unknown, type: type, route = '') => {
  console.log(data, type)
  //非空判断

  switch (type) {
    case 'application/json':
      if (!data) {
        data = "{}"
      }
      try {
        data=JSON.stringify(JSON.parse(data as string))
      }catch (e) {
      }
      return encodeCompositeMetadata([
        [APPLICATION_JSON, Buffer.from(data as string)],
        [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)]
      ]);
    case 'text/plain':
      console.log(data)
      if (!data) {
        data = ''
      }
      return encodeCompositeMetadata([
        [TEXT_PLAIN, Buffer.from(data as string)],
        [MESSAGE_RSOCKET_ROUTING, encodeRoute(route)]
      ]);
  }
}


/**
 * 创建 rsocket client instance的方法
 * @param options
 */
export async function createRSocketClient() {

  return new Promise((resolve, reject) => {
    //获取配置信息
    const configuration = store.getState().connection
    console.log(configuration)
    const transportOptions = {
      debug: true,
      url: `${configuration.websocketURL}`,
      wsCreator: (url: string | URL) => {
        return new WebSocket(url);
      }
    };
    // const route = 'page/abc'

    const setupOptions = {
      keepAlive: `${configuration.KeepAlive}`,
      lifetime: `${configuration.lifetime}`,
      dataMimeType: `${configuration.dataMimeType}`,
      // metadataMimeType: `${configuration.metadataMimeType}`
      metadataMimeType: `${MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`
      ,
      payload: {
        //transformData(configuration.metadata, configuration.metadataMimeType)
        //@ts-ignore
        // metadata:encodeCompositeMetadata([[APPLICATION_JSON,Buffer.from(JSON.stringify({"sessionId":"u20as","clientId":"123141231","clientType":"browser"}))]]),
        metadata: transformMetaData(configuration?.metadata, configuration.metadataMimeType),
        // data: `${Buffer.from(transformData(configuration?.data, configuration.dataMimeType)as string)}`
        // metadata: `${transformData(configuration?.metadata, configuration.metadataMimeType)}`,
        data: (transformData(configuration?.data, configuration.dataMimeType) ?? "")
      }
    };

    const transport = new RSocketWebsocketClient(transportOptions, BufferEncoders);
    // @ts-ignore
    const client = new RSocketClient({setup: setupOptions, transport});
    const rsocket = client.connect()
    setTimeout(() => {
      reject('连接超时')
    }, 3000)
    rsocket.subscribe({
      onComplete: (client) => {
        //TODO 需要修改
        console.log('连接成功')
        resolve(client)
      },
      onError: (e) => {
        console.log(e)
        reject('连接错误')
      }
    });
  })

}

/**
 * 创建 ResumeRsocket client instance的方法
 * @param options
 */
export function createResumeRSocketClient() {

  return new Promise((resolve, reject) => {
    //获取配置信息
    const configuration = store.getState().connection
    console.log(configuration)
    const transportOptions = {
      debug: true,
      url: `${configuration.websocketURL}`,
      wsCreator: (url: string | URL) => {
        return new WebSocket(url);
      }
    };
    const resumeToken = Buffer.from(nanoid());
    const bufferSize = 128;
    const sessionDurationSeconds = 300;

    // Create an instance of a client
    const resumableTransport = new RSocketResumableTransport(
      // supplier of low-level transport
      () => new RSocketWebsocketClient(transportOptions, BufferEncoders),
      {
        bufferSize, // max number of sent & pending frames to buffer before failing
        resumeToken, // unique identifier the session across connections
        sessionDurationSeconds,
      },
      BufferEncoders,
    );

    const setupOptions = {
      keepAlive: `${configuration.KeepAlive}`,
      lifetime: `${configuration.lifetime}`,
      dataMimeType: `${configuration.dataMimeType}`,
      // metadataMimeType: `${configuration.metadataMimeType}`
      metadataMimeType: `${MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`
      ,
      payload: {
        metadata: transformMetaData(configuration?.metadata, configuration.metadataMimeType),
        data: (transformData(configuration?.data, configuration.dataMimeType) ?? "")
      }
    };

    // @ts-ignore
    const client = new RSocketClient({setup: setupOptions, transport: resumableTransport});
    const rsocket = client.connect()
    setTimeout(() => {
      reject('连接超时')
    }, 3000)
    rsocket.subscribe({
      onComplete: (client) => {
        //TODO 需要修改
        console.log('连接成功')
        resolve(client)
      },
      onError: (e) => {
        message.error('连接错误！！！')
        reject('连接错误')
      }
    });
  })

}


export const fireAndForget = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }) => {
  console.log(value)
  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    metadata: transformMetaData(value.metadata, metadataMimeType, value.route)
  }
  console.log(payLoad)
  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  if (!rsocket) {
    console.log('rsocket instance not init yet ')
    message.error('rsocket instance not init yet');
  } else {
    rsocket.fireAndForget(payLoad as Payload<any, any>)
    sendMessageAndUpdateUI(value,payLoad)
  }
}

export const requestResponse = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }) => {
  console.log(value)
  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    // metadata: transformData(value.metadata, metadataMimeType)
    metadata: transformMetaData(value.metadata, metadataMimeType, value.route)
  }
  if (!rsocket) {
    console.log('rsocket instance not init yet ')
    message.error('rsocket instance not init yet');
  } else {
    let _cancel: Function
    // @ts-ignore
    rsocket.requestResponse(payLoad)
      .subscribe({
        onComplete: (response) => {
          //将buffer转换为string
          response = {...response, data: response.data?.toString()}
          //
          response = Object.assign(response, {success: true})
          receiveAndUpdateUI(value, response, _cancel)
        },
        onError: (error) => {
          //TODO 添加错误消息
          console.log(error);
          //将buffer转换为string
          let response = {success: false, data: `${error}`, metadata: ''}
          receiveAndUpdateUI(value, response, _cancel)
        },
        onSubscribe: (cancel) => {
          _cancel = cancel
        },
      });
    //添加消息流
    sendMessageAndUpdateUI(value,payLoad)
  }
}


export const requestStream = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }) => {
  console.log('hhhhhhhhh')
  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    metadata: transformMetaData(value.metadata, metadataMimeType, value.route)
  }
  if (!rsocket) {
    console.log('rsocket instance not init yet ')
    message.error('rsocket instance not init yet');
  } else {
    let _cancel: Function
    // @ts-ignore
    rsocket.requestStream(payLoad as Payload<string, string>)
      .subscribe({
        onNext: (response) => {
          //将buffer转换为string
          response = {...response, data: response.data?.toString()}
          response = Object.assign(response, {success: true})
          receiveAndUpdateUI(value, response, _cancel)
        },
        onComplete: () => {
          console.log(`requestStream completed`);
        },
        onError: (error) => {
          //TODO 添加错误消息
          console.log(error);
          //将buffer转换为string
          let response = {success: false, data: `${error}`, metadata: ''}
          receiveAndUpdateUI(value, response, _cancel)
        },
        onSubscribe: ({cancel, request}) => {
          _cancel = cancel
          const nums = 12;
          console.log(`requestStream requesting ${nums} random ints`);
          request(nums);
        },
      })
    //添加消息流
    sendMessageAndUpdateUI(value,payLoad)
  }
}


export const requestChannel = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }) => {
  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    metadata: transformMetaData(value.metadata, metadataMimeType, value.route)
  }
  if (!rsocket) {
    console.log('rsocket instance not init yet ')
    message.error('rsocket instance not init yet');
  } else {
    let _cancel: Function;
    // @ts-ignore
    rsocket.requestChannel(Flowable.just(payLoad))
      .subscribe({
        onNext: (response) => {
          //将buffer转换为string
          response = {...response, data: response.data?.toString()}
          response = Object.assign(response, {success: true})
          receiveAndUpdateUI(value, response, _cancel)
        },
        onComplete: () => {
          console.log(`requestChannel completed`);
        },
        onError: (error) => {
          //TODO 添加错误消息
          console.log(error);
          //将buffer转换为string
          let response = {success: false, data: `${error}`, metadata: ''}
          receiveAndUpdateUI(value, response, _cancel)
        },
        onSubscribe: ({cancel, request}) => {
          //TODO 需要修改
          _cancel = cancel
          const nums = 12;
          console.log(`requestChannel requesting ${nums} random ints`);
          request(nums);
        },
      })
    //添加消息流
    sendMessageAndUpdateUI(value,payLoad)
  }
}

export const sendMessageAndUpdateUI=(value: { id: string; method: string; route?: string | undefined; metadata?: string | undefined; data?: string | undefined; }, payLoad:any)=>{
  const decodeMetadata= decodeCompositeMetadata(
    payLoad.metadata as Buffer
  )
  let metadata
  //@ts-ignore
  for(let {_content,_type} of decodeMetadata){
    if(_type.toString()==='application/json'){
      metadata=_content.toString()
    }
  }
  //添加消息流
  receiveAndUpdateUI(value,Object.assign({data:payLoad.data.toString(),metadata:metadata},{isSend:true,success:true}))
}


export const receiveAndUpdateUI = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }, response: any, _cancel?: Function) => {
  const currentItem = store.getState().requestSliceReducer.find((item) => value.id === item.id)
  let receive = currentItem?.receive as Array<any>
  response = Object.assign({date: new Date().toLocaleTimeString('chinese', {hour12: false}),isSend:false}, response)
  //新增消息
  receive = receive.length === 0 ? [...receive, response] : [response, ...receive]
  console.log({...value, receive})
  //如果当前currentItem切换了方法，则中断之前的请求
  if (currentItem?.method !== value.method) {
    _cancel&&_cancel()
    return
  }
  store.dispatch(updateRequestItem({...value, receive}))
  console.log(`message received`, JSON.stringify(response));
}

// @ts-ignore
export const sendMessageByMethod = (value: { id: string, method: string, route?: string, metadata?: string, data?: string }) => {

  switch (value.method) {
    case 'fireAndForget':
      fireAndForget(value)
      break;
    case 'requestResponse':
      requestResponse(value)
      break;
    case 'requestStream':
      requestStream(value)
      break;
    case 'requestChannel':
      requestChannel(value)
      break;
  }
}



