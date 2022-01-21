import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import {FormInstance} from "antd";
import { useRequest } from 'ahooks';
import './css/index.css'
type props={
  formRef:FormInstance,
  field:string,
  initValue?:string
}


export default function CustomerCodeMirror({formRef,field,initValue}:props) {
  const resetFieldsValue=(value:string)=>{
    return new Promise((resolve)=>{
      const formValues=formRef.getFieldsValue()
      try {
        formValues[field]=JSON.stringify(JSON.parse(value))
      }catch (e){
        formValues[field]=value
      }
      formRef.setFieldsValue(formValues)
      console.log(formValues)
      resolve('success')
    })
  }

  const {run}=useRequest(resetFieldsValue,{
    debounceWait:300,
    manual:true
  })
  return (
    <CodeMirror
      className={"custom-codemirror"}
      theme={"dark"}
      value={initValue}
      height={"100%"}
      extensions={[json()]}
      onChange={(value, viewUpdate) => {
        run(value)
      }}
    />
  );
}
