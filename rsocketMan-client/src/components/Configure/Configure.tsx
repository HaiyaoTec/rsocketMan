/** @jsxImportSource @emotion/react */
import {Modal} from 'antd';
import React, {FC, useState} from "react";
import FormData from "../FormData/FormData";
import './css/index.css'
const Configure: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {/*<Button type="primary" onClick={showModal}>*/}
      {/*  Open Modal*/}
      {/*</Button>*/}
      <Modal
        title="Configure connection" centered visible={isModalVisible} closeIcon onOk={handleOk}
        maskClosable={false} keyboard={false}
        footer={null}
      >
        {/*// @ts-ignore*/}
        <FormData setIsModalVisible={setIsModalVisible}/>
      </Modal>
    </>
  );
}

export default Configure
