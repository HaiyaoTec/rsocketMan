var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,r=(t,a,i)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i,o=(e,t)=>{for(var a in t||(t={}))s.call(t,a)&&r(e,a,t[a]);if(i)for(var a of i(t))n.call(t,a)&&r(e,a,t[a]);return e},l=(e,i)=>t(e,a(i));import{c,a as d,b as p,d as u,m,e as h,f,n as g,g as x,u as b,j as y,R as A,h as v,i as w,r as k,k as S,l as F,o as I,p as C,q as T,F as M,I as R,S as E,s as P,C as O,t as N,v as q,B as j,w as B,M as K,G as U,x as D,O as z,y as L,z as X,L as G,A as J,D as Y,E as V,P as $,H as _}from"./vendor.762af02f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const Q=c({name:"connection",initialState:{websocketURL:"",lifetime:0,rsocket:null,status:"CONNECTING",error:null,dataMimeType:"",KeepAlive:0,metadataMimeType:"",sessionDuration:0,token:""},reducers:{configure:(e,t)=>o(o({},e),t.payload),updateRScoketInstance:(e,t)=>(e.rsocket=t.payload,e)}}),{configure:H,updateRScoketInstance:W}=Q.actions;var Z=Q.reducer;const ee=c({name:"requestSlice",initialState:[],reducers:{addRequestItem:(e,t)=>(e.unshift(t.payload),e),updateRequestItem:(e,t)=>e=e.map((e=>e.id===t.payload.id?o(o({},e),t.payload):e))}}),{addRequestItem:te,updateRequestItem:ae}=ee.actions;const ie=p({reducer:d({connection:Z,requestSliceReducer:ee.reducer}),middleware:e=>e({serializableCheck:!1})}),se=(e,t)=>{switch(t){case"application/json":e||(e="{}");try{e=JSON.stringify(JSON.parse(e))}catch(a){}break;case"text/plain":e||(e=""),"string"==typeof e&&(e=e.toString())}return u.Buffer.from(e)},ne=(e,t,a="")=>{switch(t){case"application/json":e||(e="{}");try{e=JSON.stringify(JSON.parse(e))}catch(i){}return f.encodeCompositeMetadata([[f.APPLICATION_JSON,u.Buffer.from(e)],[f.MESSAGE_RSOCKET_ROUTING,f.encodeRoute(a)]]);case"text/plain":return e||(e=""),f.encodeCompositeMetadata([[f.TEXT_PLAIN,u.Buffer.from(e)],[f.MESSAGE_RSOCKET_ROUTING,f.encodeRoute(a)]])}};async function re(){return new Promise(((e,t)=>{var a;const i=ie.getState().connection,s={debug:!0,url:`${i.websocketURL}`,wsCreator:e=>new WebSocket(e)},n={keepAlive:`${i.KeepAlive}`,lifetime:`${i.lifetime}`,dataMimeType:`${i.dataMimeType}`,metadataMimeType:`${f.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ne(null==i?void 0:i.metadata,i.metadataMimeType),data:null!=(a=se(null==i?void 0:i.data,i.dataMimeType))?a:""}},r=new x(s,f.BufferEncoders),o=new f.RSocketClient({setup:n,transport:r}).connect();setTimeout((()=>{t("连接超时")}),3e3),o.subscribe({onComplete:t=>{e(t)},onError:e=>{t("连接错误")}})}))}function oe(){return new Promise(((e,t)=>{var a;const i=ie.getState().connection,s={debug:!0,url:`${i.websocketURL}`,wsCreator:e=>new WebSocket(e)},n=u.Buffer.from(g()),r=new f.RSocketResumableTransport((()=>new x(s,f.BufferEncoders)),{bufferSize:128,resumeToken:n,sessionDurationSeconds:300},f.BufferEncoders),o={keepAlive:`${i.KeepAlive}`,lifetime:`${i.lifetime}`,dataMimeType:`${i.dataMimeType}`,metadataMimeType:`${f.MESSAGE_RSOCKET_COMPOSITE_METADATA.string}`,payload:{metadata:ne(null==i?void 0:i.metadata,i.metadataMimeType),data:null!=(a=se(null==i?void 0:i.data,i.dataMimeType))?a:""}},l=new f.RSocketClient({setup:o,transport:r}).connect();setTimeout((()=>{t("连接超时")}),3e3),l.subscribe({onComplete:t=>{e(t)},onError:e=>{m.error("连接错误！！！"),t("连接错误")}})}))}const le=(e,t)=>{const a=f.decodeCompositeMetadata(t.metadata);let i;for(let{_content:s,_type:n}of a)"application/json"===n.toString()&&(i=s.toString());ce(e,Object.assign({data:t.data.toString(),metadata:i},{isSend:!0,success:!0}))},ce=(e,t,a)=>{const i=ie.getState().requestSliceReducer.find((t=>e.id===t.id));let s=null==i?void 0:i.receive;t=Object.assign({date:(new Date).toLocaleTimeString("chinese",{hour12:!1}),isSend:!1},t),s=0===s.length?[...s,t]:[t,...s],(null==i?void 0:i.method)===e.method?ie.dispatch(ae(l(o({},e),{receive:s}))):a&&a()},de=e=>{switch(e.method){case"fireAndForget":(e=>{const{metadataMimeType:t,dataMimeType:a}=ie.getState().connection,i={data:se(e.data,a),metadata:ne(e.metadata,t,e.route)},s=ie.getState().connection.rsocket;s?(s.fireAndForget(i),le(e,i)):m.error("rsocket instance not init yet")})(e);break;case"requestResponse":(e=>{const t=ie.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:i}=ie.getState().connection,s={data:se(e.data,i),metadata:ne(e.metadata,a,e.route)};if(t){let a;t.requestResponse(s).subscribe({onComplete:t=>{var i;t=l(o({},t),{data:null==(i=t.data)?void 0:i.toString()}),t=Object.assign(t,{success:!0}),ce(e,t,a)},onError:t=>{ce(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:e=>{a=e}}),le(e,s)}else m.error("rsocket instance not init yet")})(e);break;case"requestStream":(e=>{const t=ie.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:i}=ie.getState().connection,s={data:se(e.data,i),metadata:ne(e.metadata,a,e.route)};if(t){let a;t.requestStream(s).subscribe({onNext:t=>{var i;t=l(o({},t),{data:null==(i=t.data)?void 0:i.toString()}),t=Object.assign(t,{success:!0}),ce(e,t,a)},onComplete:()=>{},onError:t=>{ce(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}}),le(e,s)}else m.error("rsocket instance not init yet")})(e);break;case"requestChannel":(e=>{const t=ie.getState().connection.rsocket,{metadataMimeType:a,dataMimeType:i}=ie.getState().connection,s={data:se(e.data,i),metadata:ne(e.metadata,a,e.route)};if(t){let a;t.requestChannel(h.Flowable.just(s)).subscribe({onNext:t=>{var i;t=l(o({},t),{data:null==(i=t.data)?void 0:i.toString()}),t=Object.assign(t,{success:!0}),ce(e,t,a)},onComplete:()=>{},onError:t=>{ce(e,{success:!1,data:`${t}`,metadata:""},a)},onSubscribe:({cancel:e,request:t})=>{a=e,t(12)}}),le(e,s)}else m.error("rsocket instance not init yet")})(e)}};var pe="/assets/drop-down-arrow.46535627.svg";function ue({formRef:e,field:t}){const{run:a}=b((a=>new Promise((i=>{const s=e.getFieldsValue();try{s[t]=JSON.stringify(JSON.parse(a))}catch(n){s[t]=a}e.setFieldsValue(s),i("success")}))),{debounceWait:1e3,manual:!0});return y(A,{className:"custom-codemirror",theme:"dark",value:"",height:"100px",extensions:[v()],onChange:(e,t)=>{a(e)}})}const{Panel:me}=O,{Option:he}=E,fe={labelCol:{xs:{span:32},sm:{span:10}},wrapperCol:{xs:{span:32},sm:{span:14}}},ge={websocketURL:"ws://127.0.0.1:10081",KeepAlive:1e6,lifetime:1e6,dataMimeType:"application/json",metadataMimeType:"application/json",useResume:!1,sessionDuration:6e3,token:`${g()}`},xe=({setIsModalVisible:e})=>{const[t]=w();k.exports.useState(0);const a=S(),i=(F((e=>e)),I());return C(B,{children:T(M,l(o({className:"form-data",form:t},fe),{layout:"horizontal",onFinish:s=>{t.validateFields().then((async t=>{let s;i(H(t)),s=t.useResume?await oe():await re(),i(W(s)),m.success("connect success"),e(!1);const n=g();ie.dispatch(te({id:`${n}`,metadata:"",route:"/xxx/xxx",data:"",receive:[],method:"requestStream"})),a(`/${n}`)})).catch((e=>{m.error(e)}))},initialValues:ge,children:[C(M.Item,{name:"websocketURL",required:!0,label:"Websocket URL",rules:[{required:!0,message:"Please input your Websocket URL"}],children:C(R,{placeholder:"eg:ws://127.0.0.1:8080"})}),C(M.Item,{name:"metadataMimeType",label:"Metadata",hasFeedback:!0,rules:[{required:!0,message:"Please select your Metadata type!"}],children:T(E,{suffixIcon:C("img",{css:P`width: 12px`,src:pe}),placeholder:"Please select metadataMimeType",children:[C(he,{value:"application/json",children:"JSON - application/json"}),C(he,{value:"text/plain",children:"TEXT - text/plain"})]})}),C(M.Item,{name:"metadata",label:"SetUp Metadata",children:C(ue,{formRef:t,field:"metadata"})}),C(M.Item,{name:"dataMimeType",label:"Payload",hasFeedback:!0,rules:[{required:!0,message:"Please select  dataMimeType!"}],children:T(E,{placeholder:"Please select dataMimeType",suffixIcon:C("img",{css:P`width: 12px`,src:pe}),children:[C(he,{value:"application/json",children:"JSON - application/json"}),C(he,{value:"text/plain",children:"TEXT - text/plain"})]})}),C(M.Item,{name:"data",label:"SetUp Payload",children:C(ue,{formRef:t,field:"data"})}),C(O,{bordered:!1,defaultActiveKey:["0"],expandIcon:({isActive:e})=>C(N,{rotate:e?90:0}),className:"site-collapse-custom-collapse",children:C(me,{forceRender:!0,header:"Detail Config",className:"site-collapse-custom-panel",children:T("div",{children:[C(M.Item,{className:"resumeItem",label:"resume",name:"useResume",valuePropName:"checked",children:C(q,{})}),C(M.Item,{name:"sessionDuration",required:!0,label:"Session Duration",hasFeedback:!0,rules:[{required:!0,message:"Please set Session Duration"}],children:C(R,{type:"number",placeholder:"6000ms"})}),C(M.Item,{name:"token",required:!0,label:"Token",hasFeedback:!0,rules:[{required:!0,message:"Please set Token"}],children:C(R,{type:"string",placeholder:"eg: g2t672389jsae78sj1f"})}),C(M.Item,{name:"KeepAlive",required:!0,label:"KeepAlive interval",hasFeedback:!0,rules:[{required:!0,message:"Please set KeepAlive interval"}],children:C(R,{type:"number",placeholder:"eg:30000ms"})}),C(M.Item,{name:"lifetime",required:!0,label:"KeepAlive  max lifetime",hasFeedback:!0,rules:[{required:!0,message:"Please set lifetime"}],children:C(R,{type:"number",placeholder:"eg:1000"})})]})},"1")}),T("footer",{css:P`
          display: flex;
          flex-direction: row-reverse;
          margin-right: 20px;
        `,children:[C(M.Item,{children:C(j,{css:P`
              width: 120px;
              height: 44px;
              background-color: #7297FC;
              border-radius: 16px;
              border: 0;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 14px;
            `,type:"primary",htmlType:"submit",children:"Connect"})}),C(M.Item,{css:P`margin-right: 24px`,children:C(j,{css:P`
              width: 120px;
              height: 44px;
              background-color: #FF6C87;
              border-radius: 16px;
              border: 0;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 14px;
            `,type:"primary",onClick:()=>{t.validateFields().then((async e=>{i(H(e)),e.useResume?await oe():await re(),m.success("connect success ")})).catch((e=>{m.error("connection fail")}))},children:"Test"})})]})]}))})};const be=()=>{const[e,t]=k.exports.useState(!0);return C(B,{children:C(K,{title:"Connect Server",centered:!0,visible:e,closeIcon:!0,onOk:()=>{t(!1)},maskClosable:!1,keyboard:!1,footer:null,children:C(xe,{setIsModalVisible:t})})})};const ye=()=>T("div",{css:P`
          background-color: #252730;
          color: #678FFB;
          font-family: Poppins,serif;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          line-height: 64px;
          height: 64px;
          margin: 0;
        `,children:[C("span",{css:P`padding-right: 10px;font-size: 26px;`,children:"🤖 RSocketMan"}),T("span",{children:[C("span",{css:P`margin-right: 10px`,children:C(U,{href:"http://github.com/HaiyaoTec/rsocketMan/issues","data-color-scheme":"no-preference: dark; light: dark; dark: dark;","data-icon":"octicon-issue-opened","aria-label":"Issue HaiyaoTec/rsocketMan on GitHub",children:"Issue"})}),C(U,{href:"http://github.com/HaiyaoTec/rsocketMan","data-show-count":"true","aria-label":"Star HaiyaoTec/rsocketMan on GitHub",children:"Star"})]})]});const Ae=({index:e,item:t,setDataItem:a})=>C("div",{css:P`
        width: 464px;
        background-color: #1f2128;
        margin-bottom: 15px;
        cursor: pointer;
        border-radius: 16px;

        &:hover {
          background-color: #384571;
        }

      `,onClick:()=>{a(t)},children:T("div",{css:P`display: flex`,children:[C("div",{css:P`display: flex;justify-content: center;align-items: center;padding: 25px 20px`,children:C("img",{src:t.isSend?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACxSURBVHgB7ZNBCgIxDEWTOBuP5U30EtOlLmdW4gn0CB7BI3iEHsF9hZqAhYJKErqQgX4YKG3+e5sMQM+iksZxn0I4ejpoHXyGcM4A23fpMszzztIzCWp4VTRJSBsocAbGCh7lTt6aBDV8hbgp94nPVglZ4ThNsbyt+WyVkBfulXwIeBUPGvyXRLqqAIhuXLhq8C8S6d2hJfyTZfk8HXVNW9MF/xcMnmFew1NGfEDPovICP7ljJ7wECnAAAAAASUVORK5CYII=":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADnSURBVHgB7Y8xDoIwFIZfUZg9At6AI+ANuIFOGiZwAFdnNAEnhElPgjfQI3gEZwJ9FmOCAWJbF0PClzR5afv/Xwsw0Cu8tHQ2SRnKZBSZywQxQkBXJiMl+IVB8H/BuLnhJ4WFBBwAut4ttRsI4Maoa0oZUoqHva1ePs86foAGQTAJKpmX5gYIldOMjRYrM5vnLUGwUrdA4czGCU9Sl6NeZQKbZXmCl8QeL3iSdjnLdEDgC35cnNgT5mx8IKEzJrtW+zkdTUXKuYKmpPrRO3YXKRcSNCQ1AuXCgpZEsFwa71hE1YKBXvEE1g9thweTMc4AAAAASUVORK5CYII=",alt:"arrow"})}),T("div",{css:P`flex: 1`,children:[T("div",{css:P`
              display: flex;
              justify-content: space-between;
              padding: 14px 16px 6px 0;
            `,children:[T("span",{children:[C("span",{css:P`
              display: inline-block;
              background-color: #FFFFFF2E;
              margin-right: 10px;
              color: #ffffff;
              width: 17px;
              height: 17px;
              line-height: 17px;
              text-align: center;
              border-radius: 3px;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;

            `,children:e}),(null==t?void 0:t.success)?C("span",{css:P`
                color: #2EC13D;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `,children:"OK"}):C("span",{css:P`
                color: #FB7777;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `,children:"ERROR"})]}),C("span",{css:P`
                color: #FFFFFF54;
                font-family: Poppins, serif;
                font-weight: normal;
                font-size: 12px;
                line-height: 12px;
              `,children:t.date})]}),C("div",{css:P`
              display: flex;
              width: 100%;
              justify-content: space-between;
              padding: 6px 16px 14px 0;
              font-weight: bold;
              align-items: center;
            `,children:C("span",{css:P`
            max-width: 190px;
            overflow: hidden;
            color: #ffffff;
            text-overflow: ellipsis;
            white-space: nowrap;
          `,children:"{}"===(null==t?void 0:t.data)?C("span",{css:P`color: #FFFFFF54`,children:"Empty"}):null==t?void 0:t.data})})]})]})},e);const{Panel:ve}=O,we=e=>{try{return D.format(e,{parser:"babel",plugins:[z]})}catch(t){return e}},ke=e=>{try{const t=JSON.parse(e);return"string"==typeof t?we(t):C(L,{theme:"ashes",src:t})}catch(t){return we(e)}},Se=({dataItem:e})=>C("div",{css:P`
        background-color: #252730;
        position: sticky;
        top: 0;
        flex: 1;
        padding: 16px;
        min-width: 380px;
      `,children:C("div",{className:"datasheet",css:P`position: sticky;
        top: 0`,children:T(O,{bordered:!1,defaultActiveKey:["2"],expandIcon:({isActive:e})=>C(N,{rotate:e?90:0}),className:"site-collapse-custom-collapse",children:[C(ve,{header:"Metadata",className:"site-collapse-custom-panel",children:C("pre",{css:P`
                margin-top: 16px;
                padding: 0 16px;
                width: 100%;
                height: 200px;
                background-color: #1f2128;
                color: #9a9b9f;
                word-break: break-all;
                font-weight: bold;
              `,children:"{}"===(null==e?void 0:e.metadata)?"":we(null==e?void 0:e.metadata)})},"1"),C(ve,{css:P`margin-top: 16px`,header:"Payload",className:"site-collapse-custom-panel",children:C("pre",{css:P`
                margin-top: 16px;
                padding: 0 16px;
                width: 100%;
                min-height: 300px;
                max-height: 68vh;
                background-color: #1f2128;
                color: #9a9b9f;
                word-break: break-all;
                white-space: break-spaces;
                font-weight: bold;
              `,children:"{}"===(null==e?void 0:e.data)?"":ke(null==e?void 0:e.data)})},"2")]})})}),{Panel:Fe}=O,{Option:Ie}=E,Ce={labelCol:{xs:{span:5},sm:{span:5}},wrapperCol:{xs:{span:16},sm:{span:16}}},Te=()=>{const e=X(),{metadataMimeType:t,dataMimeType:a}=F((e=>e.connection)),[i,s]=k.exports.useState(null),n=e.requestID;let r=F((t=>t.requestSliceReducer.find((t=>t.id===e.requestID))));const c=null==r?void 0:r.receive;k.exports.useEffect((()=>{p.setFieldsValue(d),s(null)}),[null==r?void 0:r.method,null==r?void 0:r.id]);let d={method:null==r?void 0:r.method,route:null==r?void 0:r.route,metadata:null==r?void 0:r.metadata,data:null==r?void 0:r.data};const[p]=M.useForm();return C("div",{children:r&&T("div",{css:P`
            display: flex;
            height: 100%;
            border-radius: 3px;
          `,children:[T("div",{css:P`
              display: flex;
              flex-direction: column;
              width: 644px;
              min-width: 644px;
            `,children:[C("div",{css:P`
                flex: 1;
                border: 1px solid #000000;
                border-top: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: #252730;
                border-radius: 3px;
                margin-bottom: 16px;
                padding-top: 40px;
              `,children:T(M,l(o({},Ce),{layout:"horizontal",form:p,onFinish:e=>{e.method!==(null==r?void 0:r.method)?ie.dispatch(ae(l(o({},e),{id:n,receive:[]}))):ie.dispatch(ae(l(o({},e),{id:n}))),de(l(o({},e),{id:n})),m.success("message send ")},children:[T("div",{className:"custom_box",children:[C(M.Item,{className:"custom_method_input",name:"method",label:"Method",css:P`font-weight: bold;`,hasFeedback:!0,rules:[{required:!0,message:"Please select your method!"}],children:T(E,{suffixIcon:C("img",{css:P`width: 12px`,src:pe}),placeholder:"Please select method",children:[C(Ie,{value:"fireAndForget",children:"fireAndForget"}),C(Ie,{value:"requestResponse",children:"requestResponse"}),C(Ie,{value:"requestStream",children:"requestStream"}),C(Ie,{value:"requestChannel",children:"requestChannel"})]})}),C(j,{className:"custom_submit",type:"primary",htmlType:"submit",css:P`
                      width: 100px;
                      font-weight: bold;
                      background-color: #4ac2dd;
                    `,children:"SEND"})]}),C(M.Item,{name:"route",required:!1,label:"Route",css:P`font-weight: bold;`,children:C(R,{placeholder:"eg: xxx/xxx"})}),C(O,{bordered:!1,defaultActiveKey:["0"],expandIcon:({isActive:e})=>C("span",{css:P`color: #7699FC;
                    font-weight: 500 !important;
                    font-size: 14px !important;
                    line-height: 22px !important;`,children:"   Add Metadata"}),className:"site-collapse-custom-collapse",children:C(Fe,{forceRender:!0,header:"Metadata:",className:"metadata-item site-collapse-custom-panel",children:C(M.Item,{name:"metadata",label:"",css:P`font-weight: bold;
                      margin-left: 120px;
                      width: 638px`,children:C(ue,{formRef:p,field:"metadata"})})},"1")}),C(M.Item,{name:"data",label:"Payload",css:P`font-weight: bold;`,children:C(ue,{formRef:p,field:"data"})})]}))}),T("div",{css:P`
                background-color: #252730;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `,children:[C("h2",{css:P`
                  margin-left: 30px;
                  font-weight: bold;
                  font-family: Poppins, serif;
                  position: sticky;
                  height: 40px;
                  line-height: 40px;
                  top: 57px;
                  color: #9c9ea2;
                `,children:"Message"}),C("div",{css:P`display: flex;
                flex-direction: column;
                margin-right: 40px;
                align-items: flex-end`,children:null==c?void 0:c.map(((e,t)=>C(Ae,{item:e,index:c.length-t,setDataItem:s},t)))})]})]}),i&&C("div",{css:P`margin-left: 16px;flex: 1`,children:C(Se,{dataItem:i})})]})},null==r?void 0:r.id)},Me=({info:e})=>{var t,a;I();let i=S();return C("div",{css:P`& > :hover {
      background-color: #384571
    }`,children:T("div",{css:P`
            width: 100%;
            background-color: #252730;
            padding: 20px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            cursor: pointer;
            border-radius: 3px;
          `,onClick:()=>{i(`/${e.id}`)},children:[T("div",{css:P`display: flex;
          justify-content: space-between`,children:[C("span",{css:P`
            line-height: 24px;
            font-size: 16px;
            font-family: Poppins, serif;
            font-style: normal;
            font-weight: 600;
            color: #7699FC;
          `,children:e.method}),C("span",{css:P`
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            font-weight: bold;
            background-color: #2EC13D;
            color: #FFFFFF;
            border-radius: 50%`,children:e.receive.length})]}),C("div",{css:P`
          color: #FFFFFF;
          margin-top: 14px;
          font-weight: bold;
          font-size: 14px`,children:C("span",{children:e.route})}),T("div",{css:P`padding: 10px 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between`,children:[C("span",{css:P`max-width: 70%;
            display: inline-block;
            color: #FFFFFF54;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`,children:"{}"===(null==(t=e.receive[0])?void 0:t.data)?C("span",{css:P`color: #FFFFFF54`,children:"Empty"}):null==(a=e.receive[0])?void 0:a.data}),C("span",{css:P` color: #7699FC;
                font-weight: bold;
                cursor: pointer;
              `,onClick:t=>{t.preventDefault(),t.stopPropagation();const a=g();ie.dispatch(te(l(o({},e),{id:a,receive:[],metadata:"",data:""}))),i(a)},children:"COPY"})]})]})})},{Footer:Re,Sider:Ee,Content:Pe}=G;function Oe(){k.exports.useState(0),S();const e=F((e=>e.requestSliceReducer));return k.exports.useEffect((()=>{}),[]),T("div",{css:P`height: 100%;`,children:[C(be,{}),T(G,{css:P`height: 100%;`,children:[C(ye,{}),T(G,{css:P`background-color: #1c1d22`,children:[T(Ee,{css:P`
                border: 1px solid #000000;
                overflow: auto;

                &::-webkit-scrollbar {
                  display: none
                }

                background-color: #252730;
                min-width: 336px !important;
                padding: 0 !important;
              `,children:[C("div",{css:P`
              position: sticky;
              top: 0;
              height: 44px;
              margin: 20px 20px 20px 20px;
            `,onClick:()=>{ie.dispatch(te({id:`${g()}`,metadata:"",route:"/xxx/xxx",data:"",receive:[],method:"fireAndForget"}))},children:C("div",{css:P`
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
                `,children:"+ Add Request"})}),e.map(((e,t)=>C(Me,{info:e},t)))]}),C(Pe,{css:P`
            margin: 30px 32px;
            border-left: 0;
            border-right: 0;
            background-color: #1c1d22;
            border-radius: 3px;
            overflow: auto`,children:C(J,{children:C(Y,{path:":requestID",element:C(Te,{})})})})]})]})]})}m.config({duration:2,maxCount:3,rtl:!0}),V.render(y($,{store:ie,children:y(_,{children:y(Oe,{})})}),document.getElementById("root"));
