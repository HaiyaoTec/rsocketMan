var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,s=(e,t)=>{for(var a in t||(t={}))i.call(t,a)&&n(e,a,t[a]);if(r)for(var a of r(t))o.call(t,a)&&n(e,a,t[a]);return e},c=(e,r)=>t(e,a(r));import{c as d,a as l,b as p,d as u,m,e as h,n as f,f as b,g,u as y,r as x,h as v,i as w,j as k,k as S,F as T,I as M,S as F,l as R,o as I,B as q,p as C,M as O,G as E,q as A,T as j,s as P,O as N,t as L,L as $,R as K,v as _,w as z,x as D,P as G,y as B}from"./vendor.7bda6dd4.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const U=d({name:"connection",initialState:{websocketURL:"",lifetime:0,rsocket:null,status:"CONNECTING",error:null,dataMimeType:"",KeepAlive:0,metadataMimeType:""},reducers:{configure:(e,t)=>s(s({},e),t.payload),updateRScoketInstance:(e,t)=>(e.rsocket=t.payload,e)}}),{configure:H,updateRScoketInstance:J}=U.actions;var V=U.reducer;const W=d({name:"requestSlice",initialState:[],reducers:{addRequestItem:(e,t)=>(e.unshift(t.payload),e),updateRequestItem:(e,t)=>e=e.map((e=>e.id===t.payload.id?s(s({},e),t.payload):e))}}),{addRequestItem:X,updateRequestItem:Y}=W.actions;const Q=p({reducer:l({connection:V,requestSliceReducer:W.reducer}),middleware:e=>e({serializableCheck:!1})}),Z=(e,t)=>{switch(t){case"application/json":e||(e="{}"),e=JSON.stringify(JSON.parse(e));break;case"text/plain":e||(e=""),"string"==typeof e&&(e=e.toString())}return u.Buffer.from(e)},ee=(e,t,a="")=>{switch(t){case"application/json":return e||(e="{}"),b.encodeCompositeMetadata([[b.APPLICATION_JSON,u.Buffer.from(JSON.stringify(JSON.parse(e)))],[b.MESSAGE_RSOCKET_ROUTING,b.encodeRoute(a)]]);case"text/plain":return e||(e=""),b.encodeCompositeMetadata([[b.TEXT_PLAIN,u.Buffer.from(e)],[b.MESSAGE_RSOCKET_ROUTING,b.encodeRoute(a)]])}};async function te(){return new Promise(((e,t)=>{var a;const r=Q.getState().connection,i={debug:!0,url:`${r.websocketURL}`,wsCreator:e=>new WebSocket(e)},o={keepAlive:`${r.KeepAlive}`,lifetime:`${r.lifetime}`,dataMimeType:`${r.dataMimeType}`,metadataMimeType:`${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ee(null==r?void 0:r.metadata,r.metadataMimeType),data:null!=(a=Z(null==r?void 0:r.data,r.dataMimeType))?a:""}},n=new g(i,b.BufferEncoders),s=new b.RSocketClient({setup:o,transport:n}).connect();setTimeout((()=>{t("连接超时")}),3e3),s.subscribe({onComplete:t=>{e(t)},onError:e=>{t("连接错误")}})}))}function ae(){return new Promise(((e,t)=>{var a;const r=Q.getState().connection,i={debug:!0,url:`${r.websocketURL}`,wsCreator:e=>new WebSocket(e)},o=u.Buffer.from(f()),n=new b.RSocketResumableTransport((()=>new g(i,b.BufferEncoders)),{bufferSize:128,resumeToken:o,sessionDurationSeconds:300},b.BufferEncoders),s={keepAlive:`${r.KeepAlive}`,lifetime:`${r.lifetime}`,dataMimeType:`${r.dataMimeType}`,metadataMimeType:`${b.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ee(null==r?void 0:r.metadata,r.metadataMimeType),data:null!=(a=Z(null==r?void 0:r.data,r.dataMimeType))?a:""}},c=new b.RSocketClient({setup:s,transport:n}).connect();setTimeout((()=>{t("连接超时")}),3e3),c.subscribe({onComplete:t=>{e(t)},onError:e=>{m.error("连接错误！！！"),t("连接错误")}})}))}const re=(e,t,a)=>{const r=Q.getState().requestSliceReducer.find((t=>e.id===t.id));let i=null==r?void 0:r.receive;t=Object.assign({date:(new Date).toLocaleTimeString("chinese",{hour12:!1})},t),i=0===i.length?[...i,t]:[t,...i],(null==r?void 0:r.method)===e.method?Q.dispatch(Y(c(s({},e),{receive:i}))):a()},ie=e=>{switch(e.method){case"fireAndForget":(e=>{const{metadataMimeType:t,dataMimeType:a}=Q.getState().connection,r={data:Z(e.data,a),metadata:ee(e.metadata,t,e.route)},i=Q.getState().connection.rsocket;i?i.fireAndForget(r):m.error("rsocket instance not init yet")})(e);break;case"requestResponse":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,i={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestResponse(i).subscribe({onComplete:t=>{var r;t=c(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:e=>{a=e}})}else m.error("rsocket instance not init yet")})(e);break;case"requestStream":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,i={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestStream(i).subscribe({onNext:t=>{var r;t=c(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onComplete:()=>{},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}})}else m.error("rsocket instance not init yet")})(e);break;case"requestChannel":(e=>{const t=Q.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:r}=Q.getState().connection,i={data:Z(e.data,r),metadata:ee(e.metadata,a,e.route)};if(t){let a;t.requestChannel(h.Flowable.just(i)).subscribe({onNext:t=>{var r;t=c(s({},t),{data:null==(r=t.data)?void 0:r.toString()}),t=Object.assign(t,{success:!0}),re(e,t,a)},onComplete:()=>{},onError:t=>{re(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}})}else m.error("rsocket instance not init yet")})(e)}},{TextArea:oe}=M,{Option:ne}=F,se={labelCol:{xs:{span:30},sm:{span:8}},wrapperCol:{xs:{span:30},sm:{span:14}}},ce={websocketURL:"ws://127.0.0.1:10081",KeepAlive:1e6,lifetime:1e6,dataMimeType:"text/plain",metadataMimeType:"text/plain",useResume:!1},de=({setIsModalVisible:e})=>{const[t]=y();x.exports.useState(0);v((e=>e));const a=w();return k(C,{children:S(T,c(s({form:t},se),{layout:"horizontal",onFinish:r=>{t.validateFields().then((async t=>{let r;a(H(t)),r=t.useResume?await ae():await te(),a(J(r)),m.success("connect success"),e(!1)})).catch((e=>{m.error(e)}))},initialValues:ce,children:[k(T.Item,{name:"websocketURL",required:!0,label:"Websocket URL",rules:[{required:!0,message:"Please input your Websocket URL"}],children:k(M,{placeholder:"eg:ws://127.0.0.1:8080"})}),k(T.Item,{name:"KeepAlive",required:!0,label:"KeepAlive",hasFeedback:!0,rules:[{required:!0,message:"Please set KeepAlive"}],children:k(M,{type:"number",placeholder:"eg:1000000"})}),k(T.Item,{name:"lifetime",required:!0,label:"lifetime",hasFeedback:!0,rules:[{required:!0,message:"Please set lifetime"}],children:k(M,{type:"number",placeholder:"eg:1000"})}),k(T.Item,{name:"metadataMimeType",label:"metadataMimeType",hasFeedback:!0,rules:[{required:!0,message:"Please select your Metadata type!"}],children:S(F,{placeholder:"Please select metadataMimeType",children:[k(ne,{value:"application/json",children:"application/json"}),k(ne,{value:"text/plain",children:"text/plain"})]})}),k(T.Item,{name:"metadata",label:"metadata",children:k(oe,{})}),k(T.Item,{name:"dataMimeType",label:"dataMimeType",hasFeedback:!0,rules:[{required:!0,message:"Please select  dataMimeType!"}],children:S(F,{placeholder:"Please select dataMimeType",children:[k(ne,{value:"application/json",children:"application/json"}),k(ne,{value:"text/plain",children:"text/plain"})]})}),k(T.Item,{name:"data",label:"data",children:k(oe,{})}),k(T.Item,{label:"resume",name:"useResume",valuePropName:"checked",children:k(R,{})}),S("footer",{css:I`
          display: flex;
          justify-content: space-around;
        `,children:[k(T.Item,{children:k(q,{type:"primary",onClick:()=>{t.validateFields().then((async e=>{a(H(e)),e.useResume?await ae():await te(),m.success("connect success ")})).catch((e=>{m.error("connection fail")}))},children:"test"})}),k(T.Item,{children:k(q,{type:"primary",htmlType:"submit",children:"connect"})}),k(T.Item,{children:k(q,{type:"primary",htmlType:"reset",children:"Reset"})})]})]}))})};const le=()=>{const[e,t]=x.exports.useState(!0);return k(C,{children:k(O,{title:"Configure connection",centered:!0,visible:e,closeIcon:!0,onOk:()=>{t(!1)},maskClosable:!1,keyboard:!1,footer:null,children:k(de,{setIsModalVisible:t})})})},pe=()=>S("div",{css:I`
          background-color: #393f44;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          padding: 0 55px;
          font-size: 36px;
          line-height: 60px;
          height: 60px;
          margin: 0;
        `,children:[k("span",{css:I`border-right: 1px solid #000000;padding-right: 10px`,children:"RSocketMan 🤖"}),S("span",{children:[k("span",{css:I`margin-right: 10px`,children:k(E,{href:"https://github.com/HaiyaoTec/rsocketMan/issues","data-color-scheme":"no-preference: dark; light: dark; dark: dark;","data-icon":"octicon-issue-opened","aria-label":"Issue HaiyaoTec/rsocketMan on GitHub",children:"Issue"})}),k(E,{href:"https://github.com/HaiyaoTec/rsocketMan","data-show-count":"true","aria-label":"Star HaiyaoTec/rsocketMan on GitHub",children:"Star"})]})]});const{Option:ue}=F,me={labelCol:{xs:{span:30},sm:{span:5}},wrapperCol:{xs:{span:30},sm:{span:14}}},he=()=>{const e=A(),{metadataMimeType:t,dataMimeType:a}=v((e=>e.connection)),[r,i]=x.exports.useState(null),o=e.requestID;let n=v((t=>t.requestSliceReducer.find((t=>t.id===e.requestID))));const d=null==n?void 0:n.receive;x.exports.useEffect((()=>{p.setFieldsValue(l),i(null)}),[null==n?void 0:n.method,null==n?void 0:n.id]);let l={method:null==n?void 0:n.method,route:null==n?void 0:n.route,metadata:null==n?void 0:n.metadata,data:null==n?void 0:n.data};const[p]=T.useForm();return k("div",{children:n&&S("div",{css:I`
            display: flex;
            height: 100%;
          `,children:[S("div",{css:I`
              display: flex;
              flex-direction: column;
              min-width: 700px;
              width: 50%;
            `,children:[k("div",{css:I`
                flex: 1;
                border: 1px solid #000000;
                border-top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #262b30;
              `,children:S(T,c(s({},me),{layout:"horizontal",form:p,onFinish:e=>{e.method!==(null==n?void 0:n.method)?Q.dispatch(Y(c(s({},e),{id:o,receive:[]}))):Q.dispatch(Y(c(s({},e),{id:o}))),ie(c(s({},e),{id:o})),m.success("message send ")},children:[k(T.Item,{name:"method",label:"Method",css:I`font-weight: bold;`,hasFeedback:!0,rules:[{required:!0,message:"Please select your method!"}],children:S(F,{placeholder:"Please select method",children:[k(ue,{value:"fireAndForget",children:"fireAndForget"}),k(ue,{value:"requestResponse",children:"requestResponse"}),k(ue,{value:"requestStream",children:"requestStream"}),k(ue,{value:"requestChannel",children:"requestChannel"})]})}),k(T.Item,{name:"route",required:!1,label:"Route",css:I`font-weight: bold;`,children:k(M,{placeholder:"eg: xxx/xxx"})}),k(T.Item,{name:"metadata",label:"Metadata",css:I`font-weight: bold;`,children:k(j,{})}),k(T.Item,{name:"data",label:"Data",css:I`font-weight: bold;`,children:k(j,{})}),k(T.Item,{label:"Submit",css:I`font-weight: bold;`,children:k(q,{type:"primary",htmlType:"submit",css:I`
                      width: 100px;
                      font-weight: bold;
                      background-color: #4ac2dd;
                    `,children:"Send"})})]}))}),S("div",{css:I`
                background-color: #252b30;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `,children:[k("h2",{css:I`
                  margin-left: 30px;
                  font-weight: bold;
                  color: #ffffff;
                `,children:"Receive"}),k("div",{css:I`display: flex;
                flex-direction: column;
                align-items: center`,children:null==d?void 0:d.map(((e,t)=>S("div",{css:I`
                        width: 600px;
                        background-color: #31383e;
                        margin-bottom: 15px;

                        &:hover {
                          background-color: #1b1e21
                        }

                        border: 2px solid #ccc;
                      `,children:[S("div",{css:I`
                          display: flex;
                          justify-content: space-between;
                          padding: 10px 16px;
                        `,children:[S("span",{children:[S("span",{css:I`
                              margin-right: 6px;
                              font-weight: bold;
                              color: #ffffff;
                            `,children:["#",d.length-t]}),(null==e?void 0:e.success)?k("span",{css:I`
                              color: #71cf40;
                              font-weight: bold;
                            `,children:"OK"}):k("span",{css:I`
                              color: red;
                              font-weight: bold;
                            `,children:"Error"})]}),k("span",{css:I`font-weight: bold;
                          color: #ffffff`,children:e.date})]}),S("div",{css:I`
                          display: flex;
                          justify-content: space-between;
                          padding: 16px;
                          font-weight: bold;
                          align-items: center;
                        `,children:[k("span",{css:I`
                            width: 70%;
                            overflow: hidden;
                            color: #ffffff;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          `,children:JSON.stringify({data:null==e?void 0:e.data,metadata:null==e?void 0:e.metadata})}),k("span",{css:I`
                            display: inline-block;
                            background-color: #45c0dc;
                            padding: 3px;
                            border-radius: 6px;
                            color: #ffffff;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 16px;
                          `,onClick:()=>{i(e)},children:"View All"})]})]},t)))})]})]}),r&&k("div",{css:I`
                background-color: #272b30;
                flex: 1;
                padding: 16px;
                min-width: 500px;
              `,children:S("div",{css:I`position: sticky;
                top: 0`,children:[k("div",{css:I`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `,children:"Data"}),k("pre",{css:I`
                    width: 100%;
                    min-height: 300px;
                    max-height: 500px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    white-space: break-spaces;
                    font-weight: bold;
                  `,children:(e=>{try{return P.format(e,{parser:"babel",plugins:[N]})}catch(t){return e}})(null==r?void 0:r.data)}),k("br",{}),k("div",{css:I`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `,children:"Metadata"}),k("div",{css:I`
                    width: 100%;
                    height: 200px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    font-weight: bold;
                  `,children:null==r?void 0:r.metadata})]})})]})},null==n?void 0:n.id)},fe=({info:e})=>{w();let t=L();return k("div",{css:I`& > :hover {
      background-color: #1c1e22
    }`,children:S("div",{css:I`
            width: 100%;
            height: 150px;
            background-color: #31383e;
            padding: 16px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            margin-top: -2px;
            cursor: pointer;
          `,onClick:()=>{t(`/${e.id}`)},children:[S("div",{css:I`display: flex;
          justify-content: space-between`,children:[k("span",{css:I`padding: 5px;
            background-color: #0994fb;
            color: #FFFFFF;
            border-radius: 6px`,children:e.method}),k("span",{css:I`padding: 5px 20px;
            background-color: #20d230;
            color: #FFFFFF;
            border-radius: 6px`,children:e.receive.length})]}),k("div",{css:I`
          padding: 10px 0;
          color: #FFFFFF;
          font-size: 20px`,children:k("span",{children:e.route})}),S("div",{css:I`padding: 10px 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between`,children:[k("span",{css:I`max-width: 70%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`,children:e.data}),k("span",{css:I` color: #2e5bf9;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              `,onClick:t=>{t.preventDefault(),t.stopPropagation(),Q.dispatch(X(c(s({},e),{id:f(),receive:[]})))},children:"COPY"})]})]})})},{Footer:be,Sider:ge,Content:ye}=$;function xe(){x.exports.useState(0);const e=v((e=>e.requestSliceReducer));return x.exports.useEffect((()=>{}),[]),S("div",{css:I`height: 100%;`,children:[k(le,{}),S($,{css:I`height: 100%;`,children:[k(pe,{}),S($,{children:[S(ge,{css:I`
                border: 1px solid #000000;
                overflow: auto;
                &::-webkit-scrollbar {
                  display: none
                }
                background-color: #272b30;
                min-width: 305px !important;
                padding: 0 !important;
              `,children:[k("div",{css:I`
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
            `,onClick:()=>{Q.dispatch(X({id:`${f()}`,metadata:"",route:"/xxx/xxx",data:"",receive:[],method:"fireAndForget"}))},children:S("div",{css:I`& > svg {
                width: 10px;
                height: 10px;
                background-color: red;
              }`,children:[k("img",{src:"/assets/add.b7ae3521.svg",css:I`width: 30px;
                  margin-right: 10px`}),"Add Request"]})}),e.map(((e,t)=>k(fe,{info:e},t)))]}),k(ye,{css:I`
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            background-color: #272b30;
            overflow: auto`,children:k(K,{children:k(_,{path:":requestID",element:k(he,{})})})})]})]})]})}m.config({duration:2,maxCount:3,rtl:!0}),z.render(D(G,{store:Q,children:D(B,{children:D(xe,{})})}),document.getElementById("root"));
