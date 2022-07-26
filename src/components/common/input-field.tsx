import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Input } from 'antd';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY, GREY_QUATERNARY, WHITE, BLUE_TERTIARY } from '../../styles/colors';
import { IInputFieldProps, INPUT_PROPS_COMMON } from '../../interfaces';

const { TextArea } = Input;

interface Props extends INPUT_PROPS_COMMON {
  type: string;
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

const InputField: React.FC<Props> = (props) => {
  const [iconActive, setIconActive] = useState(false);
  const inputProps = { ...props };

  const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void => {
    if (props.setValue)
      props.setValue({
        name: props.name,
        value: (e.target as HTMLInputElement).value,
      });
  };

  if (props.activeIcon && iconActive) {
    inputProps.type = 'text';
  }
  const InputField =
    inputProps.type === 'TextArea' ? (
      <TextArea autoSize className={classNames({ error: props.error })} placeholder={props.placeholder} name={props.name} autoComplete="off" onChange={onChange} {...inputProps} />
    ) : (
      <Input className={classNames({ error: props.error })} placeholder={props.placeholder} name={props.name} onChange={onChange} bordered={props.bordered} autoComplete="off" {...inputProps} />
    );
  return (
    <InputFieldContainer {...props.inputFieldContainerProps}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div>
        {InputField}
        {props.activeIcon && props.deactiveIcon && <img src={iconActive ? props.deactiveIcon : props.activeIcon} onClick={() => setIconActive(!iconActive)} className="icon" alt="input-icon" />}
        {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </InputFieldContainer>
  );
};

export default InputField;
