import React, { ReactNode } from "react";
import { Modal } from "antd";
import styled from "styled-components";

interface props {
  title: string | ReactNode;
  visible: boolean;
  onOk?: (e: any) => void;
  onCancel?: (e: any) => void;
  width: number;
  footer?: ReactNode;
  children?: ReactNode;
}

const ModalContainer = styled.div`
  .test {
    border: 1px solid;
  }
`;

const CustomModal: React.FC<props> = (props) => {
  return (
    <ModalContainer>
      <Modal centered {...props} className="test" destroyOnClose>
        {props.children}
      </Modal>
    </ModalContainer>
  );
};

export default CustomModal;
