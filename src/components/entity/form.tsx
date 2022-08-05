import React, { useState } from 'react';
import { Alert, Popover, Switch, Divider } from 'antd';

import entity from '../../services/entity';
import { GREEN_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton, OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import SelectField, { IOptionType } from '../common/select';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import EntitySettingsModal from './entity-settings-modal';
import { EntityFormContainer, IFieldRowContainer, PopoverContent } from './container';

const DATA_TYPES: IOptionType[] = [
  { value: 'Auto Number', label: 'Auto Number' },
  { value: 'Email', label: 'Email' },
  { value: 'Currency', label: 'Currency' },
  { value: 'Progress', label: 'Progress' },
  { value: 'Duration', label: 'Duration' },
  { value: 'Link', label: 'Link' },
  { value: 'Date', label: 'Date' },
  { value: 'Location', label: 'Location' },
  { value: 'Document', label: 'Document' },
  { value: 'Image', label: 'Image' },
  { value: 'Section', label: 'Section' },
  { value: 'Number', label: 'Number' },
  { value: 'Text Single Line', label: 'Text Single Line' },
  { value: 'Text Multi Line', label: 'Text Multi Line' },
  { value: 'Yes/No', label: 'Yes/No' },
];

interface IValues {
  recordId: string;
  value: string;
}

export interface ISettings {
  [key: string]: any;
}

export interface IFeild {
  id?: number;
  name: string;
  dataType: string;
  defaultValue: string;
  settings: ISettings;
  values: IValues[];
}
export interface IEntity {
  id?: number;
  name: string;
  description: string;
  fields: IFeild[];
  isDisplayonMenu: boolean;
  isPublish: boolean;
}
const defaultValue: IValues = { recordId: '', value: '' };

export const defaultField: IFeild = {
  name: '',
  dataType: DATA_TYPES[0].value,
  defaultValue: '',
  settings: {},
  values: [defaultValue],
};

const defaultEntityValues: IEntity = {
  name: '',
  description: '',
  fields: [{ ...defaultField }],
  isDisplayonMenu: false,
  isPublish: false,
};

interface Props {
  setShowForm: (e: boolean) => void;
}

interface IFeildRowProps {
  field: IFeild;
  onInputChange: ({ name, value }: { name: IEntityFieldKeys; value: string }) => void;
  index: number;
  onFieldSettingSave: (settings: ISettings) => void;
}

export interface IDatatypeField {
  name: string;
  placeholder?: string;
  label: string;
  type?: string;
  defaultValue?: string;
}

export interface IDatatypeFieldType {
  defaultCheckBoxes: IDatatypeField[];
  checkbox?: IDatatypeField[];
  input?: IDatatypeField[];
  select?: IDatatypeField[];
}

export interface IDatatypeFieldSettings {
  [key: string]: IDatatypeFieldType;
}

const DEFAULT_CHECKBOX_FIELDS = [
  { name: 'isRequired', label: 'Required' },
  { name: 'isUnique', label: 'Unique' },
  { name: 'isComment', label: 'Comment' },
  { name: 'isPublic', label: 'Public' },
];
const datatypeFieldSettings: IDatatypeFieldSettings = {
  'Auto Number': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isRegenerate', label: 'Regenerate' }],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'digits', label: 'Digits', type: 'number' },
    ],
  },
  Currency: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'decimals', label: 'Decimals', type: 'number' },
    ],
  },
  Phone: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'format', label: 'Format' }],
  },
  'Text Single Line': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
  },
  'Text Multi Line': {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [{ name: 'fieldLength', label: 'Field Length' }],
  },
  Number: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    input: [
      { name: 'prefix', label: 'Prefix' },
      { name: 'decimals', label: 'Decimals', type: 'number' },
    ],
    checkbox: [{ name: 'isDisplayPercetage', label: 'Display %' }],
  },
  Email: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
  },
  Progress: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
  },
  Link: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
  },
  Date: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isTime', label: 'Time' }],
  },
  Location: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [{ name: 'isShowMap', label: 'Show map' }],
  },
  Document: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
  },
  Image: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
  },
  Section: {
    defaultCheckBoxes: [
      { name: 'isRequired', label: 'Required' },
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
  },
  'Yes/No': {
    defaultCheckBoxes: [
      { name: 'isComment', label: 'Comment' },
      { name: 'isPublic', label: 'Public' },
    ],
  },
  Duration: {
    defaultCheckBoxes: [...DEFAULT_CHECKBOX_FIELDS],
    checkbox: [
      { name: 'isDays', label: 'Display Day' },
      { name: 'isHours', label: 'Display Hours' },
      { name: 'isMints', label: 'Display minutes' },
      { name: 'isSeconds', label: 'Display seconds' },
    ],
  },
};

const FieldRows: React.FC<IFeildRowProps> = ({ field, index, onInputChange, onFieldSettingSave }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <IFieldRowContainer key={index}>
      <EntitySettingsModal
        modalVisible={modalVisible}
        dataType={field.dataType}
        values={field.settings}
        setModalVisible={setModalVisible}
        settingFields={datatypeFieldSettings[field.dataType]}
        onFieldSettingSave={onFieldSettingSave}
      />

      <div className="row">
        <div className="row-field">
          <div className="row-index">#{index + 1}</div>
          <div className="field">
            <InputField type="input" setValue={onInputChange} value={field.name} name={`name`} label="Name" placeholder="Name" marginBottom={0} />
          </div>
          <HorizontalSpace width={12} />

          <div className="field">
            <SelectField
              options={DATA_TYPES}
              value={field.dataType}
              label="Data Type"
              setValue={onInputChange}
              placeholder="Choose data type"
              name="dataType"
              key="dataType"
              lineHeight={0}
              marginBottom={0}
              defaultValue={DATA_TYPES[0].value}
            />
          </div>
          <HorizontalSpace width={12} />
          <div className="field">
            <InputField type="input" setValue={onInputChange} value={field.defaultValue} name="defaultValue" label="default" placeholder="Default" marginBottom={0} inputWidth={30} />
          </div>
          <div
            className="field-settings"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <span className="icon-dots">
              <img src={`/images/icons/settings.svg`} alt="click" />
            </span>
          </div>
        </div>
      </div>
    </IFieldRowContainer>
  );
};

type IEntityKeys = 'name' | 'despription';
type IEntityFieldKeys = 'name' | 'dataType';

const EntityForm: React.FC<Props> = (props) => {
  const [values, setValues] = useState<IEntity>(defaultEntityValues);
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');

  const onInputChange = ({ name, value }: { name: IEntityKeys; value: string }) => {
    const updateState: any = { ...values };
    updateState[name] = value;
    setValues(updateState);
  };

  const addField = () => {
    const currentFields = values.fields;
    setValues({ ...values, fields: [...currentFields, { ...defaultField }] });
  };

  const onFieldsSet =
    (index: number) =>
    ({ name, value }: { name: IEntityFieldKeys; value: string }) => {
      const currentFields = [...values.fields];
      currentFields[index][name] = value;
      setValues({ ...values, fields: [...currentFields] });
    };

  const onFieldSettingsSave = (index: number) => (settings: ISettings) => {
    const currentFields = [...values.fields];
    currentFields[index].settings = settings;
    setValues({ ...values, fields: [...currentFields] });
  };
  const onSave = async () => {
    console.log('values: ', values);
    try {
      // const res = await entity.createEntities(values);
      // console.log('res: ', res);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const DisplayonMenu = (checked: boolean) => {
    setValues({ ...values, isDisplayonMenu: checked });
  };
  const PublishMobile = (checked: boolean) => {
    setValues({ ...values, isPublish: checked });
  };

  const content = (
    <PopoverContent>
      <div onClick={() => {}} className="option">
        <div className="left-col">
          <Switch checked={values.isDisplayonMenu} onChange={DisplayonMenu} size="small" loading={false} />
        </div>
        <div className="right-col apply">Display in menu</div>
      </div>
      <div onClick={() => {}} className="option">
        <div className="left-col">
          <Switch checked={values.isPublish} onChange={PublishMobile} size="small" loading={false} />
        </div>
        <div className="right-col apply">Publish to mobile</div>
      </div>
    </PopoverContent>
  );

  return (
    <EntityFormContainer>
      <div className="header">
        <div className="text">Add New Entity</div>
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
      <div className="form">
        <div className="form-inputs">
          <div className="form-input-left">
            <InputField setValue={onInputChange} value={values.name} name="name" type="input" label="Name" placeholder="Name" marginBottom={0} />
          </div>
          <HorizontalSpace width={12} />
          <div className="form-input-center">
            <InputField setValue={onInputChange} value={values.description} name="description" type="input" label="Description" placeholder="Description" marginBottom={0} />
          </div>
          <HorizontalSpace width={12} />
          <div className="form-input-right">
            <Popover placement="bottomRight" content={content} trigger="click">
              <span className="icon-dots">
                <img src={`/images/icons/dots.svg`} alt="click" />
              </span>
            </Popover>
          </div>
        </div>
        <Divider orientation="left">Fields</Divider>

        {values.fields.map((field: IFeild, index: number) => (
          <FieldRows field={field} onInputChange={onFieldsSet(index)} index={index} onFieldSettingSave={onFieldSettingsSave(index)} />
        ))}
        <div className="add-field">
          <FilledButton onClick={addField} background={GREEN_PRIMARY} color={WHITE} height={'32px'} font={'14px'}>
            Add Field
          </FilledButton>
        </div>
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
      </div>
    </EntityFormContainer>
  );
};

export default EntityForm;
