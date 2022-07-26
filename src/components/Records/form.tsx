import { Alert, Col, Divider, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

import { GREEN_PRIMARY, RED_PRIMARY } from '../../styles/colors';
import { OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import { VerticalSpace } from '../common/space';
import { IFeild, IFeilds } from '../Entity/form';
import { EntityRecordFormContainer, FieldLabelContainer } from './container';
import InputDate from '../common/date-input';
import SelectField, { IOptionType } from '../common/select';
import { DATA_TYPES_MAPPER } from '../../constants';
import InputFieldNumber from '../common/input-field-number';
import { error } from '../common/message';
import { validateEmail } from '../../utils/validate';
import { DATA_TYPES } from '../../constants/entiy';
import InputFieldMask, { IInputMask } from '../common/input-field-masked';
import FileUpload, { FILES_TYPES } from '../common/file-upload';
import InputRange from '../common/slider-input';
import GoogleMaps from '../common/google-maps';

interface props {
  setShowForm: (e: boolean) => void;
  onSave: (entityRecords: {}) => void;
  formData: IFeilds;
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
  recordSelected: any;
  loading: boolean;
}

const YES_NO_OPTIONS: IOptionType[] = [
  { label: '', value: '' },
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const PublicIcon: React.FC<{ isPublic: boolean }> = ({ isPublic }) => {
  return <>{isPublic && <img src={`/images/icons/public_icon.svg`} width={20} height={20} alt="public" />}</>;
};

const RecordForm: React.FC<props> = (props) => {
  const [values, setValues] = useState(props.isEdit ? props.recordSelected : {});
  const [currentFormData, setFormData] = useState<FormData>(props.isEdit ? props.recordSelected : new FormData());
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (props.isEdit) {
      setValues(props.recordSelected);
      const editFormData: any = new FormData();
      Object.entries(props.recordSelected).forEach((field: [string, any], index: number) => {
        editFormData.set(field[0], field[1]);
      });
      editFormData.delete('index');
      setFormData(editFormData);
    } else {
      const state: any = {};
      const updateFormData: any = currentFormData;
      Object.entries(props.formData).forEach((field: [string, IFeild], index: number) => {
        state[field[0]] = field[1].defaultValue;
        updateFormData.set(field[0], field[1].defaultValue);
      });
      setFormData(updateFormData);
      setValues({ ...state });
    }
  }, [props.recordSelected]);

  const onInputChange =
    (fieldName: string) =>
    ({ name, value }: { name: string; value: string }) => {
      validateInput({ fieldName, name, value });

      const updateFormData: any = currentFormData;
      updateFormData.set(fieldName, value);
      setFormData(updateFormData);

      const updateState: any = { ...values };
      updateState[fieldName] = value;
      setValues(updateState);
    };

  const onInputLocationChange =
    (fieldName: string) =>
    ({ name, value }: { name: string; value: string }) => {
      validateInput({ fieldName, name, value });

      const updateFormData: any = currentFormData;
      updateFormData.set(fieldName, value);
      setFormData(updateFormData);

      const updateState: any = { ...values };
      updateState[fieldName] = value;
      setValues(updateState);
    };

  const onInputFileChange =
    (fieldName: string) =>
    ({ name, value }: { name: string; value: any }) => {
      const updateFormData: any = currentFormData;
      updateFormData.delete(fieldName);
      value.forEach((file: File) => {
        updateFormData.append(fieldName, file);
      });

      setFormData(updateFormData);

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
    } else if ((dataType === DATA_TYPES.IMAGE || dataType === DATA_TYPES.DOCUMENT) && value.length <= 0) {
      setErrors({ ...errors, [name]: `Please Upload File.` });
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
        props.onSave(currentFormData);
        // props.setShowForm(false);
        // props.setIsEdit(false);
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
              let displayedField = <></>;
              if (fieldData.dataType === DATA_TYPES.YES_NO) {
                displayedField = (
                  <Col span={4}>
                    <SelectField
                      options={YES_NO_OPTIONS}
                      value={values[fieldCode]}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
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
                displayedField = (
                  <Col span={4}>
                    <InputDate
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      placeholder={fieldData.defaultValue}
                      datePickerContainerProps={{ marginBottom: 0 }}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.PROGRESS) {
                displayedField = (
                  <Col span={8}>
                    <InputRange
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      min="10"
                      max="100"
                      defaultValue={0}
                      name={fieldData.name}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.IMAGE) {
                displayedField = (
                  <Col span={8}>
                    <FileUpload
                      type={FILES_TYPES.images}
                      text="Images"
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      name={fieldCode}
                      multiple={true}
                      value={values[fieldCode]}
                      setValue={onInputFileChange(fieldCode)}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.DOCUMENT) {
                displayedField = (
                  <Col span={8}>
                    <FileUpload
                      type={FILES_TYPES.documents}
                      text="Documents"
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      name={fieldCode}
                      multiple={true}
                      value={values[fieldCode]}
                      setValue={onInputFileChange(fieldCode)}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.PHONE || fieldData.dataType === DATA_TYPES.DURATION) {
                let mask = '';
                let toolTip = '';
                if (fieldData.dataType === DATA_TYPES.PHONE) {
                  mask = !!fieldData.settings.format && fieldData.settings.format;
                } else if (fieldData.dataType === DATA_TYPES.DURATION) {
                  const x: { maskValue: string[]; maskStruct: string[] } = { maskValue: [], maskStruct: [] };
                  if (!!fieldData.settings.isYear && fieldData.settings.isYear) {
                    x.maskValue.push('99');
                    x.maskStruct.push('yy');
                  }
                  if (!!fieldData.settings.isMonths && fieldData.settings.isMonths) {
                    x.maskValue.push('99');
                    x.maskStruct.push('MM');
                  }
                  if (!!fieldData.settings.isDays && fieldData.settings.isDays) {
                    x.maskValue.push('999');
                    x.maskStruct.push('ddd');
                  }
                  if (!!fieldData.settings.isHours && fieldData.settings.isHours) {
                    x.maskValue.push('99');
                    x.maskStruct.push('hh');
                  }
                  if (!!fieldData.settings.isSeconds && fieldData.settings.isSeconds) {
                    x.maskValue.push('99');
                    x.maskStruct.push('ss');
                  }
                  mask = x.maskValue.join(':');
                  toolTip = x.maskStruct.join(':');
                }
                const MaskInput: IInputMask = {
                  maskValue: mask,
                  maskStructure: toolTip,
                };
                displayedField = (
                  <Col span={8}>
                    <InputFieldMask
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      placeholder={MaskInput.maskStructure}
                      defaultValue={fieldData.defaultValue}
                      inputFieldContainerProps={{ marginBottom: 8 }}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                      toolTip={MaskInput.maskStructure}
                      inputMask={MaskInput}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.TEXT_MULTI_LINE) {
                displayedField = (
                  <Col span={8}>
                    <InputField
                      type="TextArea"
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
                      defaultValue={fieldData.defaultValue}
                      inputFieldContainerProps={{ marginBottom: 8 }}
                      showCount={!!fieldData.settings.fieldLength && parseInt(fieldData.settings.fieldLength) > 0}
                      maxLength={!!fieldData.settings.fieldLength && parseInt(fieldData.settings.fieldLength) > 0 && fieldData.settings.fieldLength}
                      error={!!errors[fieldData.name]}
                      errorMessage={errors[fieldData.name]}
                    />
                  </Col>
                );
              } else if (fieldData.dataType === DATA_TYPES.LOCATION) {
                displayedField = (
                  <Col span={8}>
                    <GoogleMaps isEditable={true} setValue={onInputLocationChange(fieldCode)} value={values[fieldCode]} name={fieldData.name} />
                  </Col>
                );
              } else if (DATA_TYPES_MAPPER[fieldData.dataType] === 'string') {
                displayedField = (
                  <Col span={8}>
                    <InputField
                      type="input"
                      setValue={onInputChange(fieldCode)}
                      value={values[fieldCode]}
                      name={fieldData.name}
                      label={
                        <FieldLabelContainer>
                          <div className="title">{fieldData.name}</div>

                          <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                        </FieldLabelContainer>
                      }
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
                displayedField = (
                  <InputFieldNumber
                    type="input"
                    precision={fieldData.settings && fieldData.settings.decimals}
                    setValue={onInputChange(fieldCode)}
                    value={values[fieldCode]}
                    name={fieldData.name}
                    label={
                      <FieldLabelContainer>
                        <div className="title">{fieldData.name}</div>

                        <PublicIcon isPublic={fieldData.settings && fieldData.settings.isPublic} />
                      </FieldLabelContainer>
                    }
                    defaultValue={parseInt(fieldData.defaultValue)}
                    inputFieldContainerProps={{ marginBottom: 8 }}
                    error={!!errors[fieldData.name]}
                    errorMessage={errors[fieldData.name]}
                    addonBefore={!!fieldData.settings.prefix && fieldData.settings.prefix}
                  />
                );
              } else {
                return <>{fieldData.dataType} to be implemented</>;
              }
              return (
                <Tooltip title={fieldData.settings && fieldData.settings.helpText}>
                  <>{displayedField} </>
                </Tooltip>
              );
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
          <OutlinedButton color={GREEN_PRIMARY} onClick={onSave} textColor={GREEN_PRIMARY} loading={props.loading}>
            Save
          </OutlinedButton>
        </div>
      </div>
    </EntityRecordFormContainer>
  );
};

export default RecordForm;
