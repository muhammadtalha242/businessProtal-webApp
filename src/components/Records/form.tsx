import { Alert, Col, Divider, Row, Slider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { GREEN_PRIMARY, RED_PRIMARY } from '../../styles/colors';
import { OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import { VerticalSpace } from '../common/space';
import { IFeilds } from '../Entity/form';
import { EntityRecordFormContainer } from './container';

interface props {
  setShowForm: (e: boolean) => void;
  onSave: (entityRecords: {}) => void;
  formData: IFeilds;
  isEdit: boolean;
  setIsEdit: (e: boolean) => void;
  recordSelected: any;
}

const RecordForm: React.FC<props> = (props) => {
  const [values, setValues] = useState(props.isEdit ? props.recordSelected : []);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');

  const { state: routeState } = useLocation();
  const { currentEntity }: any = routeState;

  useEffect(() => {
    if (props.isEdit) setValues(props.recordSelected);
  }, [props.recordSelected]);

  const onInputChange =
    (fieldName: string) =>
    ({ name, value }: { name: string; value: string }) => {
      const updateState: any = { ...values };
      updateState[fieldName] = value;
      setValues(updateState);
    };

  const onSave = () => {
    props.onSave(values);
    props.setShowForm(false);
  };

  return (
    <EntityRecordFormContainer>
      <div className="header">
        <div className="text">Add Record</div>
        <img
          onClick={() => {
            props.setShowForm(false);
          }}
          src={`/images/icons/close.svg`}
          alt="close"
        />
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
        {currentEntity &&
          Object.entries(currentEntity.fields).map((field: [string, any], index: number) => {
            const fieldCode = field[0];
            const fieldData = field[1];
            if (fieldData.dataType === 'Progress') {
              return (
                <Col span={8}>
                  <Slider defaultValue={30} />;
                </Col>
              );
            } else {
              return (
                <Col span={8}>
                  <InputField
                    type="input"
                    setValue={onInputChange(fieldCode)}
                    value={values[fieldCode]}
                    name={fieldData.name}
                    label={fieldData.name}
                    placeholder={fieldData.placeholder}
                    inputFieldContainerProps={{ marginBottom: 8 }}
                  />
                </Col>
              );
            }
          })}
      </Row>

      <VerticalSpace height={16} />
      <Divider />
      <div className="footer">
        <div className="footer-left">
          <OutlinedButton color={RED_PRIMARY} onClick={() => props.setShowForm(false)}>
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
