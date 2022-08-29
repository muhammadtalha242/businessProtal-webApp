import { Collapse } from 'antd';
import React from 'react';
import { IFeilds } from '../Entity/form';

import { FilterCollapesContainer } from './container';
import RecordsFilters, { IFilterValues } from './filters';

const { Panel } = Collapse;

interface props {
  entityFields: IFeilds;
  getFilterData: (filterData: IFilterValues[]) => void;
}

const FilterCollapes: React.FC<props> = (props) => {
  return (
    <FilterCollapesContainer>
      <Collapse>
        <Panel header="Filters" key="1">
          <RecordsFilters {...props} />
        </Panel>
      </Collapse>
    </FilterCollapesContainer>
  );
};

export default FilterCollapes;
