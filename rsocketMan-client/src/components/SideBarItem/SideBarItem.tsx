/** @jsxImportSource @emotion/react */
import {css, jsx} from '@emotion/react'
import React, {FC, useState} from "react";
import {Form, Input, Button, Radio, Select, message} from 'antd';
import {FormInstance} from "antd/es";
import {useDispatch, useSelector} from 'react-redux'
import {configure, updateRScoketInstance} from "../../store/slice/ConnectionSlice";
import {createRSocketClient} from "../../utils";

const SideBarItem: FC = ({setIsModalVisible}: any) => {

  return (
    <>
      <div>12313</div>
    </>
  );
}
export default SideBarItem
