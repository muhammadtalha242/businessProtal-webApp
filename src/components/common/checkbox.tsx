import React, { ReactNode } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface Props {
  setValue?: Function;
  text?: string;
  value?: boolean;
  name?: string;
  children?: ReactNode;
}

const CustomCheckbox: React.FC<Props> = (props) => {
  const onChange = (e: CheckboxChangeEvent) => {
    if (props.setValue) props.setValue({ name: props.name, value: e.target.checked });
  };

  return <Checkbox checked={props.value} onChange={onChange} {...props} />;
};

export default CustomCheckbox;
