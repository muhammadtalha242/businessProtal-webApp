import { Col, Collapse, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import { GREEN_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton, OutlinedButton } from '../common/button';
import { IOptionType } from '../common/select';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import { IFeild, IFeilds } from '../Entity/form';
import { FilterRecordsContainer } from './container';
import FilterRecordsHeader from './filter-header';
import FilterRow, { AND_OR_OPTIONS } from './filter-row';
import SortRecordsHeader from './sort-header';
import SortRow from './sort-row';
import { logger } from '../../utils/logger';

interface props {
  entityFields: IFeilds;
  getFilterData: (filterData: IFilter) => void;
}

export interface IFilter {
  filterValues: IFilterValues[];
  sortValues: ISortValues[];
}

export interface ISortValues {
  field: string;
  order: 'asc' | 'desc';
}

export interface IFilterValues {
  field: string;
  operator: string;
  value: string;
  condition: string;
  isApplied: boolean;
}

type IFilterTypes = 'filterValues' | 'sortValues';

const { Panel } = Collapse;

const defaultFilterValue: IFilterValues = { condition: AND_OR_OPTIONS[0].value, field: '', operator: '', value: '', isApplied: false };

const defaultSortValue: ISortValues = { field: '', order: 'asc' };

const FILTERS: IFilterValues[] = [{ ...defaultFilterValue }];

const SORTS: ISortValues[] = [{ ...defaultSortValue }];

export const defaultFilter: IFilter = {
  filterValues: [...FILTERS],
  sortValues: [...SORTS],
};

const RecordsFilters: React.FC<props> = (props) => {
  const [filtersArray, setFiltersArray] = useState<IFilter>(defaultFilter);
  const [entityFields, setEntityFields] = useState<IOptionType[]>([]);

  useEffect(() => {
    getFilterFields(props.entityFields);
    console.log('filtersArray', filtersArray);
  }, [props]);

  const addFilter = (index: number, filterType: IFilterTypes) => () => {
    const currentArray = [...filtersArray[filterType]];
    const values = filterType === 'filterValues' ? defaultFilterValue : defaultSortValue;
    const updatedArray = [...currentArray.slice(0, index), { ...values }, ...currentArray.slice(index)];
    setFiltersArray({ ...filtersArray, [filterType]: [...updatedArray] });
  };

  const removeFilter = (index: number, filterType: IFilterTypes) => () => {
    const currentArray = [...filtersArray[filterType]];
    currentArray.splice(index, 1);
    setFiltersArray({ ...filtersArray, [filterType]: [...currentArray] });
  };

  function onInputChange<Type>(index: number, filterType: IFilterTypes) {
    return ({ name, value }: { name: keyof Type; value: string }) => {
      const udpateValues: any = [...filtersArray[filterType]];
      udpateValues[index][name] = value;
      setFiltersArray({ ...filtersArray, [filterType]: udpateValues });
    };
  }

  const getFilterFields = (entityFields: IFeilds) => {
    const filterFiled: IOptionType[] = Object.entries(entityFields).map((field: [string, IFeild]) => {
      return {
        value: field[0],
        label: field[1].name,
      };
    });
    setEntityFields(filterFiled);
  };

  const setFilterData = () => {
    props.getFilterData(filtersArray);
  };

  return (
    <FilterRecordsContainer>
      {filtersArray.filterValues && filtersArray.filterValues.length > 0 && <FilterRecordsHeader />}
      {filtersArray.filterValues.map((filter: IFilterValues, index: number) => {
        return (
          <>
            <Row align={'middle'} gutter={[8, 24]} key={`${index}-row`}>
              <Col span={24}>
                <FilterRow
                  entityFields={props.entityFields}
                  filter={filter}
                  fieldsOptions={entityFields}
                  index={index}
                  onInputChange={onInputChange<IFilterValues>(index, 'filterValues')}
                  removeFilter={removeFilter(index, 'filterValues')}
                  addFilter={addFilter(index, 'filterValues')}
                />
              </Col>
            </Row>
            <VerticalSpace height={8} />
          </>
        );
      })}
      <div className="new-clause">
        <span onClick={addFilter(filtersArray.filterValues.length, 'filterValues')}>
          <img className="image" src={`/images/icons/add-green.svg`} alt="add" />
          <span className="text">Add new clause</span>
        </span>
      </div>
      <Collapse ghost>
        <Panel header="Sort" key="Sort-1">
          {filtersArray.sortValues && filtersArray.sortValues.length > 0 && <SortRecordsHeader />}

          {filtersArray.sortValues.map((sort: ISortValues, index: number) => {
            return (
              <>
                <Row align={'middle'} gutter={[8, 24]} key={`${index}-row`}>
                  <Col span={24}>
                    <SortRow
                      entityFields={props.entityFields}
                      sort={sort}
                      fieldsOptions={entityFields}
                      index={index}
                      removeFilter={removeFilter(index, 'sortValues')}
                      onInputChange={onInputChange<ISortValues>(index, 'sortValues')}
                    />
                  </Col>
                </Row>
                <VerticalSpace height={8} />
              </>
            );
          })}
          <div className="new-clause">
            <span onClick={addFilter(filtersArray.sortValues.length, 'sortValues')}>
              <img className="image" src={`/images/icons/add-green.svg`} alt="add" />
              <span className="text">Add new clause</span>
            </span>
          </div>
        </Panel>
      </Collapse>
      {filtersArray && filtersArray.filterValues.length > 0 && (
        <div className="footer">
          <div className="footer-left"></div>
          <div className="footer-right">
            <OutlinedButton color={GREEN_PRIMARY} onClick={() => {}}>
              Save
            </OutlinedButton>
            <HorizontalSpace width={12} />
            <FilledButton background={GREEN_PRIMARY} color={WHITE} font="14px" onClick={setFilterData}>
              Apply
            </FilledButton>
          </div>
        </div>
      )}
    </FilterRecordsContainer>
  );
};

export default RecordsFilters;
