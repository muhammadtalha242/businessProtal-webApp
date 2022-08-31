import { Col, Row } from 'antd';
import React from 'react';
import SelectField, { IOptionType } from '../common/select';
import { IFeilds } from '../Entity/form';
import { SortRecordsRowContainer } from './container';
import { ISortValues } from './filters';

interface props {
  sort: ISortValues;
  index: number;
  onInputChange: ({ name, value }: { name: keyof ISortValues; value: string }) => void;
  removeFilter: () => void;
  fieldsOptions: IOptionType[];
  entityFields: IFeilds;
}

const ORDER_OPTIONS: IOptionType[] = [
  { label: 'ASC', value: 'asc' },
  { label: 'DESC', value: 'desc' },
];

const SortRow: React.FC<props> = ({ sort, index, onInputChange,  removeFilter, fieldsOptions, entityFields }) => {
  return (
    <SortRecordsRowContainer key={`sort-${index}`}>
      <Row align={'middle'} gutter={[8, 24]}>
        <Col span={1} style={{ display: 'flex' }}>
          <img onClick={removeFilter} src={`/images/icons/close-red.svg`} alt="close" />
        </Col>
        <Col offset={3} span={6}>
          <SelectField options={fieldsOptions} value={sort.field} setValue={onInputChange} placeholder="Choose options" name="field" key={'field'} lineHeight={0} marginBottom={0} />
        </Col>
        <Col span={4}>
          <SelectField options={ORDER_OPTIONS} value={sort.order} setValue={onInputChange} placeholder="Choose options" name="order" key={'order'} lineHeight={0} marginBottom={0} />
        </Col>
      </Row>
    </SortRecordsRowContainer>
  );
};

export default SortRow;
