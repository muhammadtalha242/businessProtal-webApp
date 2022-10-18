import React, { useState } from 'react';

import { IFeild, ISettings } from './form';
import { IFieldRowContainer } from './container';
import EntitySettingsModal from './entity-settings-modal';
import { DATA_FIELD_SETTINGS, DATA_TYPES, DATA_TYPES_OPTIONS } from '../../constants/entiy';
import InputField from '../common/input-field';
import { HorizontalSpace } from '../common/space';
import SelectField from '../common/select';
import InputFieldMask from '../common/input-field-masked';

type IEntityFieldKeys = 'name' | 'dataType';

interface IFeildRowProps {
  field: IFeild;
  onInputChange: ({ name, value }: { name: IEntityFieldKeys; value: string }) => void;
  index: number;
  onFieldSettingSave: (settings: ISettings) => void;
  isEditMode: boolean;
  onFieldDelete: () => void;
}

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
            <InputField type="input" setValue={onInputChange} value={field.name} name={`name`} label="Name" placeholder="Name" inputFieldContainerProps={{ marginBottom: 0 }} />
          </div>
          <HorizontalSpace width={12} />

          <div className="field">
            <SelectField
              options={DATA_TYPES_OPTIONS}
              value={field.dataType}
              label="Data Type"
              setValue={onInputChange}
              placeholder="Choose data type"
              name="dataType"
              key="dataType"
              lineHeight={0}
              marginBottom={0}
              defaultValue={DATA_TYPES_OPTIONS[0].value}
              disabled={field.isEditable ? !field.isEditable : isEditMode}
            />
          </div>
          <HorizontalSpace width={12} />
          <div className="field">
            {field.isDefaultFieldVisible ? (
              field.dataType === DATA_TYPES.PHONE ? (
                <InputFieldMask
                  setValue={onInputChange}
                  value={field.defaultValue}
                  name="defaultValue"
                  label="default"
                  placeholder="Default"
                  inputFieldContainerProps={{ marginBottom: 8 }}
                  // error={!!errors["defaultValue"]}
                  // errorMessage={errors[fieldData.name]}
                  mask={!!field.settings.format && field.settings.format}
                />
              ) : (
                <InputField
                  type="input"
                  setValue={onInputChange}
                  value={field.defaultValue}
                  name="defaultValue"
                  label="default"
                  placeholder="Default"
                  inputFieldContainerProps={{ marginBottom: 0, inputWidth: 30 }}
                />
              )
            ) : (
              <></>
            )}
          </div>
          <HorizontalSpace width={8} />

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
          <HorizontalSpace width={8} />

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

export default FieldRows;
