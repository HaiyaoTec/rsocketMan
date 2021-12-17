/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {Modal, Button} from 'antd';
import React, {FC, useState} from "react";

const Header: FC = () => {
  return (
    <>
      <h1
        css={css`
          background-color: #393f44;
          color: #FFFFFF;
          text-indent: 2em;
          margin: 0;
        `}>RSocketMan</h1>
    </>
  );
}

export default Header
