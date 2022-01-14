/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";
import {store} from "../../store/store";
import {addRequestItem, RequestSliceItem} from "../../store/slice/RequestSlice";
import {nanoid} from "nanoid";
import SideBarItem from "../SideBarItem/SideBarItem";
import React, {useEffect, useState} from "react";
import Sider from "antd/es/layout/Sider";
import './css/index.css'
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import {useLocation, useParams} from "react-router-dom";

type props = {
  requestItems: RequestSliceItem[]
}
const SideList = ({requestItems}: props) => {
  let { pathname } = useLocation();
  pathname=pathname.slice(1)
  console.log(pathname)
  const [current,setCurrent]=useState('')
  return (
    <Sider
      css={
        css`
          border: 1px solid #000000;
          overflow: auto;

          &::-webkit-scrollbar {
            display: none
          }

          background-color: #252730;
          min-width: 336px !important;
          padding: 0 !important;
        `
      }
    >
      <div css={css`
        position: sticky;
        top: 0;
        height: 44px;
        margin: 20px 20px 20px 20px;
      `
      }
           onClick={() => {
             store.dispatch(addRequestItem({
               id: `${nanoid()}`,
               metadata: '',
               route: '/xxx/xxx',
               data: '',
               receive: [],
               method: 'requestStream'
             }))
           }}
      >
        <div css={
          css`
            height: 44px;
            text-align: center;
            line-height: 44px;
            font-family: Poppins, serif;
            font-style: normal;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
            background-color: #7297FC;
            border-radius: 3px;
          `}>
          + Add Request
        </div>
      </div>
      {/*SideBar*/}
      <TransitionGroup>
        {
          requestItems.map((item, index) => (
            <CSSTransition
              key={item.id}
              timeout={1000}
              classNames={"item"}
              unmountOnExit
            >
              <div
                key={item.id}>
              <SideBarItem path={pathname} info={item}/>
              </div>
            </CSSTransition>
          ))
        }
      </TransitionGroup>
    </Sider>
  )
}
export default SideList
