var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,n=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,t)=>{for(var a in t||(t={}))o.call(t,a)&&n(e,a,t[a]);if(r)for(var a of r(t))i.call(t,a)&&n(e,a,t[a]);return e},d=(e,r)=>t(e,a(r));import{c as l,a as c,b as p,d as u,m as h,e as m,n as f,f as b,g,u as y,r as x,h as v,i as w,j as k,k as S,F as T,I as M,S as F,l as I,o as q,B as C,p as O,M as R,G as E,q as A,T as j,s as P,O as N,t as $,L as K,R as H,v as _,w as z,x as D,P as G,y as B}from"./vendor.7bda6dd4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const L=l({name:"connection",initialState:{host:"",port:0,lifetime:0,rsocket:null,status:"CONNECTING",error:null,dataMimeType:"",KeepAlive:0,metadataMimeType:""},reducers:{configure:(e,t)=>{var a,r;const o=null==(a=t.payload.websocketHost)?void 0:a.split(":")[0],i=Number(null==(r=t.payload.websocketHost)?void 0:r.split(":")[1]);return d(s(s({},e),t.payload),{host:o,port:i})},updateRScoketInstance:(e,t)=>(e.rsocket=t.payload,e)}}),{configure:J,updateRScoketInstance:V}=L.actions;var W=L.reducer;const U=l({name:"requestSlice",initialState:[],reducers:{addRequestItem:(e,t)=>(e.unshift(t.payload),e),updateRequestItem:(e,t)=>e=e.map((e=>e.id===t.payload.id?s(s({},e),t.payload):e))}}),{addRequestItem:X,updateRequestItem:Y}=U.actions;const Q=p({reducer:c({connection:W,requestSliceReducer:U.reducer}),middleware:e=>e({serializableCheck:!1})}),Z=(e,t)=>{switch(t){case"application/json":e||(e="{}"),e=JSON.stringify(JSON.parse(e));break;case"text/plain":e||(e=""),"string"==typeof e&&(e=e.toString())}return u.Buffer.from(e)},ee=(e,t,a="")=>{switch(t){case"application/json":return e||(e="{}"),b.encodeCompositeMetadata([[b.APPLICATION_JSON,u.Buffer.from(JSON.stringify(JSON.parse(e)))],[b.MESSAGE_RSOCKET_ROUTING,b.encodeRoute(a)]]);case"text/plain":return e||(e=""),b.encodeCompositeMetadata([[b.TEXT_PLAIN,u.Buffer.from(e)],[b.MESSAGE_RSOCKET_ROUTING,b.encodeRoute(a)]])}};async function te(){return new Promise(((e,t)=>{var a;const r=Q.getState().connection,o={debug:!0,url:`ws://${r.host}:${r.port}`,wsCreator:e=>new WebSocket(e)},i={keepAlive:`${r.KeepAlive}`,lifetime:`${r.lifetime}`,dataMimeType:`${r.dataMimeType}`,metadataMimeType:`${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ee(null==r?void 0:r.metadata,r.metadataMimeType),data:null!=(a=Z(null==r?void 0:r.data,r.dataMimeType))?a:""}},n=new g(o,b.BufferEncoders),s=new b.RSocketClient({setup:i,transport:n}).connect();setTimeout((()=>{t("连接超时")}),3e3),s.subscribe({onComplete:t=>{e(t)},onError:e=>{t("连接错误")}})}))}function ae(){return new Promise(((e,t)=>{var a;const r=Q.getState().connection,o={debug:!0,url:`ws://${r.host}:${r.port}`,wsCreator:e=>new WebSocket(e)},i=u.Buffer.from(f()),n=new b.RSocketResumableTransport((()=>new g(o,b.BufferEncoders)),{bufferSize:128,resumeToken:i,sessionDurationSeconds:300},b.BufferEncoders),s={keepAlive:`${r.KeepAlive}`,lifetime:`${r.lifetime}`,dataMimeType:`${r.dataMimeType}`,metadataMimeType:`${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ee(null==r?void 0:r.metadata,r.metadataMimeType),data:null!=(a=Z(null==r?void 0:r.data,r.dataMimeType))?a:""}},d=new b.RSocketClient({setup:s,transport:n}).connect();setTimeout((()=>{t("连接超时")}),3e3),d.subscribe({onComplete:t=>{e(t)},onError:e=>{h.error("连接错误！！！"),t("连接错误")}})}))}const re=(e,t,a)=>{const r=Q.getState().requestSliceReducer.find((t=>e.id===t.id));let o=null==r?void 0:r.receive;t=Object.assign({date:(new Date).toLocaleTimeString("chinese",{hour12:!1})},t),o=0===o.length?[...o,t]:[t,...o],(null==r?void 0:r.method)===e.method?Q.dispatch(Y(d(s({},e),{receive:o}))):a()},oe=e=>{switch(e.method){case"fireAndForget":(e=>{const{metadataMimeType:t,dataMimeType:a}=Q.getState().connection,r={data:Z(e.data,a),metadata:ee(e.metadata,t,e.route)},o=Q.getState().connection.rsocket;o?o.fireAndForget(r):h.error("rsocket instance not init yet")})(e);break;case"requestResponse":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,o={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestResponse(o).subscribe({onComplete:t=>{var r;t=d(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:e=>{a=e}})}else h.error("rsocket instance not init yet")})(e);break;case"requestStream":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,o={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestStream(o).subscribe({onNext:t=>{var r;t=d(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onComplete:()=>{},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}})}else h.error("rsocket instance not init yet")})(e);break;case"requestChannel":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,o={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestChannel(m.Flowable.just(o)).subscribe({onNext:t=>{var r;t=d(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onComplete:()=>{},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}})}else h.error("rsocket instance not init yet")})(e)}},{TextArea:ie}=M,{Option:ne}=F,se={labelCol:{xs:{span:30},sm:{span:8}},wrapperCol:{xs:{span:30},sm:{span:14}}},de={websocketHost:"127.0.0.1:10081",KeepAlive:1e6,lifetime:1e6,dataMimeType:"text/plain",metadataMimeType:"text/plain",useResume:!1},le=({setIsModalVisible:e})=>{const[t]=y();x.exports.useState(0);v((e=>e));const a=w();return k(O,{children:S(T,d(s({form:t},se),{layout:"horizontal",onFinish:r=>{t.validateFields().then((async t=>{let r;a(J(t)),r=t.useResume?await ae():await te(),a(V(r)),h.success("connect success"),e(!1)})).catch((e=>{h.error(e)}))},initialValues:de,children:[k(T.Item,{name:"websocketHost",required:!0,label:"Websocket Host",rules:[{required:!0,message:"Please input your Websocket Host"}],children:k(M,{placeholder:"eg:127.0.0.1:8080"})}),k(T.Item,{name:"KeepAlive",required:!0,label:"KeepAlive",hasFeedback:!0,rules:[{required:!0,message:"Please set KeepAlive"}],children:k(M,{type:"number",placeholder:"eg:1000000"})}),k(T.Item,{name:"lifetime",required:!0,label:"lifetime",hasFeedback:!0,rules:[{required:!0,message:"Please set lifetime"}],children:k(M,{type:"number",placeholder:"eg:1000"})}),k(T.Item,{name:"metadataMimeType",label:"metadataMimeType",hasFeedback:!0,rules:[{required:!0,message:"Please select your Metadata type!"}],children:S(F,{placeholder:"Please select metadataMimeType",children:[k(ne,{value:"application/json",children:"application/json"}),k(ne,{value:"text/plain",children:"text/plain"})]})}),k(T.Item,{name:"metadata",label:"metadata",children:k(ie,{})}),k(T.Item,{name:"dataMimeType",label:"dataMimeType",hasFeedback:!0,rules:[{required:!0,message:"Please select  dataMimeType!"}],children:S(F,{placeholder:"Please select dataMimeType",children:[k(ne,{value:"application/json",children:"application/json"}),k(ne,{value:"text/plain",children:"text/plain"})]})}),k(T.Item,{name:"data",label:"data",children:k(ie,{})}),k(T.Item,{label:"resume",name:"useResume",valuePropName:"checked",children:k(I,{})}),S("footer",{css:q`
          display: flex;
          justify-content: space-around;
        `,children:[k(T.Item,{children:k(C,{type:"primary",onClick:()=>{t.validateFields().then((async e=>{a(J(e)),e.useResume?await ae():await te(),h.success("connect success ")})).catch((e=>{h.error("connection fail")}))},children:"test"})}),k(T.Item,{children:k(C,{type:"primary",htmlType:"submit",children:"connect"})}),k(T.Item,{children:k(C,{type:"primary",htmlType:"reset",children:"Reset"})})]})]}))})};const ce=()=>{const[e,t]=x.exports.useState(!0);return k(O,{children:k(R,{title:"Configure connection",centered:!0,visible:e,closeIcon:!0,onOk:()=>{t(!1)},maskClosable:!1,keyboard:!1,footer:null,children:k(le,{setIsModalVisible:t})})})},pe=()=>S("div",{css:q`
          background-color: #393f44;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          padding: 0 55px;
          font-size: 36px;
          line-height: 60px;
          height: 60px;
          margin: 0;
        `,children:[k("span",{css:q`border-right: 1px solid #000000;padding-right: 10px`,children:"RSocketMan 🤖"}),S("span",{children:[k("span",{css:q`margin-right: 10px`,children:k(E,{href:"https://github.com/HaiyaoTec/rsocketMan/issues","data-color-scheme":"no-preference: dark; light: dark; dark: dark;","data-icon":"octicon-issue-opened","aria-label":"Issue HaiyaoTec/rsocketMan on GitHub",children:"Issue"})}),k(E,{href:"https://github.com/HaiyaoTec/rsocketMan","data-show-count":"true","aria-label":"Star HaiyaoTec/rsocketMan on GitHub",children:"Star"})]})]});const{Option:ue}=F,he={labelCol:{xs:{span:30},sm:{span:5}},wrapperCol:{xs:{span:30},sm:{span:14}}},me=()=>{const e=A(),{metadataMimeType:t,dataMimeType:a}=v((e=>e.connection)),[r,o]=x.exports.useState(null),i=e.requestID;let n=v((t=>t.requestSliceReducer.find((t=>t.id===e.requestID))));const l=null==n?void 0:n.receive;x.exports.useEffect((()=>{p.setFieldsValue(c),o(null)}),[null==n?void 0:n.method,null==n?void 0:n.id]);let c={method:null==n?void 0:n.method,route:null==n?void 0:n.route,metadata:null==n?void 0:n.metadata,data:null==n?void 0:n.data};const[p]=T.useForm();return k("div",{children:n&&S("div",{css:q`
            display: flex;
            height: 100%;
          `,children:[S("div",{css:q`
              display: flex;
              flex-direction: column;
              min-width: 700px;
              width: 50%;
            `,children:[k("div",{css:q`
                flex: 1;
                border: 1px solid #000000;
                border-top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #262b30;
              `,children:S(T,d(s({},he),{layout:"horizontal",form:p,onFinish:e=>{e.method!==(null==n?void 0:n.method)?Q.dispatch(Y(d(s({},e),{id:i,receive:[]}))):Q.dispatch(Y(d(s({},e),{id:i}))),oe(d(s({},e),{id:i})),h.success("message send ")},children:[k(T.Item,{name:"method",label:"Method",css:q`font-weight: bold;`,hasFeedback:!0,rules:[{required:!0,message:"Please select your method!"}],children:S(F,{placeholder:"Please select method",children:[k(ue,{value:"fireAndForget",children:"fireAndForget"}),k(ue,{value:"requestResponse",children:"requestResponse"}),k(ue,{value:"requestStream",children:"requestStream"}),k(ue,{value:"requestChannel",children:"requestChannel"})]})}),k(T.Item,{name:"route",required:!1,label:"Route",css:q`font-weight: bold;`,children:k(M,{placeholder:"eg: xxx/xxx"})}),k(T.Item,{name:"metadata",label:"Metadata",css:q`font-weight: bold;`,children:k(j,{})}),k(T.Item,{name:"data",label:"Data",css:q`font-weight: bold;`,children:k(j,{})}),k(T.Item,{label:"Submit",css:q`font-weight: bold;`,children:k(C,{type:"primary",htmlType:"submit",css:q`
                      width: 100px;
                      font-weight: bold;
                      background-color: #4ac2dd;
                    `,children:"Send"})})]}))}),S("div",{css:q`
                background-color: #252b30;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `,children:[k("h2",{css:q`
                  margin-left: 30px;
                  font-weight: bold;
                  color: #ffffff;
                `,children:"Receive"}),k("div",{css:q`display: flex;
                flex-direction: column;
                align-items: center`,children:null==l?void 0:l.map(((e,t)=>S("div",{css:q`
                        width: 600px;
                        background-color: #31383e;
                        margin-bottom: 15px;

                        &:hover {
                          background-color: #1b1e21
                        }

                        border: 2px solid #ccc;
                      `,children:[S("div",{css:q`
                          display: flex;
                          justify-content: space-between;
                          padding: 10px 16px;
                        `,children:[S("span",{children:[S("span",{css:q`
                              margin-right: 6px;
                              font-weight: bold;
                              color: #ffffff;
                            `,children:["#",l.length-t]}),(null==e?void 0:e.success)?k("span",{css:q`
                              color: #71cf40;
                              font-weight: bold;
                            `,children:"OK"}):k("span",{css:q`
                              color: red;
                              font-weight: bold;
                            `,children:"Error"})]}),k("span",{css:q`font-weight: bold;
                          color: #ffffff`,children:e.date})]}),S("div",{css:q`
                          display: flex;
                          justify-content: space-between;
                          padding: 16px;
                          font-weight: bold;
                          align-items: center;
                        `,children:[k("span",{css:q`
                            width: 70%;
                            overflow: hidden;
                            color: #ffffff;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          `,children:JSON.stringify({data:null==e?void 0:e.data,metadata:null==e?void 0:e.metadata})}),k("span",{css:q`
                            display: inline-block;
                            background-color: #45c0dc;
                            padding: 3px;
                            border-radius: 6px;
                            color: #ffffff;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 16px;
                          `,onClick:()=>{o(e)},children:"View All"})]})]},t)))})]})]}),r&&k("div",{css:q`
                background-color: #272b30;
                flex: 1;
                padding: 16px;
                min-width: 500px;
              `,children:S("div",{css:q`position: sticky;
                top: 0`,children:[k("div",{css:q`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `,children:"Data"}),k("pre",{css:q`
                    width: 100%;
                    min-height: 300px;
                    max-height: 500px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    white-space: break-spaces;
                    font-weight: bold;
                  `,children:(e=>{try{return P.format(e,{parser:"babel",plugins:[N]})}catch(t){return e}})(null==r?void 0:r.data)}),k("br",{}),k("div",{css:q`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `,children:"Metadata"}),k("div",{css:q`
                    width: 100%;
                    height: 200px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    font-weight: bold;
                  `,children:null==r?void 0:r.metadata})]})})]})},null==n?void 0:n.id)},fe=({info:e})=>{w();let t=$();return k("div",{css:q`& > :hover {
      background-color: #1c1e22
    }`,children:S("div",{css:q`
            width: 100%;
            height: 150px;
            background-color: #31383e;
            padding: 16px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            margin-top: -2px;
            cursor: pointer;
          `,onClick:()=>{t(`/${e.id}`)},children:[S("div",{css:q`display: flex;
          justify-content: space-between`,children:[k("span",{css:q`padding: 5px;
            background-color: #0994fb;
            color: #FFFFFF;
            border-radius: 6px`,children:e.method}),k("span",{css:q`padding: 5px 20px;
            background-color: #20d230;
            color: #FFFFFF;
            border-radius: 6px`,children:e.receive.length})]}),k("div",{css:q`
          padding: 10px 0;
          color: #FFFFFF;
          font-size: 20px`,children:k("span",{children:e.route})}),S("div",{css:q`padding: 10px 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between`,children:[k("span",{css:q`max-width: 70%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`,children:e.data}),k("span",{css:q` color: #2e5bf9;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              `,onClick:t=>{t.preventDefault(),t.stopPropagation(),Q.dispatch(X(d(s({},e),{id:f(),receive:[]})))},children:"COPY"})]})]})})},{Footer:be,Sider:ge,Content:ye}=K;function xe(){x.exports.useState(0);const e=v((e=>e.requestSliceReducer));return x.exports.useEffect((()=>{}),[]),S("div",{css:q`height: 100%;`,children:[k(ce,{}),S(K,{css:q`height: 100%;`,children:[k(pe,{}),S(K,{children:[S(ge,{css:q`
                border: 1px solid #000000;
                overflow: auto;
                &::-webkit-scrollbar {
                  display: none
                }
                background-color: #272b30;
                min-width: 305px !important;
                padding: 0 !important;
              `,children:[k("div",{css:q`
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
            `,onClick:()=>{Q.dispatch(X({id:`${f()}`,metadata:"",route:"/xxx/xxx",data:"",receive:[],method:"fireAndForget"}))},children:S("div",{css:q`& > svg {
                width: 10px;
                height: 10px;
                background-color: red;
              }`,children:[k("img",{src:"/assets/add.b7ae3521.svg",css:q`width: 30px;
                  margin-right: 10px`}),"Add Request"]})}),e.map(((e,t)=>k(fe,{info:e},t)))]}),k(ye,{css:q`
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            background-color: #272b30;
            overflow: auto`,children:k(H,{children:k(_,{path:":requestID",element:k(me,{})})})})]})]})]})}h.config({duration:2,maxCount:3,rtl:!0}),z.render(D(G,{store:Q,children:D(B,{children:D(xe,{})})}),document.getElementById("root"));
