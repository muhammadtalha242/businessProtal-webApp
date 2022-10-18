import { Alert, Col, Divider, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { GREEN_PRIMARY, RED_PRIMARY } from '../../styles/colors';
import { OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import { VerticalSpace } from '../common/space';
import { IFeild, IFeilds } from '../Entity/form';
import { EntityRecordFormContainer } from './container';
import InputDate from '../common/date-input';
import SelectField, { IOptionType } from '../common/select';
import SliderInput from '../common/slider-input';
import { DATA_TYPES_MAPPER } from '../../constants';
import InputFieldNumber from '../common/input-field-number';
import { error } from '../common/message';
import { validateEmail } from '../../utils/validate';
import { DATA_TYPES } from '../../constants/entiy';
import InputFieldMask from '../common/input-field-masked';
interface props {
  setShowForm: (e: boolean) => void;
  onSave: (entityRecords: {}) => void;
  formData: IFeilds;
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
  recordSelected: any;
}

const YES_NO_OPTIONS: IOptionType[] = [
  { label: '', value: '' },
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const RecordForm: React.FC<props> = (props) => {
  const [values, setValues] = useState(props.isEdit ? props.recordSelected : {});
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    if (props.isEdit) setValues(props.recordSelected);
    else {
      const state: any = {};
      Object.entries(props.formData).forEach((field: [string, IFeild], index: number) => {
        state[field[0]] = field[1].defaultValue;
      });

      setValues({ ...state });
    }
  }, [props.recordSelected]);

  const onInputChange =
    (fieldName: string) =>
    ({ name, value }: { name: string; value: string }) => {
      validateInput({ fieldName, name, value });
      const updateState: any = { ...values };
      updateState[fieldName] = value;
      setValues(updateState);
    };

  const validateInput = ({ fieldName, name, value }: { fieldName: string; name: string; value: string }) => {
    const { settings: fieldSettings, dataType } = props.formData[fieldName];
    if (fieldSettings && fieldSettings.isRequired && (value === '' || value === null)) {
      setErrors({ ...errors, [name]: `${name} is required.` });
    } else if (dataType === DATA_TYPES.EMAIL && !validateEmail(value)) {
      setErrors({ ...errors, [name]: `Email is not valid.` });
    } else {
      setIsError(false);
      setErr(``);
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateValues = (): boolean => {
    let isValid = true;
    Object.entries(props.formData).forEach((field: [string, IFeild]) => {
      const [fieldCode, fieldData] = field;
      const { settings: fieldSettings, name } = fieldData;
      if ((fieldSettings && fieldSettings.isRequired && values[fieldCode] === '') || (!!errors[name] && errors[name] !== '')) {
        isValid = false;
        setIsError(true);
        setErr(`Error.`);
      }
    });
    return isValid;
  };

  const onSave = () => {
    try {
      console.log(values);
      console.log(props.formData);
      if (validateValues()) {
        props.onSave(values);
        props.setShowForm(false);
        props.setIsEdit(false);
      }
    } catch (e: any) {
      error(`Unable to add record ${e}`);
    }
  };

  const onCancle = () => {
    props.setIsEdit(false);
    setValues([]);
    props.setShowForm(false);
  };

  return (
    <EntityRecordFormContainer>
      <div className="header">
        <div className="text">Add Record</div>
        <img onClick={onCancle} src={`/images/icons/close.svg`} alt="close" />
      </div>
      {isError && err !== '' && (
        <>
          <Alert
            style={{ borderRadius: 16, textAlign: 'left' }}
            message="Error"
            description={<div>{err}</div>}
            type="error"
            onClose={() => {
              setIsError(false);
              setErr('');
            }}
            closable
          />
          <VerticalSpace height={32} />
        </>
      )}

      <Row align={'middle'} gutter={[24, 24]}>
        {props.formData &&
          Object.entries(props.formData)
            .filter((field: [string, IFeild]) => field[1].isDisplayForRecords === true)
            .map((field: [string, IFeild], index: number) => {
              const fieldCode = field[0];
              const fieldData = field[1];

              if (fieldData.dataType === DATA_TYPES.YES_NO) {
                return (
                  <Col span={4}>
                    <SelectField
                      options={YES_NO_OPTIONS}
                      value={values[fieldCode]}
                      label={fieldData.name}
                      setValue={onInputChange(fieldCode)}
                      placeholder="Choose options"
                      name={fieldData.name}
                      key={fieldData.name}
                      lineHeight={0}
                      marginBottom={0}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.DATE) {
                return (
                  <Col span={4}>
                    <InputDate
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      placeholder={fieldData.defaultValue}
                      datePickerContainerProps={{ marginBottom: 0 }}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.PROGRESS) {
                return (
                  <Col span={8}>
                    <SliderInput
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      allowClear={false}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.PHONE) {
                return (
                  <Col span={8}>
                    <InputFieldMask
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      defaultValue={fieldData.defaultValue}
                      inputFieldContainerProps={{ marginBottom: 8 }}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                      mask={!!fieldData.settings.format && fieldData.settings.format}
                    />
                  </Col>
                );
              } else if (DATA_TYPES_MAPPER[fieldData.dataType] === 'string') {
                return (
                  <Col span={8}>
                    <InputField
                      type="input"
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      defaultValue={fieldData.defaultValue}
                      inputFieldContainerProps={{ marginBottom: 8 }}
                      showCount={!!fieldData.settings.fieldLength && parseInt(fieldData.settings.fieldLength) > 0}
                      maxLength={!!fieldData.settings.fieldLength && parseInt(fieldData.settings.fieldLength) > 0 && fieldData.settings.fieldLength}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (DATA_TYPES_MAPPER[fieldData.dataType] === 'number') {
                return (
                  <Col span={8}>
                    <InputFieldNumber
                      type="input"
                      precision={fieldData.settings && fieldData.settings.decimals}
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      defaultValue={parseInt(fieldData.defaultValue)}
                      inputFieldContainerProps={{ marginBottom: 8 }}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                      addonBefore={!!fieldData.settings.prefix && fieldData.settings.prefix}
                    />
                  </Col>
                );
              } else {
                return <>{fieldData.dataType} to be implemented</>;
              }
            })}
      </Row>

      <VerticalSpace height={16} />
      <Divider />
      <div className="footer">
        <div className="footer-left">
          <OutlinedButton color={RED_PRIMARY} onClick={onCancle}>
            Cancel
          </OutlinedButton>
        </div>
        <div className="footer-right">
          <OutlinedButton color={GREEN_PRIMARY} onClick={onSave} textColor={GREEN_PRIMARY} loading={false}>
            Save
          </OutlinedButton>
        </div>
      </div>
    </EntityRecordFormContainer>
  );
};

export default RecordForm;
