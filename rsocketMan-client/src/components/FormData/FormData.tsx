/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useRef, useState} from "react";
import {Form, Input, Button, Radio, Select, message, Switch, Checkbox, Spin} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {configure, Connection, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {createResumeRSocketClient, createRSocketClient} from "../../utils";
import {useForm} from "antd/es/form/Form";
import {nanoid} from "nanoid";
import {store} from "../../store/store";
import {addRequestItem} from "../../store/slice/RequestSlice";
import {useNavigate} from "react-router-dom";
import arrow_down from './assets/drop-down-arrow.svg'
import {Collapse} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import './css/index.css'
import CustomerCodeMirror from "../CodeMirror/CodeMirror";
const {Panel} = Collapse;
type LayoutType = Parameters<typeof Form>[0]['layout'];
const {TextArea} = Input
const {Option} = Select
const formItemLayout = {
  labelCol: {
    xs: {span: 32},
    sm: {span: 10},
  },
  wrapperCol: {
    xs: {span: 32},
    sm: {span: 14},
  },
};





const FormData: FC = ({setIsModalVisible}: any) => {
  // useSelector((state)=>{
  //   return state
  // })
  const connection=store.getState().connection
  // type initialValues= Omit<Connection,"rsocket"|"status"|"error">
  //从持久化恢复，并初始化
  const initialValues = {
    websocketURL:connection.websocketURL?connection.websocketURL:'ws://127.0.0.1:10081',
    KeepAlive: connection.KeepAlive?connection.KeepAlive:1000000,
    lifetime: connection.lifetime?connection.lifetime:1000000,
    dataMimeType: connection.dataMimeType?connection.dataMimeType:'application/json',
    data:connection.data?connection.data:'',
    metadataMimeType: connection.metadataMimeType?connection.metadataMimeType:'application/json',
    metadata:connection.metadata?connection.metadata:'',
    useResume:connection.useResume,
    sessionDuration: connection.sessionDuration?connection.sessionDuration:6000,
    token: `${nanoid()}`
  }
  // const initialValues = {
  //   websocketURL: 'ws://127.0.0.1:10081',
  //   KeepAlive: 1000000,
  //   lifetime: 1000000,
  //   dataMimeType: 'application/json',
  //   metadataMimeType: 'application/json',
  //   useResume: true,
  //   sessionDuration: 6000,
  //   token: `${nanoid()}`
  // }
  const [form] = useForm()
  const [num, setNum] = useState(0)
  const [isSpin,setSpin]=useState(false)
  const navigate = useNavigate();
  const configuration = useSelector((state) => {
    return state
  })
  console.log(configuration)

  const getConfiguration = () => useSelector((state) => {
    return state
  })

  const disPatch = useDispatch()
  const onFinish = (values: any) => {
    setSpin(true)
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
          const nanoID = nanoid()
          store.dispatch(addRequestItem({
            id: `${nanoID}`,
            metadata: '',
            route: '/xxx/xxx',
            data: '',
            receive: [],
            method: 'requestStream'
          }))
          navigate(`/${nanoID}`)
        }
      )
      .catch(err => {
        console.error(err);
        message.error(err)
      })
      .finally(()=>{
        setSpin(false)
      })
  };


  const onTest = () => {
    setSpin(true)
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
      .finally(()=>{
        setSpin(false)
      })
  }

  // disPatch(configure(configuration))
  return (
    <div  className={"form-data"}>
      <Spin delay={300} tip={"Connecting..."} size="large" spinning={isSpin} />
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
        <Form.Item
          name="metadataMimeType"
          label="Metadata"
          hasFeedback
          rules={[{required: true, message: 'Please select your Metadata type!'}]}
        >
          <Select suffixIcon={<img css={css`width: 12px`} src={arrow_down}/>}
                  placeholder="Please select metadataMimeType">
            <Option value="application/json">JSON - application/json</Option>
            <Option value="text/plain">TEXT - text/plain</Option>
          </Select>
        </Form.Item>
        <Form.Item name={"metadata"} label="SetUp Metadata">
          {/*<TextArea css={css`min-height: 120px!important;`}/>*/}
          <CustomerCodeMirror initValue={initialValues.metadata} formRef={form} field={"metadata"}/>
        </Form.Item>

        <Form.Item
          name="dataMimeType"
          label="Payload"
          hasFeedback
          rules={[{required: true, message: 'Please select  dataMimeType!'}]}
        >
          <Select placeholder="Please select dataMimeType" suffixIcon={<img css={css`width: 12px`} src={arrow_down}/>}>
            <Option value="application/json">JSON - application/json</Option>
            <Option value="text/plain">TEXT - text/plain</Option>
          </Select>
        </Form.Item>
        <Form.Item name={"data"} label="SetUp Payload">
          <CustomerCodeMirror initValue={initialValues.data} formRef={form} field={"data"}/>
        </Form.Item>
        <Collapse
          bordered={false}
          defaultActiveKey={['0']}
          expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
          className="site-collapse-custom-collapse"
        >
          <Panel forceRender={true} header="Detail Config" key="1" className="site-collapse-custom-panel">
            <div>
              <Form.Item className={'resumeItem'} label={"resume"} name="useResume" valuePropName="checked">
                <Switch/>
              </Form.Item>

              <Form.Item name={"sessionDuration"} required={true} label="Session Duration" hasFeedback={true}
                         rules={[{required: true, message: 'Please set Session Duration'}]}>
                <Input type={"number"} placeholder="6000ms"/>
              </Form.Item>

              <Form.Item name={"token"} required={true} label="Token" hasFeedback={true}
                         rules={[{required: true, message: 'Please set Token'}]}>
                <Input type={"string"} placeholder="eg: g2t672389jsae78sj1f"/>
              </Form.Item>

              <Form.Item name={"KeepAlive"} required={true} label="KeepAlive interval" hasFeedback={true}
                         rules={[{required: true, message: 'Please set KeepAlive interval'}]}>
                <Input type={"number"} placeholder="eg:30000ms"/>
              </Form.Item>

              <Form.Item name={"lifetime"} required={true} label="KeepAlive  max lifetime" hasFeedback={true}
                         rules={[{required: true, message: 'Please set lifetime'}]}>
                <Input type={"number"} placeholder="eg:1000"/>
              </Form.Item>
            </div>
          </Panel>
        </Collapse>
        <footer css={css`
          display: flex;
          flex-direction: row-reverse;
          margin-right: 20px;
        `}>
          <Form.Item>
            <Button css={css`
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
            `} type="primary" htmlType="submit">
              Connect
            </Button>
          </Form.Item>

          <Form.Item css={css`margin-right: 24px`}>
            <Button css={css`
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
            `} type="primary" onClick={() => {
              onTest()
            }}>
              Test
            </Button>
          </Form.Item>
        </footer>
      </Form>
    </div>
  );
}
export default FormData
