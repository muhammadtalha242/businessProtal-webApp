import React, { useContext, useEffect, useState } from 'react';
import { Alert, Popover, Switch, Divider } from 'antd';

import { GREEN_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton, OutlinedButton } from '../common/button';
import InputField from '../common/input-field';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import { EntityFormContainer, PopoverContent } from './container';
import { DATA_FIELD_SETTINGS, DATA_TYPES } from '../../constants/entiy';
import { getRandom } from '../../utils/helper';
import { UserContext } from '../../context/user.context';
import { USER_GROUP_MAP } from '../../constants/userGroups';
import FieldRows from './entity-field-row';
import { error } from '../common/message';

interface Props {
  setShowForm: (e: boolean) => void;
  onSave: (entity: IEntity) => void;
  onUpdate: (updatedEnitiy: IEditEntity) => void;
  onDelete: (entityId: number, entityName: string) => void;
  isEdit: boolean;
  editEntity: IEntity;
  setIsEdit: (e: boolean) => void;
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
  isDisplayForRecords: boolean;
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
  entityPermissionsCreate: number[];
  entityPermissionsNone: number[];
  entityPermissionsRead: number[];
  entityPermissionsDelete: number[];
}

export interface IEditEntity {
  entity: IEntity;
  deletedFields?: string[];
  addedFields?: IFeilds;
}

const defaultValue: IValues = { recordId: '', value: '' };

const entityRandomName = getRandom('entity')('0123456789', 7);
const fieldRandomName = getRandom('field')('0123456789', 7);

export const defaultField: IFeild = {
  name: '',
  dataType: DATA_TYPES[0].value,
  defaultValue: '',
  settings: {},
  values: [defaultValue],
  isDisplayForRecords: false,
};

export const defaultEntityValues: IEntity = {
  name: '',
  description: '',
  databaseName: '',
  fields: {},
  isDisplayonMenu: false,
  isPublish: false,
  entityPermissionsCreate: [1],
  entityPermissionsNone: [],
  entityPermissionsRead: [1],
  entityPermissionsDelete: [1],
};

type IEntityKeys = 'name' | 'despription';
type IEntityFieldKeys = 'name' | 'dataType';

const EntityForm: React.FC<Props> = (props) => {
  const [values, setValues] = useState<IEntity>({ ...defaultEntityValues });
  const [isError, setIsError] = useState(false);
  const [err, setErr] = useState('');
  const [deletedFieldsNames, setDeletedFields] = useState<string[]>([]);
  const [addedFieldsNames, setAddedFields] = useState<string[]>([]);
  const { state: userState } = useContext(UserContext);

  useEffect(() => {
    if (props.isEdit) {
      setValues(props.editEntity);
    } else {
      defaultEntityValues.databaseName = entityRandomName();
      defaultEntityValues.fields = { [fieldRandomName()]: { ...defaultField } };
      setValues({ ...defaultEntityValues });
    }
  }, []);

  const onInputChange = ({ name, value }: { name: IEntityKeys; value: string }) => {
    const updateState: any = { ...values };
    updateState[name] = value;
    setValues(updateState);
    setIsError(false);
    setErr('');
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
      currentFields[fieldName].isDisplayForRecords = DATA_FIELD_SETTINGS[currentFields[fieldName].dataType].isDisplayForRecords;
      setValues({ ...values, fields: { ...currentFields } });
      setIsError(false);
      setErr('');

      
    };

  const onFieldDelete = (fieldName: string) => () => {
    const currentFields = { ...values.fields };
    if (props.isEdit) {
      const currenetDeletedField = [...deletedFieldsNames, fieldName];
      setDeletedFields([...currenetDeletedField]);
    }
    delete currentFields[fieldName];
    setValues({ ...values, fields: { ...currentFields } });
    setIsError(false);
    setErr('');
  };

  const onFieldSettingsSave = (fieldName: string) => (settings: ISettings) => {
    const currentFields = { ...values.fields };
    currentFields[fieldName].settings = settings;
    setValues({ ...values, fields: { ...currentFields } });
  };

  const validateValues = (): boolean => {
    let isValid = true;
    if (values.name === '') {
      setIsError(true);
      setErr('Entity name required');
      isValid = false;
    } else if (!Object.values(values.fields).every((field: IFeild) => field.name !== '')) {
      isValid = false;
      setIsError(true);
      setErr('field is required.');
    }
    return isValid;
  };

  const onSave = async () => {
    try {
      if (validateValues()) props.onSave(values);
    } catch (e: any) {
      error(`Unable to create entity ${e}`);
    }
  };

  const deleteEntity = () => {
    if (values.id) props.onDelete(values.id, values.name);
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
              Cancle
            </OutlinedButton>

            <HorizontalSpace width={16} />
            {props.isEdit && userState.userGroupCodes?.includes(USER_GROUP_MAP.SYSTEM_ADMIN) && (
              <FilledButton background={RED_PRIMARY} color={WHITE} onClick={deleteEntity}>
                Delete
              </FilledButton>
            )}
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
