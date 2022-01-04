/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {Modal, Button} from 'antd';
import React, {FC, useState} from "react";
import GitHubButton from 'react-github-btn'
const Header: FC = () => {
  return (
    <div
      css={css`
          background-color: #393f44;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          padding: 0 55px;
          font-size: 36px;
          line-height: 60px;
          height: 60px;
          margin: 0;
        `}
    >
      <span css={css`border-right: 1px solid #000000;padding-right: 10px`}>RSocketMan 🤖</span>
      <span>
        <span css={css`margin-right: 10px`}><GitHubButton href="https://github.com/HaiyaoTec/rsocketMan/issues" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-issue-opened" aria-label="Issue HaiyaoTec/rsocketMan on GitHub">Issue</GitHubButton></span>
        <GitHubButton href="https://github.com/HaiyaoTec/rsocketMan" data-show-count="true" aria-label="Star HaiyaoTec/rsocketMan on GitHub">Star</GitHubButton>
      </span>
    </div>
  );
}

export default Header
