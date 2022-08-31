import { Collapse } from 'antd';
import React from 'react';
import { IFeilds } from '../Entity/form';

import { FilterCollapesContainer } from './container';
import RecordsFilters, { IFilter } from './filters';

const { Panel } = Collapse;

interface props {
  entityFields: IFeilds;
  getFilterData: (filterData: IFilter) => void;
}

const FilterCollapes: React.FC<props> = (props) => {
  return (
    <FilterCollapesContainer>
      <Collapse>
        <Panel header="Filter Data" key="1">
          <RecordsFilters {...props} />
        </Panel>
      </Collapse>
    </FilterCollapesContainer>
  );
};

export default FilterCollapes;
