/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useRef, useState} from "react";
import {Form, Input, Button, Radio, Select, message, Switch, Checkbox} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {configure, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {createResumeRSocketClient, createRSocketClient} from "../../utils";
import {useForm} from "antd/es/form/Form";


type LayoutType = Parameters<typeof Form>[0]['layout'];

const {TextArea} = Input
const {Option} = Select

const formItemLayout = {
  labelCol: {
    xs: {span: 30},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 30},
    sm: {span: 14},
  },
};


const initialValues = {
  websocketURL: 'ws://127.0.0.1:10081',
  KeepAlive: 1000000,
  lifetime: 1000000,
  dataMimeType: 'text/plain',
  metadataMimeType: 'text/plain',
  useResume: false
}

const FormData: FC = ({setIsModalVisible}: any) => {

  const [form] = useForm()
  const [num, setNum] = useState(0)

  const configuration = useSelector((state) => {
    return state
  })
  console.log(configuration)

  const getConfiguration = () => useSelector((state) => {
    return state
  })

  const disPatch = useDispatch()

  const onFinish = (values: any) => {
    // setIsModalVisible(false)
    console.log('Received values of form: ', values);
    form.validateFields()
      .then(async result => {
          disPatch(configure(result))
          let rsocket;
          if (result.useResume) {
            rsocket = await createResumeRSocketClient()

          } else {
            rsocket = await createRSocketClient()
          }
          //更新RScoket状态实例
          disPatch(updateRScoketInstance(rsocket))
          message.success('connect success')
          //关闭modal
          setIsModalVisible(false)
        }
      )
      .catch(err => {
        console.error(err);
        message.error(err)
      })
  };


  const onTest = () => {
    // console.log(form.getFieldsValue())
    form.validateFields()
      .then(async result => {
          console.log("=============", result)
          disPatch(configure(result))
          let rsocket;
          if (result.useResume) {
            rsocket = await createResumeRSocketClient()
          } else {
            rsocket = await createRSocketClient()
          }
          message.success('connect success ')
        }
      )
      .catch(err => {
        message.error('connection fail')
        console.error(err);
      })
  }

  // disPatch(configure(configuration))
  return (
    <>
      <Form
        form={form}
        {...formItemLayout}
        layout={'horizontal'}
        onFinish={onFinish}
        initialValues={initialValues}
      >

        <Form.Item name={"websocketURL"} required={true} label="Websocket URL"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your Websocket URL',
                     },
                   ]}>
          <Input placeholder="eg:ws://127.0.0.1:8080"/>
        </Form.Item>

        <Form.Item name={"KeepAlive"} required={true} label="KeepAlive" hasFeedback={true}
                   rules={[{required: true, message: 'Please set KeepAlive'}]}>
          <Input type={"number"} placeholder="eg:1000000"/>
        </Form.Item>

        <Form.Item name={"lifetime"} required={true} label="lifetime" hasFeedback={true}
                   rules={[{required: true, message: 'Please set lifetime'}]}>
          <Input type={"number"} placeholder="eg:1000"/>
        </Form.Item>

        <Form.Item
          name="metadataMimeType"
          label="metadataMimeType"
          hasFeedback
          rules={[{required: true, message: 'Please select your Metadata type!'}]}
        >
          <Select placeholder="Please select metadataMimeType">
            <Option value="application/json">application/json</Option>
            <Option value="text/plain">text/plain</Option>
          </Select>
        </Form.Item>
        <Form.Item name={"metadata"} label="metadata">
          <TextArea/>
        </Form.Item>
        <Form.Item
          name="dataMimeType"
          label="dataMimeType"
          hasFeedback
          rules={[{required: true, message: 'Please select  dataMimeType!'}]}
        >
          <Select placeholder="Please select dataMimeType">
            <Option value="application/json">application/json</Option>
            <Option value="text/plain">text/plain</Option>
          </Select>
        </Form.Item>
        <Form.Item name={"data"} label="data">
          <TextArea/>
        </Form.Item>

        <Form.Item label={"resume"} name="useResume" valuePropName="checked">
          <Switch/>
        </Form.Item>


        <footer css={css`
          display: flex;
          justify-content: space-around;
        `}>

          <Form.Item>
            <Button type="primary" onClick={() => {
              onTest()
            }}>
              test
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              connect
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="reset">
              Reset
            </Button>
          </Form.Item>
        </footer>

      </Form>
    </>
  );
}
export default FormData
