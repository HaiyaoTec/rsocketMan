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
import {store} from "../store/store";
import {useSelector} from "react-redux";
import {addFireAndForgetItem} from "../store/slice/FireAndForgetSlice";
import {updateDataDisplay} from "../store/slice/DataDisplaySlice";
import {Payload} from "rsocket-types";

type type = 'application/json' | 'text/plain' | any

//TODO 需要修改
export const transformData = (data: unknown, type: type) => {
  if (!data) return data
  switch (type) {
    case 'application/json':
      console.log('jsonParse')
      data = JSON.stringify(JSON.parse(data as string))
      console.log(data)
      break;
    case 'text/plain':
      if (typeof data === 'string') {
        data = data.toString()
      }
      break;
    default :
  }
  return data
}


/**
 * 创建 rsocket client instance的方法
 * @param options
 */
export async function createRSocketClient() {


  //获取配置信息
  const configuration = store.getState().connection

  const transportOptions = {
    url: `ws://${configuration.host}:${configuration.port}`,

    wsCreator: (url: string | URL) => {
      return new WebSocket(url);
    }
  };
  // const route = 'page/abc'

  const setupOptions = {
    keepAlive: `${configuration.KeepAlive}`,
    lifetime: `${configuration.lifetime}`,
    dataMimeType: `${configuration.dataMimeType}`,
    metadataMimeType: `${configuration.metadataMimeType}`
    ,
    payload: {
      metadata: `${transformData(configuration.metadata, configuration.metadataMimeType)}`,
      data: `${transformData(configuration.data, configuration.dataMimeType)}`
    }
  };

  const transport = new RSocketWebsocketClient(transportOptions);
  // @ts-ignore
  const client = new RSocketClient({setup: setupOptions, transport});
  return client.connect();
}


export const fireAndForget = (value: any) => {

  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    metadata: transformData(value.metadata, metadataMimeType)
  }
  console.log(value)
  console.log(payLoad)
  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  if (!rsocket) {
    console.log('rsocket instance not init yet ')
  } else {
    rsocket.fireAndForget(payLoad as Payload<string, string>)
  }
  store.dispatch(addFireAndForgetItem(value))

  store.dispatch(updateDataDisplay(value))
}

export const requestResponse = (value: any) => {

  //获取rsocket实例
  const rsocket = store.getState().connection.rsocket

  const {metadataMimeType, dataMimeType} = store.getState().connection
  const payLoad = {
    data: transformData(value.data, dataMimeType),
    metadata: transformData(value.metadata, metadataMimeType)
  }
  if (!rsocket) {
    console.log('rsocket instance not init yet ')
  } else {
    rsocket.requestResponse(payLoad as Payload<string, string>)
      .subscribe({
        onComplete: (response) => {
          console.log(`requestResponse response`, response);
          //返回数据更新redux
        },
        onError: (error) => {
          console.error(error);
        },
        onSubscribe: (_cancel) => {
        },
      });
  }
}

// @ts-ignore
export const sendMessageByMethod = (value) => {
  
  switch (value.method) {
    case 'fireAndForget':
      fireAndForget(value)
      break;
    case 'requestResponse':
      requestResponse(value)
      break;
  }
}



