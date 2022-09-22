import React, { useEffect, useState } from 'react';
import { Alert, Popover, Switch, Divider } from 'antd';

import { GREEN_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton, OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import SelectField from '../common/select';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import EntitySettingsModal from './entity-settings-modal';
import { EntityFormContainer, IFieldRowContainer, PopoverContent } from './container';
import { DATA_TYPES, DATA_FIELD_SETTINGS } from '../../constants/entiy';
import { getRandom } from '../../utils/helper';

interface Props {
  setShowForm: (e: boolean) => void;
  onSave: (entity: IEntity) => void;
  onUpdate: (updatedEnitiy: IEditEntity) => void;
  isEdit: boolean;
  editEntity: IEntity;
  setIsEdit: (e: boolean) => void;
}

interface IFeildRowProps {
  field: IFeild;
  onInputChange: ({ name, value }: { name: IEntityFieldKeys; value: string }) => void;
  index: number;
  onFieldSettingSave: (settings: ISettings) => void;
  isEditMode: boolean;
  onFieldDelete: () => void;
}

export interface IValues {
  recordId: string;
  value: string;
}

export interface ISettings {
  [key: string]: any;
}

export interface IFeild {
  fieldRecord?: number;
  name: string;
  dataType: string;
  defaultValue: string;
  settings: ISettings;
  values: IValues[];
  isEditable?: boolean;
}

export interface IFeilds {
  [key: string]: IFeild;
}

export interface IEntity {
  id?: number;
  name: string;
  databaseName: string;
  description: string;
  fields: IFeilds;
  isDisplayonMenu: boolean;
  isPublish: boolean;
  entityPermissionsAdd: number[];
  entityPermissionsNone: number[];
  entityPermissionsView: number[];
  entityPermissionsEdit: number[];
  entityPermissionsDelete: number[];
}

export interface IEditEntity {
  entity: IEntity;
  deletedFields?: string[];
  addedFields?: IFeilds;
}

const defaultValue: IValues = { recordId: '', value: '' };

const entityRandomName = getRandom('entity')('0123456789', 5);
const fieldRandomName = getRandom('field')('0123456789', 5);

export const defaultField: IFeild = {
  name: '',
  dataType: DATA_TYPES[0].value,
  defaultValue: '',
  settings: {},
  values: [defaultValue],
};

export const defaultEntityValues: IEntity = {
  name: '',
  description: '',
  databaseName: entityRandomName(),
  fields: { [fieldRandomName()]: { ...defaultField } },
  isDisplayonMenu: false,
  isPublish: false,
  entityPermissionsAdd: [],
  entityPermissionsNone: [],
  entityPermissionsView: [],
  entityPermissionsEdit: [],
  entityPermissionsDelete: [],
};

const FieldRows: React.FC<IFeildRowProps> = ({ field, index, onInputChange, onFieldSettingSave, isEditMode, onFieldDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <IFieldRowContainer key={index}>
      <EntitySettingsModal
        modalVisible={modalVisible}
        dataType={field.dataType}
        values={field.settings}
        setModalVisible={setModalVisible}
        settingFields={DATA_FIELD_SETTINGS[field.dataType]}
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
              disabled={field.isEditable ? !field.isEditable : isEditMode}
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

          <div
            className="field-settings"
            onClick={() => {
              onFieldDelete();
            }}
          >
            <span className="icon-dots">
              <img src={`/images/icons/trash.svg`} alt="click" />
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
  const [deletedFieldsNames, setDeletedFields] = useState<string[]>([]);
  const [addedFieldsNames, setAddedFields] = useState<string[]>([]);

  useEffect(() => {
    if (props.isEdit) setValues(props.editEntity);
  }, [props.editEntity]);

  const onInputChange = ({ name, value }: { name: IEntityKeys; value: string }) => {
    const updateState: any = { ...values };
    updateState[name] = value;
    setValues(updateState);
  };

  const addField = () => {
    const currentFields = values.fields;
    const fieldName = fieldRandomName();
    if (props.isEdit) {
      const currenetAddedField = [...addedFieldsNames, fieldName];
      setAddedFields([...currenetAddedField]);
      setValues({ ...values, fields: { ...currentFields, [fieldName]: { ...defaultField, isEditable: true } } });
    } else {
      setValues({ ...values, fields: { ...currentFields, [fieldName]: { ...defaultField } } });
    }
  };

  const onFieldsSet =
    (fieldName: string) =>
    ({ name, value }: { name: IEntityFieldKeys; value: string }) => {
      const currentFields = { ...values.fields };
      currentFields[fieldName][name] = value;
      setValues({ ...values, fields: { ...currentFields } });
    };

  const onFieldDelete = (fieldName: string) => () => {
    const currentFields = { ...values.fields };
    if (props.isEdit) {
      const currenetDeletedField = [...deletedFieldsNames, fieldName];
      setDeletedFields([...currenetDeletedField]);
    }
    delete currentFields[fieldName];

    setValues({ ...values, fields: { ...currentFields } });
  };

  const onFieldSettingsSave = (fieldName: string) => (settings: ISettings) => {
    const currentFields = { ...values.fields };
    currentFields[fieldName].settings = settings;
    setValues({ ...values, fields: { ...currentFields } });
  };

  const onSave = async () => {
    try {
      props.onSave(values);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onUpdate = () => {
    const updatedEnitiy: IEditEntity = {
      entity: values,
    };
    if (deletedFieldsNames.length > 0) {
      updatedEnitiy.deletedFields = [...deletedFieldsNames];
    }
    if (addedFieldsNames.length > 0) {
      let currentAddedFields = {};
      addedFieldsNames.forEach((fieldName: string) => {
        currentAddedFields = { ...currentAddedFields, [fieldName]: values.fields[fieldName] };
      });
      updatedEnitiy.addedFields = currentAddedFields;
    }
    props.onUpdate(updatedEnitiy);
  };

  const onCancle = () => {
    props.setShowForm(false);
    props.setIsEdit(false);
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

        {Object.entries(values.fields).map((field: [string, IFeild], index: number) => (
          <FieldRows
            field={field[1]}
            onFieldDelete={onFieldDelete(field[0])}
            onInputChange={onFieldsSet(field[0])}
            index={index}
            isEditMode={props.isEdit}
            onFieldSettingSave={onFieldSettingsSave(field[0])}
          />
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
            <OutlinedButton color={RED_PRIMARY} onClick={onCancle}>
              Cancel
            </OutlinedButton>
          </div>
          <div className="footer-right">
            <OutlinedButton color={GREEN_PRIMARY} onClick={props.isEdit ? onUpdate : onSave} textColor={GREEN_PRIMARY} loading={false}>
              Save
            </OutlinedButton>
          </div>
        </div>
      </div>
    </EntityFormContainer>
  );
};

export default EntityForm;
