import { Col, Row } from 'antd';
import React, { useState } from 'react';

import CustomCheckbox from '../common/checkbox';
import InputField from '../common/input-field';
import SelectField, { IOptionType } from '../common/select';
import { HorizontalSpace } from '../common/space';
import { IFeilds } from '../Entity/form';
import { FilterRecordsRowContainer } from './container';
import { IFilterValues } from './filters';
import InputDate from '../common/date-input';

interface props {
  filter: IFilterValues;
  index: number;
  onInputChange: ({ name, value }: { name: keyof IFilterValues; value: string }) => void;
  addFilter: () => void;
  removeFilter: () => void;
  fieldsOptions: IOptionType[];
  entityFields: IFeilds;
}

const NUMBER_OPERATORS: IOptionType[] = [
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: '==', value: '===' },
  { label: '!=', value: '!==' },
];

const STRING_OPERATIONS: IOptionType[] = [
  { label: 'contain words', value: 'contains' },
  { label: 'doesnot contain words', value: 'doesnot_contain' },
  { label: 'is empty', value: 'is_empty' },
  { label: 'is not empty', value: 'is_not_empty' },
];

const DATE_OPERATIONS: IOptionType[] = [
  { label: '>', value: '>_date' },
  { label: '>=', value: '>=_date' },
  { label: '<=', value: '<=_date' },
  { label: '<', value: '<_date' },
  { label: '==', value: '===_date' },
  { label: '!=', value: '!==_date' },
];

const DATATYPE_STRING = ['Email', 'Progress', 'Duration', 'Link', 'Location', 'Document', 'Image', 'Section', 'Text Single Line', 'Text Multi Line'];
const DATATYPE_NUMBER = ['Auto Number', 'Currency', 'Progress', 'Number'];
const DATATYPE_DATE = ['Date', 'createdAt', 'updatedAt'];

export const AND_OR_OPTIONS: IOptionType[] = [
  { label: 'Or', value: 'or' },
  { label: 'And', value: 'and' },
];

const FilterRow: React.FC<props> = ({ filter, index, onInputChange, addFilter, removeFilter, fieldsOptions, entityFields }) => {
  const [opertationOptions, setOpertationOptions] = useState<IOptionType[]>([]);
  const [isDateDataType, setIsDateDataType] = useState(false);
  const onFieldSelect = ({ name, value }: { name: keyof IFilterValues; value: string }) => {
    console.log(entityFields[value].dataType);
    if (DATATYPE_NUMBER.includes(entityFields[value].dataType)) {
      setOpertationOptions(NUMBER_OPERATORS);
      setIsDateDataType(false);
    } else if (DATATYPE_STRING.includes(entityFields[value].dataType)) {
      setOpertationOptions(STRING_OPERATIONS);
      setIsDateDataType(false);
    } else if (DATATYPE_DATE.includes(entityFields[value].dataType)) {
      setOpertationOptions(DATE_OPERATIONS);
      setIsDateDataType(true);
    } else {
      setOpertationOptions([]);
    }
    onInputChange({ name, value });
  };

  return (
    <FilterRecordsRowContainer>
      <Row align={'middle'} gutter={[8, 24]}>
        <Col span={1} style={{ display: 'flex' }}>
          <img onClick={addFilter} src={`/images/icons/add-green.svg`} alt="close" />
          <HorizontalSpace width={12} />
          <img onClick={removeFilter} src={`/images/icons/close-red.svg`} alt="close" />
        </Col>
        <Col span={1}>
          <CustomCheckbox name="isApplied" value={filter.isApplied} setValue={onInputChange} />
        </Col>
        <Col span={2}>
          {index !== 0 && (
            <SelectField
              options={AND_OR_OPTIONS}
              value={filter.condition}
              defaultValue={AND_OR_OPTIONS[0].label}
              setValue={onInputChange}
              placeholder="Choose options"
              name="condition"
              key={'condition'}
              lineHeight={0}
              marginBottom={0}
            />
          )}
        </Col>
        <Col span={6}>
          <SelectField options={fieldsOptions} value={filter.field} setValue={onFieldSelect} placeholder="Choose options" name="field" key={'field'} lineHeight={0} marginBottom={0} />
        </Col>
        <Col span={4}>
          <SelectField options={opertationOptions} value={filter.operator} setValue={onInputChange} placeholder="Choose options" name="operator" key={'operator'} lineHeight={0} marginBottom={0} />
        </Col>
        <Col span={10}>
          {isDateDataType ? (
            <InputDate setValue={onInputChange} value={filter.value} name="value" datePickerContainerProps={{ marginBottom: 0 }} />
          ) : (
            <InputField type="input" setValue={onInputChange} value={filter.value} name={'value'} inputFieldContainerProps={{ marginBottom: 0 }} />
          )}
          {/* <SelectField options={YES_NO_OPTIONS} value={props.index} setValue={() => {}} placeholder="Choose options" name="value" key={'value'} lineHeight={0} marginBottom={8} /> */}
        </Col>
      </Row>
    </FilterRecordsRowContainer>
  );
};

export default FilterRow;
