import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Select } from 'antd';

import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY } from '../../styles/colors';

export interface IOptionType {
  value: string;
  label: string;
}

interface Props {
  label?: React.ReactNode | string;
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
  lineHeight?: number;
  options: IOptionType[];
  disabled?: boolean;
  loading?: boolean;
  defaultValue?: string;
  showSearch?: boolean;
  filterOption?: boolean;
  selectInputStyleProps?: ISelectContainerProps;
}

interface ISelectContainerProps {
  lineHeight?: number;
  marginBottom?: number;
  padding?: number | string;
  width?: string;
}

const SelectFieldContainer = styled.div<ISelectContainerProps>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .label-container {
    display: flex;
    justify-content: space-between;
    a {
      color: ${GREEN_PRIMARY};
    }
  }

  .icon {
    position: absolute;
    width: 20px;
    height: 16px;
    margin-top: 16px;
    margin-left: -36px;
  }

  .ant-select-selection-placeholder {
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
    }
  }

  .select {
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: ${(props) => (props.lineHeight || props.lineHeight === 0 ? props.lineHeight : 48)}px;
    width: 100%;
    padding: 6px 0px;
    outline: none;
    color: ${GREY_SECONDARY};

    &:focus {
      border: 1px solid ${GREEN_PRIMARY};
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

export const Label = styled.div<{ lineHeight: number | undefined }>`
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: ${GREY_SECONDARY};
  margin-bottom: 8px;
`;

const SelectField: React.FC<Props> = (props) => {
  const [iconActive, setIconActive] = useState(false);

  const onChange = (value: string): void => {
    if (props.setValue) props.setValue({ name: props.name, value: value });
  };

  const onFilterOptions = (input: any, option: any): boolean => {
    if (props.filterOption) return (option!.value as unknown as string).toLowerCase().includes(input.toLowerCase());
    else return false;
  };

  return (
    <SelectFieldContainer marginBottom={props.marginBottom} {...props.selectInputStyleProps}>
      {props.label && (
        <div className="label-container">
          {props.label && <Label lineHeight={props.lineHeight}>{props.label}</Label>}
          {props.link && <Link to={props.link}>{props.linkLabel}</Link>}
        </div>
      )}
      <div className={classNames({ error: props.error })}>
        <Select 
          showSearch={props.showSearch}
          className="select"
          placeholder={props.placeholder}
          name={props.name}
          onChange={onChange}
          bordered={false}
          defaultValue={props.defaultValue}
          {...props}
          loading={props.loading}
          filterOption={onFilterOptions}
        />
        {props.activeIcon && props.deactiveIcon && <img src={iconActive ? props.deactiveIcon : props.activeIcon} onClick={() => setIconActive(!iconActive)} className="icon" alt="input-icon" />}
        {props.icon && <img src={props.icon} className="icon" alt="input-icon" />}
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </SelectFieldContainer>
  );
};

export default SelectField;
