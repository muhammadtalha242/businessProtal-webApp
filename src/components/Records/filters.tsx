import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { GREEN_PRIMARY, WHITE } from '../../styles/colors';
import { FilledButton, OutlinedButton } from '../common/button';
import { IOptionType } from '../common/select';
import { HorizontalSpace, VerticalSpace } from '../common/space';
import { IFeild, IFeilds } from '../Entity/form';
import { FilterRecordsContainer } from './container';
import FilterRecordsHeader from './filter-header';
import FilterRow, { AND_OR_OPTIONS } from './filter-row';

interface props {
  entityFields: IFeilds;
  getFilterData: (filterData: IFilterValues[]) => void;
}

export interface IFilterValues {
  field: string;
  operator: string;
  value: string;
  condition: string;
}

const defaultFilterValue: IFilterValues = { condition: AND_OR_OPTIONS[0].value, field: '', operator: '', value: '' };

const FILTERS: IFilterValues[] = [{ ...defaultFilterValue }];

const RecordsFilters: React.FC<props> = (props) => {
  const [filtersArray, setFiltersArray] = useState<IFilterValues[]>(FILTERS);
  const [entityFields, setEntityFields] = useState<IOptionType[]>([]);

  useEffect(() => {
    getFilterFields(props.entityFields);
  }, [props]);

//   useEffect(() => {
//     setFilterData();
//   }, [filtersArray]);

  const addFilter = (index: number) => () => {
    const currentArray = [...filtersArray];
    const updatedArray = [...currentArray.slice(0, index), { ...defaultFilterValue }, ...currentArray.slice(index)];
    setFiltersArray([...updatedArray]);
  };

  const removeFilter = (index: number) => () => {
    const currentArray = [...filtersArray];
    currentArray.splice(index, 1);
    setFiltersArray([...currentArray]);
  };

  const onInputChange =
    (index: number) =>
    ({ name, value }: { name: keyof IFilterValues; value: string }) => {
      console.log(index);
      console.log(name, value);

      const udpateValues: any = [...filtersArray];
      udpateValues[index][name] = value;
      setFiltersArray(udpateValues);
    };

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
      {filtersArray && filtersArray.length > 0 && <FilterRecordsHeader />}
      {filtersArray.map((filter: IFilterValues, index: number) => {
        return (
          <>
            <Row align={'middle'} gutter={[8, 24]} key={`${index}-row`}>
              <Col span={24}>
                <FilterRow filter={filter} fieldsOptions={entityFields} index={index} onInputChange={onInputChange(index)} removeFilter={removeFilter(index)} addFilter={addFilter(index)} />
              </Col>
            </Row>
            <VerticalSpace height={8} />
          </>
        );
      })}
      <div className="new-clause">
        <span onClick={addFilter(filtersArray.length)}>
          <img className="image" src={`/images/icons/add-green.svg`} alt="add" />
          <span className="text">Add new clause</span>
        </span>
      </div>
      {filtersArray && filtersArray.length > 0 && (
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
