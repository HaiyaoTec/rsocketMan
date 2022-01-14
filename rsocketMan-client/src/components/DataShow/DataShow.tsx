/** @jsxImportSource @emotion/react */
import {css, jsx} from "@emotion/react";
import React, {FC, useState} from "react";
import prettier from "prettier";
import './css/index.css'
// @ts-ignore
import parserBabel from "prettier/esm/parser-babel.mjs";
import {Collapse} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
// import the react-json-view component
import ReactJson from 'react-json-view'

const {Panel} = Collapse;

type Props = {
  dataItem: {
    data: string,
    metadata: string
  }
}
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

const getFormatData=(data:string)=>{
  console.log(data,typeof data)
  try {
    let jsonObj=JSON.parse(data)
    if((typeof jsonObj ==='string')||(typeof jsonObj ==='number')){
      return formatData(jsonObj as string)
    }
  return (<ReactJson theme={"ashes"} src={jsonObj}/>)
  }catch (e){
    return formatData(data)
  }
}


const DataShow: ({dataItem}: Props) => JSX.Element = ({dataItem}) => {
  return (
    <div
      css={css`
        background-color: #252730;
        position: sticky;
        top: 0;
        flex: 1;
        padding: 16px;
        min-width: 380px;
      `}
    >
      <div className={"datasheet"} css={css`position: sticky;
        top: 0`}>
        <Collapse
          bordered={false}
          defaultActiveKey={['2']}
          expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
          className="site-collapse-custom-collapse"
        >
          <Panel header="Metadata" key="1" className="site-collapse-custom-panel">
            {/*metadata*/}
            <pre
              css={css`
                margin-top: 16px;
                padding: 0 16px;
                width: 100%;
                height: 200px;
                background-color: #1f2128;
                color: #9a9b9f;
                word-break: break-all;
                font-weight: bold;
              `}
            >
              {/*@ts-ignore*/}
              {dataItem?.metadata === '{}' ? '' : formatData(dataItem?.metadata)}
            </pre>
          </Panel>

          <Panel css={css`margin-top: 16px`} header="Payload" key="2" className="site-collapse-custom-panel">
            {/*payload*/}
            <pre
              css={css`
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
              `}
            >
                  {/*TODO */}
              {
                //@ts-ignore
                // dataItem?.data === '{}' ? '' : formatData(dataItem?.data)
                dataItem?.data === '{}' ? '' : getFormatData(dataItem?.data)
              }
            </pre>
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}
export default DataShow


