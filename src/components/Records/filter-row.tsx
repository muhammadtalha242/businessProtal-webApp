import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import InputField from '../common/input-field';
import SelectField, { IOptionType } from '../common/select';
import { HorizontalSpace } from '../common/space';
import { FilterRecordsRowContainer } from './container';
import { IFilterValues } from './filters';

interface props {
  filter: IFilterValues;
  index: number;
  onInputChange: ({ name, value }: { name: keyof IFilterValues; value: string }) => void;
  addFilter: () => void;
  removeFilter: () => void;
  fieldsOptions: IOptionType[];
}

const NUMBER_OPERATORS: IOptionType[] = [
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '<', value: '<=' },
  { label: '==', value: '===' },
  { label: '!=', value: '!==' },
];

export const AND_OR_OPTIONS: IOptionType[] = [
  { label: 'Or', value: 'or' },
  { label: 'And', value: 'and' },
];

const FilterRow: React.FC<props> = ({ filter, index, onInputChange, addFilter, removeFilter, fieldsOptions }) => {
  return (
    <FilterRecordsRowContainer>
      <Row align={'middle'} gutter={[8, 24]}>
        <Col span={1} style={{ display: 'flex' }}>
          <img onClick={addFilter} src={`/images/icons/add-green.svg`} alt="close" />
          <HorizontalSpace width={12} />
          <img onClick={removeFilter} src={`/images/icons/close-red.svg`} alt="close" />
        </Col>
        <Col span={1}>
          <Checkbox />
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
          <SelectField options={fieldsOptions} value={filter.field} setValue={onInputChange} placeholder="Choose options" name="field" key={'field'} lineHeight={0} marginBottom={0} />
        </Col>
        <Col span={4}>
          <SelectField options={NUMBER_OPERATORS} value={filter.operator} setValue={onInputChange} placeholder="Choose options" name="operator" key={'operator'} lineHeight={0} marginBottom={0} />
        </Col>
        <Col span={10}>
          {/* <SelectField options={YES_NO_OPTIONS} value={props.index} setValue={() => {}} placeholder="Choose options" name="value" key={'value'} lineHeight={0} marginBottom={8} /> */}
          <InputField type="input" setValue={onInputChange} value={filter.value} name={'value'} inputFieldContainerProps={{ marginBottom: 0 }} />
        </Col>
      </Row>
    </FilterRecordsRowContainer>
  );
};

export default FilterRow;
