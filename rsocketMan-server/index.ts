const {RSocketServer, TEXT_PLAIN, CompositeMetadata, BufferEncoders, JsonSerializers} = require('rsocket-core');
const RSocketWebSocketServer = require('rsocket-websocket-server');
const {Single, Flowable} = require('rsocket-flowable');
const WebSocketTransport = RSocketWebSocketServer.default;
const {buildMessage, deSerializeMsg} = require('./lib/util');

const logger = require('./lib/logger');
const RandomNumberService = require('./lib/RandomNumberService');
const host = '127.0.0.1';
const port = 10081;

const transportOpts = {
  host: host,
  port: port,
};

//维护连接的状态
const statuses = {
  PENDING: "pending",
  CANCELLED: "cancelled"
};

//需要webSocket底层协议
const transport = new WebSocketTransport(transportOpts);

function getRequestHandler(requestingRSocket, setupPayload) {

  //当客户端连接时会收到设置的Payload
  logger.info('Client connected.', {setupPayload});

  //订阅连接状态的改变
  requestingRSocket.connectionStatus().subscribe((status) => {
    logger.info('Client connection status update: ', status);
  });

  //处理一次请求，没有响应
  function handleFireAndForget(payload) {
    console.log(`fireAndForget request`, payload);
  }

  //处理一次请求，返回一个响应
  function handleRequestResponse(payload) {
    let status = statuses.PENDING;

    console.log(`requestResponse request`, payload);

    return new Single((subscriber) => {

      /**
       * In the event that the client cancels the request before
       * the server can respond, we will change our status to cancelled
       * and avoid calling `onComplete` on the `subscriber` instance in the
       * `setTimeout` callback.
       */
      function handleCancellation() {
        status = statuses.CANCELLED;
      }

      subscriber.onSubscribe(() => handleCancellation());

      /**
       * Leverage `setTimeout` to simulate a delay
       * in responding to the client.
       */
      setTimeout(() => {

        /**
         * If the client cancelled the request we can
         * retrun early and avoid doing any of the work below.
         */
        if (status === statuses.CANCELLED) {
          return;
        }

        const msg = `${new Date()}`;
        console.log(`requestResponse response`, msg);
        try {
          subscriber.onComplete({
            data:JSON.stringify(msg),
            metadata: '123', // or new Buffer(...)
          });
        } catch (e) {
          subscriber.onError(e);
        }
      }, 100);


    });

    // return new Single((subscriber) => {
    //     console.log('message from client   ' + payload.data)
    //     subscriber.onSubscribe(() => {
    //     })
    //     subscriber.onComplete({
    //         data: 'from server handleRequestResponse11',
    //         metadata: '123123123'
    //     })
    // });
  }

  // function handleRequestStream(payload: { data: string; }) {
  //   console.log(payload)
  //   return new Flowable((subscriber) => {
  //     console.log(payload.data + '-----from client handleRequestStream')
  //     subscriber.onSubscribe({
  //       cancel() {
  //       },
  //       request(num) {
  //         console.log(num)
  //       }
  //     });
  //     subscriber.onNext({data: '231231231231', metadata: '123123'})
  //     subscriber.onComplete()
  //   })
  // }

  // return new Flowable((subscriber) => {
  //   console.log(payload.data + '-----from client handleRequestStream')
  //   subscriber.onSubscribe({
  //     cancel() {
  //     }, request(num) {
  //       console.log(num)
  //     }
  //   })
  //   subscriber.onNext({data: 'from server handleRequestStream',})
  //   subscriber.onNext({data: 'from server handleRequestStream'})
  //   subscriber.onNext({data: 'from server handleRequestStream'})
  //   subscriber.onNext({data: 'from server handleRequestStream'})
  //   subscriber.onComplete()
  // });

  // function handleRequestChannel(payload) {
  //   return new Flowable((subscriber) => {
  //     console.log(JSON.stringify(payload) + '-----from client handleRequestChannel')
  //     subscriber.onSubscribe({
  //       cancel() {
  //       }, request(num) {
  //         console.log(num)
  //       }
  //     })
  //
  //     subscriber.onNext({
  //       data: 'from server handleRequestChannel1'
  //     })
  //     subscriber.onNext({
  //       data: 'from server handleRequestChannel2'
  //     })
  //     subscriber.onComplete()
  //   });
  // }

  // function handleMetadataPush(payload) {
  //   return new Single((subscriber) => {
  //     console.log(payload + '-----from client handleRequestChannel')
  //
  //   });
  // }

  return {
    fireAndForget: handleFireAndForget,
    requestResponse: handleRequestResponse,
    // requestStream: handleRequestStream,
    // requestChannel: handleRequestChannel,
    // metadataPush: handleMetadataPush
  };
}


const rSocketServer = new RSocketServer({
  transport,
  getRequestHandler
});


console.log(`rSocketServer running at: ${host}:${port}`)
rSocketServer.start();
