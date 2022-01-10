/** @jsxImportSource @emotion/react */
import {css, jsx} from "@emotion/react";
import React, {FC, useEffect, useRef, useState} from "react";
import {Form, Input, Button, Radio, Select, message} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {configure} from "../../store/slice/ConnectionSlice";
import {fireAndForget, sendMessageByMethod, transformData} from "../../utils";
import {nanoid} from "nanoid";
import {Routes, Route, useParams} from "react-router-dom";
import {store} from "../../store/store";
import {updateRequestItem} from "../../store/slice/RequestSlice";
import './css/index.css'
import prettier from 'prettier'
//@ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import arrow_down from "../FormData/assets/drop-down-arrow.svg";


type LayoutType = Parameters<typeof Form>[0]["layout"];
const {Option} = Select;

const formItemLayout = {
  labelCol: {
    xs: {span: 30},
    sm: {span: 5},
  },
  wrapperCol: {
    xs: {span: 30},
    sm: {span: 14},
  },
};
// window.location.reload();

const DataDisplay: FC = () => {
  console.log("render");
  const params = useParams();
  const {metadataMimeType, dataMimeType} = useSelector(
    (state) => state.connection
  );
  const [dataItem, setDataItem] = useState(null);
  const id = params.requestID;
  // const dataDisplayData = useSelector((state) => state.dataDisplayReducer)
  //                         useSelector((state)=>state.requestSliceReducer)
  let currentRequest = useSelector((state) =>
    state.requestSliceReducer.find((item) => {
      return item.id === params.requestID;
    })
  );

  const receiveItems = currentRequest?.receive;

  useEffect(() => {
    console.log(id);
    form.setFieldsValue(initialValues);
    setDataItem(null)
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

  const onFinish = (value: any) => {
    console.log(metadataMimeType, dataMimeType);
    //绑定id
    // value.id = id
    //更新RequestItem
    //切换了请求方法
    if (value.method !== currentRequest?.method) {
      store.dispatch(updateRequestItem({...value, id, receive: []}));
    } else {
      store.dispatch(updateRequestItem({...value, id}));
    }
    sendMessageByMethod({...value, id});
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
  // form.setFieldsValue(initialValues)
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    // !dataDisplayData.show?
    //   <div>123</div>:
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
              min-width: 700px;
              width: 50%;
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
                margin-bottom:16px;
                padding-top: 40px;
              `}
            >
              <Form
                {...formItemLayout}
                layout={"horizontal"}
                form={form}
                onFinish={onFinish}
              >
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
                  <Select  suffixIcon={<img css={css`width: 12px`} src={arrow_down}/>} placeholder="Please select method">
                    <Option value="fireAndForget">fireAndForget</Option>
                    <Option value="requestResponse">requestResponse</Option>
                    <Option value="requestStream">requestStream</Option>
                    <Option value="requestChannel">requestChannel</Option>
                  </Select>
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
                    Send
                  </Button>
                </Form.Item>

                <Form.Item name={"route"} required={false} label="Route" css={css`font-weight: bold;`}>
                  <Input placeholder="eg: xxx/xxx"/>
                </Form.Item>
                <Form.Item name={"metadata"} label="Metadata" css={css`font-weight: bold;`}>
                  <TextArea/>
                </Form.Item>
                <Form.Item name={"data"} label="Payload" css={css`font-weight: bold;`}>
                  <TextArea/>
                </Form.Item>
              </Form>
            </div>
            {/*  leftBottom*/}
            <div
              css={css`
                background-color: #252730;
                border: 1px solid #000000;
                border-top: 0;
                flex: 1;
              `}
            >
              <h2 css={
                css`
                  margin-left: 30px;
                  font-weight: bold;
                  color: #ffffff;
                `}>Receive</h2>
              <div css={css`display: flex;
                flex-direction: column;
                align-items: center`}>
                {/*@ts-ignore*/}
                {receiveItems?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      css={css`
                        width: 600px;
                        background-color: #31383e;
                        margin-bottom: 15px;
                        cursor: pointer;
                        &:hover {
                          background-color: #1b1e21
                        }

                        border: 2px solid #ccc;
                      `}
                      onClick={() => {
                        // @ts-ignore
                        setDataItem(item);
                      }}
                    >
                      {/*  item top*/}
                      <div
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          padding: 10px 16px;
                        `}
                      >
                        <span>
                          <span
                            css={css`
                              margin-right: 6px;
                              font-weight: bold;
                              color: #ffffff;
                            `}
                          >
                            #{receiveItems.length - index}
                          </span>
                          {/*消息是正确还是错误的*/}
                          {
                            item?.success?
                              <span
                                css={css`
                              color: #71cf40;
                              font-weight: bold;
                            `}
                              >
                            OK
                          </span>
                              :
                            <span
                            css={css`
                              color: red;
                              font-weight: bold;
                            `}
                            >
                            Error
                            </span>
                          }

                        </span>
                        <span css={css`font-weight: bold;
                          color: #ffffff`}>{item.date}</span>
                      </div>
                      {/*  item bottom*/}
                      <div
                        css={css`
                          display: flex;
                          justify-content: space-between;
                          padding: 16px;
                          font-weight: bold;
                          align-items: center;
                        `}
                      >
                        <span
                          css={css`
                            width: 70%;
                            overflow: hidden;
                            color: #ffffff;
                            text-overflow: ellipsis;
                            white-space: nowrap
                          `}
                        >
                          {
                            item?.data
                          }
                        </span>
                        <span
                          css={css`
                            display: inline-block;
                            background-color: #45c0dc;
                            padding: 3px;
                            border-radius: 6px;
                            color: #ffffff;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 16px;
                          `}
                        >
                          View All
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/*  right*/}
          {dataItem && (
            <div
              css={css`
                background-color: #272b30;
                flex: 1;
                padding: 16px;
                min-width: 500px;
              `}
            >
              <div css={css`position: sticky;
                top: 0`}>
                {/*data*/}
                <div
                  css={css`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `}
                >
                  Data
                </div>
                <pre
                  css={css`
                    width: 100%;
                    min-height: 300px;
                    max-height: 500px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    white-space: break-spaces;
                    font-weight: bold;
                  `}
                >
                  {/*TODO */}
                  {
                    //@ts-ignore
                    formatData(dataItem?.data)
                  }

                </pre>
                <br/>
                {/*metadata*/}
                <div
                  css={css`
                    font-size: 24px;
                    font-weight: bold;
                    color: #ffffff;
                  `}
                >
                  Metadata
                </div>
                <div
                  css={css`
                    width: 100%;
                    height: 200px;
                    border: 1px solid #bbbbbb;
                    background-color: #31383e;
                    color: #ffffff;
                    word-break: break-all;
                    font-weight: bold;
                  `}
                >
                  {/*@ts-ignore*/}
                  {dataItem?.metadata}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
