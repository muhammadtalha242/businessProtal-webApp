import React, { useState, useEffect } from 'react';
import { Alert, Row, Col, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import FormActions from '../common/form-action';
import CustomModal from '../common/modal';
import SelectField, { IOptionType } from '../common/select';
import InputField from '../common/input-field';
import { VerticalSpace } from '../common/space';
import { EntitySettingsModalContainer } from './container';
import { IDatatypeField, IDatatypeFieldSettings, ISettings } from './form';
import { values } from 'lodash';

interface props {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  settingFields: IDatatypeFieldSettings;
  dataType: string;
  onFieldSettingSave: (settings: ISettings) => void;
  values: ISettings;
}

export type IEntitySettingsModalKeys = 'name';

const EntitySettingsModal: React.FC<props> = (props) => {
  const [state, setState] = useState<ISettings>(props.values);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (values) {
      setState(values);
    }
  }, [values]);

  const onInputChange = ({ name, val }: { name: string; val: string }) => {
    const update: any = state;
    update[name] = val;
    setState(update);
  };

  const onSave = () => {
    if (state) {
      try {
        setSaving(true);
        props.onFieldSettingSave(state);
        props.setModalVisible(false);
        setSaving(false);
      } catch (e: any) {
        setSaving(false);
      }
    }
  };

  const onChange = (name: string, val: any) => {
    const update: any = state;
    update[name] = val;
    setState(update);
  };

  const footer = <FormActions onSave={onSave} onCancel={() => props.setModalVisible(false)} formButtonsStyleProps={{ padding: '0' }} saving={saving} leftButtonText="Cancle" />;
  const title = (
    <div>
      <span className="header-text">{`${props.dataType} Settings`}</span>
    </div>
  );

  return (
    <CustomModal
      title={title}
      width={1000}
      visible={props.modalVisible}
      onOk={(modalVisible) => props.setModalVisible(!modalVisible)}
      onCancel={(modalVisible) => props.setModalVisible(!modalVisible)}
      footer={footer}
    >
      {isError && (
        <>
          <Alert
            style={{ borderRadius: 16, textAlign: 'left' }}
            message="Error"
            description={<div>{err}</div>}
            type="error"
            onClose={() => {
              setErr('');
              setIsError(false);
            }}
            closable
          />
          <VerticalSpace height={32} />
        </>
      )}
      <EntitySettingsModalContainer>
        <Row align={'middle'} gutter={[24, 24]}>
          {props.dataType &&
            props.settingFields[props.dataType].defaultCheckBoxes.map((val: IDatatypeField, index: number) => {
              console.log(typeof state[val.name]);
              console.log(state[val.name]);

              return (
                <Col span={3}>
                  <Checkbox
                    name={val.name}
                    checked={state[val.name] ? state[val.name] : false}
                    onChange={(e: CheckboxChangeEvent) => onChange(e.target.name ? e.target.name : val.name, e.target.checked)}
                  >
                    {val.label}
                  </Checkbox>
                </Col>
              );
            })}
        </Row>
        <VerticalSpace height={16} />
        <Row gutter={[24, 24]} align={'middle'}>
          {props.dataType &&
            props.settingFields[props.dataType].input?.map((val: IDatatypeField, index: number) => (
              <Col span={8}>
                <InputField
                  type="input"
                  setValue={onInputChange}
                  value={state[val.name]}
                  name={val.name}
                  label={val.label}
                  placeholder={val.placeholder}
                  inputFieldContainerProps={{ marginBottom: 8 }}
                />
              </Col>
            ))}
        </Row>
        <VerticalSpace height={16} />
        <InputField type="TextArea" setValue={onInputChange} value={state.helpText} name="helpText" label="Help Text" placeholder="" inputFieldContainerProps={{ marginBottom: 12 }} />
      </EntitySettingsModalContainer>
    </CustomModal>
  );
};

export default EntitySettingsModal;
