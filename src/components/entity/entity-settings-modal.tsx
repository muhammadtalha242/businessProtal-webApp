import React, { useState, useEffect, useContext } from 'react';
import { Alert, Row, Col, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import FormActions from '../common/form-action';
import CustomModal from '../common/modal';
import InputField from '../common/input-field';
import { VerticalSpace } from '../common/space';
import { EntitySettingsModalContainer } from './container';
import { IFeild, ISettings } from './form';
import { DATA_TYPES, IDatatypeField, IDatatypeFieldType } from '../../constants/entiy';
import InputFieldNumber from '../common/input-field-number';
import SelectField, { IOptionType } from '../common/select';
import { EntityContext } from '../../context/entity.context';

interface props {
  modalVisible: boolean;
  setModalVisible: (e: boolean) => void;
  settingFields: IDatatypeFieldType;
  dataType: string;
  onFieldSettingSave: (settings: ISettings) => void;
  values: ISettings;
}

export type IEntitySettingsModalKeys = 'name';

const EntitySettingsModal: React.FC<props> = (props) => {
  const [state, setState] = useState<ISettings>({});
  const [columnFields, setColumnFields] = useState<IOptionType[]>([]);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');
  const [saving, setSaving] = useState(false);
  const { state: entityState, dispatch: entityDispatch } = useContext(EntityContext);

  useEffect(() => {
    if (props.values) {
      setState({ ...props.values });
    }
  }, [props.values]);

  useEffect(() => {
    let opts: IOptionType[] = [
      {
        value: '',
        label: '',
      },
    ];
    Object.entries(entityState.currentEntity.fields).forEach((field: [string, IFeild]) => {
      if (field[1].dataType !== DATA_TYPES.AUTO_NUMBER) {
        opts.push({
          value: field[0],
          label: field[1].name,
        });
      }
    });

    setColumnFields(opts);
  }, [entityState.currentEntity.fields]);

  const onInputChange = ({ name, value }: { name: string; value: any }) => {
    const update: any = { ...state };
    update[name] = value;
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

  const onChange = (name: string, value: any) => {
    const update: any = { ...state };
    update[name] = value;
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
            props.settingFields.defaultCheckBoxes.map((val: IDatatypeField, index: number) => (
              <Col span={3}>
                <Checkbox value={val.name} name={val.name} checked={state[val.name]} onChange={(e: CheckboxChangeEvent) => onChange(e.target.name ? e.target.name : val.name, e.target.checked)}>
                  {val.label}
                </Checkbox>
              </Col>
            ))}
        </Row>
        <VerticalSpace height={16} />
        <Row align={'middle'} gutter={[24, 24]}>
          {props.dataType &&
            props.settingFields.checkbox?.map((val: IDatatypeField, index: number) => (
              <Col span={3}>
                <Checkbox name={val.name} checked={state[val.name]} onChange={(e: CheckboxChangeEvent) => onChange(e.target.name ? e.target.name : val.name, e.target.checked)}>
                  {val.label}
                </Checkbox>
              </Col>
            ))}
        </Row>

        <VerticalSpace height={16} />
        <Row gutter={[24, 24]} align={'middle'}>
          {props.dataType &&
            props.settingFields.input?.map((val: IDatatypeField, index: number) => (
              <Col span={8}>
                {val.type === 'number' ? (
                  <InputFieldNumber
                    type="input"
                    setValue={onInputChange}
                    value={state[val.name]}
                    name={val.name}
                    label={val.label}
                    placeholder={val.placeholder}
                    inputFieldContainerProps={{ marginBottom: 8 }}
                  />
                ) : (
                  <InputField
                    type="input"
                    setValue={onInputChange}
                    value={state[val.name]}
                    name={val.name}
                    label={val.label}
                    placeholder={val.placeholder}
                    inputFieldContainerProps={{ marginBottom: 8 }}
                  />
                )}
              </Col>
            ))}
        </Row>
        <VerticalSpace height={16} />
        <Row gutter={[24, 24]} align={'middle'}>
          {props.dataType &&
            props.settingFields.select?.map((val: IDatatypeField, index: number) => (
              <Col span={8}>
                <SelectField
                  options={columnFields}
                  setValue={onInputChange}
                  value={state[val.name]}
                  name={val.name}
                  label={val.label}
                  placeholder={val.placeholder}
                  key={`${val.name}`}
                  lineHeight={0}
                  marginBottom={0}
                />
              </Col>
            ))}
        </Row>
        <VerticalSpace height={16} />
        {props.dataType === "Auto Number" && state && (
          <>
            AutoNumber formate: {state.prefix ? `${state.prefix}-` : ''}
            {state.prefixCol ? `col-` : ''}
            {state.digits && state.digits > 0 ? Array(state.digits).fill('X').join('') : ''}
          </>
        )}
        <VerticalSpace height={16} />
        <InputField type="TextArea" setValue={onInputChange} value={state.helpText} name="helpText" label="Help Text" placeholder="" inputFieldContainerProps={{ marginBottom: 12 }} />
      </EntitySettingsModalContainer>
    </CustomModal>
  );
};

export default EntitySettingsModal;
