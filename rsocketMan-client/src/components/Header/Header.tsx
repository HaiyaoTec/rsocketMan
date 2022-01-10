/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import {Modal, Button} from 'antd';
import React, {FC, useState} from "react";
import GitHubButton from 'react-github-btn'
import './css/index.css'
const Header: FC = () => {
  return (
    <div
      css={css`
          background-color: #252730;
          color: #678FFB;
          font-family: Poppins,serif;
          font-weight: 800;
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          line-height: 64px;
          height: 64px;
          margin: 0;
        `}
    >
      <span css={css`padding-right: 10px;font-size: 26px;`}>🤖 RSocketMan</span>
      <span>
        <span css={css`margin-right: 10px`}><GitHubButton href="http://github.com/HaiyaoTec/rsocketMan/issues" data-color-scheme="no-preference: dark; light: dark; dark: dark;" data-icon="octicon-issue-opened" aria-label="Issue HaiyaoTec/rsocketMan on GitHub">Issue</GitHubButton></span>
        <GitHubButton href="http://github.com/HaiyaoTec/rsocketMan" data-show-count="true" aria-label="Star HaiyaoTec/rsocketMan on GitHub">Star</GitHubButton>
      </span>
    </div>
  );
}

export default Header
