import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface Props {
  onChange?: (e: CheckboxChangeEvent) => void;
  text?: string;
  checked?: boolean;
}

const CustomCheckbox: React.FC<Props> = (props) => {
  return (
    <Checkbox checked={props.checked} onChange={props.onChange}>
      {props.text}
    </Checkbox>
  );
};

export default CustomCheckbox;
