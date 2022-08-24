import React, { ReactNode } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { DatePicker } from 'antd';
import moment from 'moment';
import { GREY_PRIMARY, GREEN_PRIMARY, GREY_SECONDARY, RED_PRIMARY, GREY_TERIARY } from '../../styles/colors';

interface Props {
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
  datePickerContainerProps?: IDatePickerContainerProps;
  footer?: () => ReactNode;
}

interface IDatePickerContainerProps {
  marginBottom?: number | undefined;
  padding?: number | undefined;
  height?: number | undefined;
}

const DatePickerContainer = styled.div<IDatePickerContainerProps>`
  margin-bottom: ${(props) => (props.marginBottom || props.marginBottom === 0 ? props.marginBottom : 32)}px;
  font-size: 14px;

  .date-picker {
    border: 1px solid ${GREY_PRIMARY};
    border-radius: 8px;
    height: ${(props) => (props.height || props.height === 0 ? props.height : 48)}px;
    width: 100%;
    padding: ${(props) => (props.padding || props.padding === 0 ? props.padding : 12)}px;
    outline: none;
    color: ${GREY_SECONDARY};

    &:focus {
      border: 1px solid ${GREEN_PRIMARY};
    }

    &.error {
      border: 1px solid ${RED_PRIMARY};
    }
  }

  input:disabled {
    color: ${GREY_TERIARY};
    background: none;
    cursor: default;
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

const CustomDateTimePicker: React.FC<Props> = (props) => {
  const dateFormat = 'DD.MM.YYYY';
  const onChange = (date: any, dateString: string): void => {
    if (props.setValue) props.setValue({ name: props.name, value: date.format(dateFormat) });
  };

  return (
    <DatePickerContainer {...props.datePickerContainerProps}>
      {props.label && <div className="label-container">{props.label && <Label>{props.label}</Label>}</div>}
      <div className={classNames({ error: props.error })}>
        <DatePicker
          className="date-picker"
          onChange={onChange}
          placeholder={props.placeholder}
          name={props.name}
          size={'small'}
          bordered={props.bordered}
          suffixIcon={null}
          value={props.value && moment(props.value, dateFormat)}
          defaultValue={props.value && moment(props.value, dateFormat)}
          format={dateFormat}
          disabled={props.disabled}
          allowClear={props.allowClear ?? true}
        />
      </div>
      {props.errorMessage && <div className="error-message">{props.errorMessage}</div>}
    </DatePickerContainer>
  );
};

export default CustomDateTimePicker;
