/** @jsxImportSource @emotion/react */
import {css, jsx} from "@emotion/react";
import React, {FC, useEffect, useState} from "react";
import {Form, Input, Button, Select, message} from "antd";
import { useSelector} from "react-redux";
import {sendMessageByMethod} from "../../utils";
import {nanoid} from "nanoid";
import {Routes, Route, useParams, useNavigate} from "react-router-dom";
import {store} from "../../store/store";
import {addRequestItem, updateRequestItem} from "../../store/slice/RequestSlice";
import './css/index.css'
import prettier from 'prettier'
//@ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import arrow_down from "../FormData/assets/drop-down-arrow.svg";
import {Collapse} from 'antd';
import MessageItem from "../MessageItem/MessageItem";
import DataShow from '../DataShow/DataShow'
import CustomerCodeMirror from "../CodeMirror/CodeMirror";

const {Panel} = Collapse;

type LayoutType = Parameters<typeof Form>[0]["layout"];
const {Option} = Select;
const formItemLayout = {
  labelCol: {
    xs: {span: 5},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 16},
    sm: {span: 16},
  },
};
// window.location.reload();

const DataDisplay: FC = () => {
  const sideBarRef=document.querySelector("#sideBar")
  console.log("render");
  const params = useParams();
  const navigate = useNavigate()
  const {metadataMimeType, dataMimeType} = useSelector(
    (state) => state.connection
  );
  const [dataItem, setDataItem] = useState(null);

  const id = params.requestID as string;
  // const dataDisplayData = useSelector((state) => state.dataDisplayReducer)
  //                         useSelector((state)=>state.requestSliceReducer)
  let currentRequest = useSelector((state) =>
    state.requestSliceReducer.find((item) => {
      return item.id === params.requestID;
    })
  );

  const receiveItems = currentRequest?.receive;

  useEffect(() => {
    form.setFieldsValue(initialValues);
    setDataItem(null)
    //如果recevie长度为0，那么表示还未发送过消息
  }, [currentRequest?.method, currentRequest?.id]);

  let initialValues = {
    method: currentRequest?.method,
    route: currentRequest?.route,
    metadata: currentRequest?.metadata,
    data: currentRequest?.data,
  };

  console.log(initialValues);
  //没有id则表示为Add Request添加的
  // if (!id) {
  //   id = nanoid()
  // }
  console.log(currentRequest);

  const onFinish = (value: {data:string,metadata:string,method:string,route:string}) => {
    console.log(value)
    console.log(metadataMimeType, dataMimeType);
    //绑定id
    // value.id = id
    //更新RequestItem
    //不是第一次发送,新建新的通道
    if (!currentRequest?.isFirstSend) {
      //创建新的id
      const newId=nanoid()
      store.dispatch(addRequestItem({
        ...value,
        id: `${newId}`,
        receive: [],
        isFirstSend:false
      }))
      sendMessageByMethod({...value, id:`${newId}`});
      //跳转路由
      navigate(`/${newId}`)
      // @ts-ignore
      sideBarRef.scrollTop=0
    } else {
      store.dispatch(updateRequestItem({...value, id,isFirstSend:false}));
      sendMessageByMethod({...value, id});
    }
    message.success('message send ')
  };

  const formatData = (data: string) => {
    try {
      return prettier.format(data, {
        parser: "babel",
        plugins: [parserBabel],
      })
    } catch (e) {
      return data
    }
  }

  const [form] = Form.useForm();

  return (
    <div key={currentRequest?.id}>
      {currentRequest && (
        <div
          css={css`
            display: flex;
            height: 100%;
            border-radius: 3px;
          `}
        >
          {/*  left*/}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              width: 644px;
              min-width: 644px;
            `}
          >
            {/*  leftTop*/}
            <div
              css={css`
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
              `}
            >
              <Form
                {...formItemLayout}
                layout={"horizontal"}
                form={form}
                onFinish={onFinish}
              >
                <div className={"custom_box"}>
                  <Form.Item
                    className={"custom_method_input"}
                    name="method"
                    label="Method"
                    css={css`font-weight: bold;`}
                    hasFeedback
                    rules={[
                      {required: true, message: "Please select your method!"},
                    ]}
                  >
                    <Select suffixIcon={<img css={css`width: 12px`} src={arrow_down}/>}
                            placeholder="Please select method">
                      <Option value="fireAndForget">RequestFNF</Option>
                      <Option value="requestResponse">RequestAndResponse</Option>
                      <Option value="requestStream">RequestStream</Option>
                      <Option value="requestChannel">RequestChannel</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    className={"custom_submit"}
                    type="primary"
                    htmlType="submit"
                    css={css`
                      width: 100px;
                      font-weight: bold;
                      background-color: #4ac2dd;
                    `}
                  >
                    SEND
                  </Button>
                </div>

                <Form.Item name={"route"} required={false} label="Route" css={css`font-weight: bold;`}>
                  <Input placeholder="eg: xxx/xxx"/>
                </Form.Item>
                <Collapse
                  bordered={false}
                  defaultActiveKey={['0']}
                  expandIcon={({isActive}) => <span css={css`color: #7699FC;
                    font-weight: 500 !important;
                    font-size: 14px !important;
                    line-height: 22px !important;`}>&nbsp;&nbsp;&nbsp;Add Metadata</span>}
                  className="site-collapse-custom-collapse"
                >
                  <Panel forceRender={true} header="Metadata:" key="1"
                         className="metadata-item site-collapse-custom-panel">
                    <Form.Item name={"metadata"} label="" css={css`font-weight: bold;
                      margin-left: 120px;
                      width: 638px`}>
                      <CustomerCodeMirror formRef={form} field={"metadata"} initValue={initialValues.metadata}/>
                    </Form.Item>
                  </Panel>
                </Collapse>

                <Form.Item name={"data"} label="Payload" css={css`font-weight: bold;`}>
                  <CustomerCodeMirror formRef={form} field={"data"} initValue={initialValues.data}/>
                </Form.Item>
              </Form>
            </div>
            {/*  leftBottom*/}
            <div
              css={css`
                display: flex;
                background-color: #252730;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `}
            >
              <h2 css={
                css`
                  margin-left: 46px;
                  font-weight: bold;
                  font-family: Poppins, serif;
                  line-height: 40px;
                  padding-top: 57px;
                  font-size: 16px;
                  color: #9c9ea2;
                `}>
                <span
                css={css`
                  position: sticky;
                  top: 57px;
                `}
                >
                Message
                </span>
              </h2>
              <div css={css`display: flex;
                flex-direction: column;
                margin-top: 40px;
                margin-left: 20px;
                margin-right: 40px;
                align-items: flex-end`}>
                {/*@ts-ignore*/}
                {receiveItems?.map((item, index) => {
                  return (
                    <MessageItem key={index} item={item} index={receiveItems.length - index} setDataItem={setDataItem}/>
                  );
                })}
              </div>
            </div>
          </div>
          {/*  right*/}
          {dataItem && (
            <div css={css`margin-left: 16px;flex: 1`}>
            <DataShow dataItem={dataItem}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
