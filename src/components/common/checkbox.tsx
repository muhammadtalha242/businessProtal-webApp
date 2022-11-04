import React, { ReactNode } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styled from 'styled-components';
import { GREY_SECONDARY } from '../../styles/colors';

interface Props {
  label?: React.ReactNode | string;
  setValue?: Function;
  text?: string;
  value?: boolean;
  name?: string;
  children?: ReactNode;
}

export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const CustomCheckbox: React.FC<Props> = (props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    if (props.setValue) props.setValue({ name: props.name, value: e.target.checked });
  };

  return (
    <>
      {props.label && <div className="label-container">{props.label && <Label>{props.label}</Label>}</div>}
      <Checkbox checked={props.value} onChange={onChange} {...props} />
    </>
  );
};

export default CustomCheckbox;
