import { Col, Row } from 'antd';
import React from 'react';
import { SortRecordsHeaderContainer } from './container';

interface props {}

const SortRecordsHeader: React.FC<props> = (props) => {
  return (
    <SortRecordsHeaderContainer>
      <Row align={'middle'} gutter={[8, 24]}>
        <Col offset={4} span={6}>
          <div>Field</div>
        </Col>
        <Col span={4}>
          <div>Order</div>
        </Col>
      </Row>
    </SortRecordsHeaderContainer>
  );
};
export default SortRecordsHeader;
