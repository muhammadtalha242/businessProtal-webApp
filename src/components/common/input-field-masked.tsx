import React from 'react';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import InputMask from 'react-input-mask';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY, WHITE, BLUE_TERTIARY } from '../../styles/colors';

export interface IInputMask {
  maskValue: string;
  maskStructure: string;
}

interface Props {
  inputMask: IInputMask;
  label?: React.ReactNode | string;
  disabled?: boolean;
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
  defaultValue?: string;
  status?: '' | 'error' | 'warning';
  showCount?: boolean;
  maxLength?: number;
  toolTip?: string;
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
    // border-radius: 8px;
    height: ${(props) => (props.height || props.height === 0 ? props.height : 48)}px;
    width: ${(props) => (props.inputWidth || props.inputWidth === 0 ? props.inputWidth + 'px' : '100%')};
    padding: ${(props) => (props.padding ? props.padding : `16px 12px`)};
    outline: none;
    color: ${GREY_SECONDARY};

    &::placeholder {
      color: #bfbfbf;
    }

    // &::before{
    //   border: 1px solid ${RED_PRIMARY};
    // }

    // &:focus {
    //   border: 1px solid ${BLUE_TERTIARY};
    // }

    // &.error {
    //   border: 1px solid ${RED_PRIMARY};
    // }

    &:disabled {
      color: ${GREY_SECONDARY};
      background: none;
      cursor: default;
    }
  }

  TextArea {
    border: ${(props) => props.bordered && `1px solid ${GREY_PRIMARY}`};
    height: 48px;
    width: ${(props) => (props.inputWidth || props.inputWidth === 0 ? props.inputWidth + 'px' : '100%')};
    overflow: hidden;
    outline: none;
    color: ${GREY_SECONDARY};

    &::placeholder {
      color: #bfbfbf;
    }

    &:focus {
      border: 1px solid ${GREEN_PRIMARY};
      border-radius: 8px;
      background-color: ${WHITE};
    }

    &.error {
      border: 1px solid ${RED_PRIMARY};
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
const OPS: { [key: string]: number } = { yy: 8760, MM: 730, dd: 24, hh: 1, mm: 0.0166667, ss: 0.000277778 };

const InputFieldMask: React.FC<Props> = (props) => {
  const inputProps = { ...props };

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {

    if (props.setValue)
      props.setValue({
        name: props.name,
        value: (e.target as HTMLInputElement).value,
      });
  };

  return (
    <Tooltip title={props.toolTip}>
      <InputFieldContainer {...props.inputFieldContainerProps}>
        {props.label && (
          <div className="label-container">
            {props.label && <Label>{props.label}</Label>}
            {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
          </div>
        )}
        <div>
          <InputMask
            mask={props.inputMask.maskValue}
            className={classNames({ error: props.error })}
            placeholder={props.placeholder}
            name={props.name}
            onChange={onChange}
            bordered={props.bordered}
            autoComplete="off"
            {...inputProps}
          />

          {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
        </div>
        {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
      </InputFieldContainer>
    </Tooltip>
  );
};

export default InputFieldMask;
