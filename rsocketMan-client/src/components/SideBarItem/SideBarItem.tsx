/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useEffect, useState} from "react";
import {Form, Input, Button, Radio, Select, message} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {configure, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {addRequestItem, RequestSliceItem} from "../../store/slice/RequestSlice";
import {store} from "../../store/store";
import {nanoid} from "nanoid";
import './css/index.css'


type prosType = {
  info: RequestSliceItem
  path:string
}
const SideBarItem: FC<prosType> = ({info,path}) => {
console.log(path)
  const dispatch = useDispatch()
  const [current,setCurrent]=useState('')
  let navigate = useNavigate()
  return (
    <div
      className={info.id===path?'current':''}
      css={css`& > :hover {
      background-color: #384571
    }`}>
      <div
        css={
          css`
            width: 100%;
            background-color: #252730;
            padding: 20px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            cursor: pointer;
            border-radius: 3px;
          `
        }
        // onClick={()=>{dispatch(updateDataDisplay({...info,show:true}))}}
        onClick={() => {
          navigate(`/${info.id}`)
        }}
      >
        {/*top*/}
        <div css={css`display: flex;
          justify-content: space-between`}>
          <span css={css`
            line-height: 24px;
            font-size: 16px;
            font-family: Poppins, serif;
            font-style: normal;
            font-weight: 600;
            color: #7699FC;
          `}>{info.method}</span>
          <span css={css`
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            font-weight: bold;
            background-color: #2EC13D;
            color: #FFFFFF;
            border-radius: 50%`}>{info.receive!.length}</span>
        </div>
        {/*  route*/}
        <div css={css`
          color: #FFFFFF;
          margin-top: 14px;
          font-weight: bold;
          font-size: 14px`}>
          <span>{info.route}</span>
        </div>
        {/*  data*/}
        <div css={css`padding: 10px 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between`}>
          <span css={css`max-width: 70%;
            display: inline-block;
            color: #FFFFFF54;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`}>{info.receive![0]?.data==='{}'?<span css={css`color: #FFFFFF54`}>Empty</span>:info.receive![0]?.data}</span>
          <span css={
            css
              ` color: #7699FC;
                font-weight: bold;
                cursor: pointer;
              `
          } onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            const nanoID = nanoid()
            store.dispatch(addRequestItem({...info, id: nanoID, receive: [],metadata:'',data:''}))
            navigate(nanoID)
          }}>COPY</span>
        </div>
      </div>
    </div>
  );
}
export default SideBarItem
