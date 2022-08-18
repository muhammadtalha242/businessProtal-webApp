import { Alert, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
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
}
const RecordForm: React.FC<props> = (props) => {
  const [values, setValues] = useState([]);

  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');

  const { state: routeState } = useLocation();
  const { currentEntity }: any = routeState;
  console.log('currentEntity: ', currentEntity);

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
          Object.entries(currentEntity.fields).map((val: any, index: number) => {
            return (
              <Col span={8}>
                <InputField
                  type="input"
                  setValue={onInputChange(val[0])}
                  value={values[val[0]]}
                  name={val[1].name}
                  label={val[1].name}
                  placeholder={val[1].placeholder}
                  inputFieldContainerProps={{ marginBottom: 8 }}
                />
              </Col>
            );
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
