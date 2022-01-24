/** @jsxImportSource @emotion/react */
import {css, jsx} from "@emotion/react";
import React, {FC, useState} from "react";
import arrow_down from './assets/arrow_down.png'
import arrow_upward from './assets/arrow_upward.png'


type Props = {
  index: number;
  item: any;
  setDataItem: any
}


const MessageItem: ({index, item, setDataItem}: Props) => JSX.Element = ({index, item, setDataItem}) => {
  return (
    <div
      key={index}
      css={css`
        width: 464px;
        background-color: #1f2128;
        margin-bottom: 15px;
        cursor: pointer;
        border-radius: 16px;

        &:hover {
          background-color: #384571;
        }

      `}
      onClick={() => {
        // @ts-ignore
        setDataItem(item);
      }}
    >
      <div css={css`display: flex`}>
        {/*left*/}
        <div
          css={css`display: flex;justify-content: center;align-items: center;padding: 25px 20px`}
        ><img src={item.isSend?arrow_upward:arrow_down} alt={"arrow"}/>
        </div>

        {/*right*/}
        {/*  item top*/}
        <div css={css`flex: 1`}>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              padding: 14px 16px 6px 0;
            `}
          >
        <span>
          <span
            css={css`
              display: inline-block;
              background-color: #FFFFFF2E;
              margin-right: 10px;
              color: #ffffff;
              width: 17px;
              height: 17px;
              line-height: 17px;
              text-align: center;
              border-radius: 3px;
              font-family: Poppins, serif;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;

            `}
          >
            {index}
          </span>
          {/*消息是正确还是错误的*/}
          {item?.success ? (
            <span
              css={css`
                color: #2EC13D;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `}
            >
              OK
            </span>
          ) : (
            <span
              css={css`
                color: #FB7777;
                font-family: Poppins, serif;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
              `}
            >
              ERROR
            </span>
          )}
        </span>
            <span
              css={css`
                color: #FFFFFF54;
                font-family: Poppins, serif;
                font-weight: normal;
                font-size: 12px;
                line-height: 12px;
              `}
            >
          {item.date}
        </span>
          </div>
          {/*  item bottom*/}
          <div
            css={css`
              display: flex;
              width: 100%;
              justify-content: space-between;
              padding: 6px 16px 14px 0;
              font-weight: bold;
              align-items: center;
            `}
          >
        <span
          css={css`
            max-width: 190px;
            overflow: hidden;
            color: #ffffff;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {/*{item?.data}*/}
          {item?.data==="{}"?<span css={css`color: #FFFFFF54`}>Empty</span>:item?.data}
        </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageItem;
