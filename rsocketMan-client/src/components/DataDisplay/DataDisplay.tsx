/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useState} from "react";
import {Form, Input, Button, Radio, Select} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {configure} from "../../store/slice/ConnectionSlice";
import {fireAndForget, sendMessageByMethod, transformData} from "../../utils";
import {nanoid} from 'nanoid'


type LayoutType = Parameters<typeof Form>[0]['layout'];
const {Option} = Select

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

const DataDisplay: FC = () => {
  const {metadataMimeType, dataMimeType} = useSelector((state) => state.connection)

  const dataDisplayData = useSelector((state) => state.dataDisplayReducer)
  console.log(dataDisplayData)
  const initialValues = {
    method: dataDisplayData.method,
    route: dataDisplayData.route,
    metadata: dataDisplayData.metadata,
    data: dataDisplayData.data
  }
  let id = useSelector((state) => state.dataDisplayReducer.id)
  //没有id则表示为Add Request添加的
  if (!id) {
    id = nanoid()
  }
  console.log(id)
  const onFinish = (value: any) => {
    console.log(metadataMimeType, dataMimeType)
    const method = value.method
    //绑定id
    value.id = id
    sendMessageByMethod(value)
  }

  const [form] = Form.useForm();

  return (
    <>
      <div css={css`display: flex;
        height: 100%`}>
        {/*  left*/}
        <div css={css`display: flex;
          flex-direction: column;
          min-width: 600px`}>
          {/*  leftTop*/}
          <div css={css`background-color: green;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center`}>
            <Form
              {...formItemLayout}
              layout={'horizontal'}
              form={form}
              onFinish={onFinish}
              initialValues={initialValues}
            >
              <Form.Item
                name="method"
                label="method"
                hasFeedback
                rules={[{required: true, message: 'Please select your method!'}]}
              >
                <Select placeholder="Please select method">
                  <Option value="fireAndForget">fireAndForget</Option>
                  <Option value="requestResponse">requestResponse</Option>
                  <Option value="requestStream">requestStream</Option>
                  <Option value="text/plain">requestChannel</Option>
                </Select>
              </Form.Item>
              <Form.Item name={"route"} required={false} label="route">
                <Input placeholder="eg: xxx/xxx"/>
              </Form.Item>
              <Form.Item name={"metadata"} label="metadata">
                <TextArea/>
              </Form.Item>
              <Form.Item name={"data"} label="data">
                <TextArea/>
              </Form.Item>
              <Form.Item label={"button"}>
                <Button type="primary" htmlType="submit" css={css`background-color: #4c78f7;`}>
                  Send
                </Button>
              </Form.Item>
            </Form>

          </div>
          {/*  leftBottom*/}
          <div css={css`background-color: blue;
            flex: 1`}>leftBottom
          </div>
        </div>
        {/*  right*/}
        <div css={css`background-color: aqua;
          flex: 1`}>right
        </div>
      </div>
    </>
  );
}

export default DataDisplay
