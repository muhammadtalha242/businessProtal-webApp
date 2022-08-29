import { Col, Row } from 'antd';
import React from 'react';
import { FilterRecordsHeaderContainer } from './container';

interface props {}

const FilterRecordsHeader: React.FC<props> = (props) => {
  return (
    <FilterRecordsHeaderContainer>
      <Row align={'middle'} gutter={[8, 24]}>
        <Col span={1}></Col>
        <Col span={1}>Group</Col>
        <Col span={2}>
          <div>And/Or</div>
        </Col>
        <Col span={6}>
          <div>Field</div>
        </Col>
        <Col span={4}>
          <div>Operator</div>
        </Col>
        <Col span={10}>
          <div>Value</div>
        </Col>
      </Row>
    </FilterRecordsHeaderContainer>
  );
};
export default FilterRecordsHeader;
