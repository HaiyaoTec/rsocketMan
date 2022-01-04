/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useState} from "react";
import {Form, Input, Button, Radio, Select, message} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {configure, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {addRequestItem, RequestSliceItem} from "../../store/slice/RequestSlice";
import {store} from "../../store/store";
import {nanoid} from "nanoid";

type prosType = {
  info: RequestSliceItem
}
const SideBarItem: FC<prosType> = ({info}) => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  return (
    <div css={css`& > :hover {
      background-color: #1c1e22
    }`}>
      <div
        css={
          css`
            width: 100%;
            height: 150px;
            background-color: #31383e;
            padding: 16px;
            border: 1px solid #000000;
            border-left: 0;
            border-right: 0;
            margin-top: -2px;
            cursor: pointer;
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
          <span css={css`padding: 5px;
            background-color: #0994fb;
            color: #FFFFFF;
            border-radius: 6px`}>{info.method}</span>
          <span css={css`padding: 5px 20px;
            background-color: #20d230;
            color: #FFFFFF;
            border-radius: 6px`}>{info.receive!.length}</span>
        </div>
        {/*  route*/}
        <div css={css`
          padding: 10px 0;
          color: #FFFFFF;
          font-size: 20px`}>
          <span>{info.route}</span>
        </div>
        {/*  data*/}
        <div css={css`padding: 10px 0;
          font-size: 20px;
          display: flex;
          justify-content: space-between`}>
          <span css={css`max-width: 70%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;`}>{info.data}</span>
          <span css={
            css
              ` color: #2e5bf9;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
              `
          } onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            store.dispatch(addRequestItem({...info, id: nanoid(), receive: []}))
          }}>COPY</span>
        </div>
      </div>
    </div>
  );
}
export default SideBarItem
