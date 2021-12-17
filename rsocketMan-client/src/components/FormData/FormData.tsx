/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useState} from "react";
import {Form, Input, Button, Radio, Select, message} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {configure, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {createRSocketClient} from "../../utils";


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
  websocketHost: '127.0.0.1:10081',
  KeepAlive: 1000000,
  lifetime: 1000000,
  dataMimeType: 'text/plain',
  metadataMimeType: 'text/plain'
}


const FormData: FC = ({setIsModalVisible}: any) => {

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
          const rsocket = await createRSocketClient()
          //更新RScoket状态实例
          disPatch(updateRScoketInstance(rsocket))
          message.success('connect success !!!')
          //关闭modal
          setIsModalVisible(false)
        }
      )
      .catch(err => {
        console.error(err);
        message.error('whoops error')
      })
  };


  const onTest = (form: FormInstance) => {
    form.validateFields()
      .then(async result => {
          disPatch(configure(result))
          const rsocket = await createRSocketClient()
          message.success('connect success !!!')
        }
      )
      .catch(err => {
        console.error(err);
        message.error('whoops error')
      })
  }

  // disPatch(configure(configuration))
  const [form] = Form.useForm();
  return (
    <>
      <Form
        {...formItemLayout}
        layout={'horizontal'}
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >

        <Form.Item name={"websocketHost"} required={true} label="Websocket Host"
                   rules={[
                     {
                       required: true,
                       message: 'Please input your Websocket Host',
                     },
                   ]}>
          <Input placeholder="eg:127.0.0.1:8080"/>
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


        <footer css={css`
          display: flex;
          justify-content: space-around;
        `}>

          <Form.Item>
            <Button type="primary" onClick={() => {
              onTest(form)
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
