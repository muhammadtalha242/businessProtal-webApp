import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { GREEN_PRIMARY, GREY_PRIMARY, GREY_SECONDARY, GREY_TERIARY, RED_PRIMARY, WHITE } from '../../styles/colors';

interface props {
  label?: string;
  value?: any;
  setValue?: Function;
  placeholder?: string;
  name?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  bordered?: boolean;
  padding?: number;
  disabled?: boolean;
  height?: number;
  allowClear?: boolean;
  sliderContainerProps?: ISliderContainerProps;
}

interface ISliderContainerProps {
  marginBottom?: number | undefined;
  padding?: number | undefined;
  height?: number | undefined;
}

const SliderContainer = styled(Slider)``;

const SliderInputContainer = styled.div<ISliderContainerProps>`
  margin-bottom: 0px;
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
  text-align: start;
`;

const SliderInput: React.FC<props> = (props) => {
  const onChange = (newValue: number): void => {
    if (props.setValue) props.setValue({ name: props.name, value: newValue });
  };

  return (
    <SliderInputContainer {...props.sliderContainerProps}>
      {props.label && <div className="label-container">{props.label && <Label>{props.label}</Label>}</div>}
      <SliderContainer defaultValue={30} value={props.value} onChange={onChange} />
    </SliderInputContainer>
  );
};
export default SliderInput;
