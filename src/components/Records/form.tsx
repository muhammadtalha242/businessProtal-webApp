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
      const updateState: any = { ...values };
      updateState[fieldName] = value;
      setValues(updateState);
    };

  const validateValues = (): boolean => {
    let isValid = true;
    let fields = '';
    Object.entries(props.formData).forEach((field: [string, IFeild]) => {
      const [fieldCode, fieldData] = field;
      const { settings: fieldSettings, name } = fieldData;
      if (fieldSettings && fieldSettings.isRequired && values[fieldCode] === '') {
        fields = fields + ' ' + name;
        isValid = false;
      }
    });
    if (!isValid) {
      setIsError(true);
      setErr(`${fields} Required`);
    }
    return isValid;
  };

  const onSave = () => {
    try {
      console.log(values);
      console.log(props.formData);
      console.log(validateValues());
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
      {isError && (
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

              if (fieldData.dataType === 'Yes/No') {
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
                    />
                  </Col>
                );
              } else if (fieldData.dataType === 'Date') {
                return (
                  <Col span={4}>
                    <InputDate
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={fieldData.name}
                      placeholder={fieldData.defaultValue}
                      datePickerContainerProps={{ marginBottom: 0 }}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === 'Progress') {
                return (
                  <Col span={8}>
                    <SliderInput setValue={onInputChange(fieldCode)} value={values[fieldCode]} name={fieldData.name} label={fieldData.name} allowClear={false} />
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
