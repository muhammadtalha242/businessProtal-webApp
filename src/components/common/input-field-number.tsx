import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { InputNumber } from 'antd';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY, WHITE, BLUE_TERTIARY } from '../../styles/colors';

interface Props {
  label?: React.ReactNode | string;
  disabled?: boolean;
  type: string;
  value?: any;
  setValue?: Function;
  placeholder?: string;
  name?: string;
  linkLabel?: string;
  link?: string;
  deactiveIcon?: string;
  activeIcon?: string;
  icon?: string;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  iconWidth?: number;
  inputWidth?: number;
  iconLeft?: number;
  bordered?: boolean;
  height?: number;
  padding?: string;
  defaultValue?: number;
  precision?: number;
  status?: '' | 'error' | 'warning';
  inputFieldContainerProps?: IInputFieldProps;
}

interface IInputFieldProps {
  marginBottom?: number | undefined;
  iconWidth?: number | undefined;
  inputWidth?: number | undefined;
  iconLeft?: number | undefined;
  bordered?: boolean | undefined;
  height?: number | undefined;
  padding?: string | undefined;
}

const InputFieldContainer = styled.div<IInputFieldProps>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .ant-input-number {
    width: -webkit-fill-available;
  }

  .label-container {
    display: flex;
    justify-content: space-between;

    a {
      color: ${BLUE_TERTIARY};
    }
  }

  .icon {
    position: absolute;
    --widthIcon: ${(props) => (props.iconWidth || props.iconWidth === 0 ? props.iconWidth : 20)}px;
    width: var(--widthIcon);
    height: 16px;
    margin-top: 16px;
    margin-left: calc(0px - calc(var(--widthIcon) + ${(props) => props.iconLeft || 16}px));
  }

  input {
    border: ${(props) => props.bordered && `1px solid ${GREY_PRIMARY}`};
    height: ${(props) => (props.height || props.height === 0 ? props.height : 48)}px;
    width: ${(props) => (props.inputWidth || props.inputWidth === 0 ? props.inputWidth + 'px' : '100%')};
    padding: ${(props) => (props.padding ? props.padding : `16px 12px`)};
    outline: none;
    color: ${GREY_SECONDARY};

    &::placeholder {
      color: #bfbfbf;
    }

    &:focus {
      border: 1px solid ${BLUE_TERTIARY};
    }

    &.error {
      border: 1px solid ${RED_PRIMARY};
    }

    &:disabled {
      color: ${GREY_SECONDARY};
      background: none;
      cursor: default;
    }
  }

  .error-message {
    position: absolute;
    color: ${RED_PRIMARY};
    margin-top: 4px;
    font-size: 12px;
  }
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const InputFieldNumber: React.FC<Props> = (props) => {
  const [iconActive, setIconActive] = useState(false);
  const inputProps = { ...props };

  const onChange = (value: number): void => {
    if (props.setValue)
      props.setValue({
        name: props.name,
        value,
      });
  };

  if (props.activeIcon && iconActive) {
    inputProps.type = 'text';
  }

  return (
    <InputFieldContainer {...props.inputFieldContainerProps}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div>
        <InputNumber
          className={classNames({ error: props.error })}
          placeholder={props.placeholder}
          name={props.name}
          onChange={onChange}
          bordered={props.bordered}
          autoComplete="off"
          precision={props.precision}
          {...inputProps}
        />

        {props.activeIcon && props.deactiveIcon && <img src={iconActive ? props.deactiveIcon : props.activeIcon} onClick={() => setIconActive(!iconActive)} className="icon" alt="input-icon" />}
        {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </InputFieldContainer>
  );
};

export default InputFieldNumber;
