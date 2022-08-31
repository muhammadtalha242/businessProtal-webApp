import _ from 'lodash';
import { IFilterValues, ISortValues } from '../components/Records/filters';
import moment, { Moment } from 'moment';

const OP_equals = (f1: number | string, f2: number | string) => {
  return f1 === f2;
};

const OP_not_equals = (f1: number | string, f2: number | string) => {
  return f1 !== f2;
};

const OP_less = (f1: number | string, f2: number | string) => {
  return f1 < f2;
};

const OP_great = (f1: number | string, f2: number | string) => {
  return f1 > f2;
};

const OP_lessThanEquals = (f1: number | string, f2: number | string) => {
  return f1 <= f2;
};

const OP_greaterThanEquals = (f1: number | string, f2: number | string) => {
  return f1 >= f2;
};

const OP_contains = (f1: number | string, f2: number | string) => {
  return f1.toString().toLowerCase().includes(f2.toString().toLowerCase());
};

const OP_notContains = (f1: number | string, f2: number | string) => {
  return !f1.toString().toLowerCase().includes(f2.toString().toLowerCase());
};

const OP_empty = (f1: number | string, f2: number | string) => {
  return f1.toString().trimEnd() === '';
};

const OP_notEmpty = (f1: number | string, f2: number | string) => {
  return f1.toString().trimEnd() !== '';
};

const OP_date_equals = (f1: Moment | string, f2: Moment | string) => {
  return moment(f1).isSame(moment(f2));
};

const OP_date_not_equals = (f1: Moment | string, f2: Moment | string) => {
  return !moment(f1).isSame(moment(f2));
};

const OP_date_less = (f1: Moment | string, f2: Moment | string) => {
  return moment(f1).isBefore(moment(f2));
};

const OP_date_great = (f1: Moment | string, f2: Moment | string) => {
  return moment(f1).isAfter(moment(f2));
};

const OP_date_lessThanEquals = (f1: Moment | string, f2: Moment | string) => {
  return moment(f1).isSameOrBefore(moment(f2));
};

const OP_date_greaterThanEquals = (f1: Moment | string, f2: Moment | string) => {
  return moment(f1).isSameOrAfter(moment(f2));
};

interface IOPERATION_MAPPER {
  [key: string]: Function;
}
const OPERATION_MAPPER: IOPERATION_MAPPER = {
  '===': OP_equals,
  '!==': OP_not_equals,
  '>=': OP_greaterThanEquals,
  '<=': OP_lessThanEquals,
  '>': OP_great,
  '<': OP_less,
  contains: OP_contains,
  doesnot_contain: OP_notContains,
  is_empty: OP_empty,
  is_not_empty: OP_notEmpty,
  '>_date': OP_date_great,
  '>=_date': OP_date_greaterThanEquals,
  '<_date': OP_date_less,
  '<=_date': OP_date_lessThanEquals,
  '===_date': OP_date_equals,
  '!==_date': OP_date_not_equals,
};

export const transformData = (sourceData: any, fitlerApplied: IFilterValues[]) => {
  let output: any[] = [];
  let interamData: any[] = [];

  fitlerApplied.forEach((filter: IFilterValues) => {
    // if (filter.isApplied) {
    if (filter.condition === 'or') {
      let y: any = _.filter(sourceData, (o) => {
        return OPERATION_MAPPER[filter.operator](o[filter.field], filter.value);
      });
      console.log('y: ', y);
      console.log('interamData: ', interamData);
      interamData = _.uniqBy([...y, ...interamData], 'id');
      console.log('interamData , or', interamData);
    } else {
      const x: any = _.filter(interamData, (o) => {
        return OPERATION_MAPPER[filter.operator](o[filter.field], filter.value);
      });
      interamData = [...x];
      // interamDataAnd = [...x];
      console.log('x, and', x);

      console.log('interamData , and', interamData);
    }
    // }
  });

  output = _.uniqBy([...interamData], 'id');
  console.log(output);

  return output;
};

export const sortData = (sourceData: any, fitlerApplied: ISortValues[]) => {
  const order: any[] = [];
  const fields: Array<string> = [];
  fitlerApplied.forEach((filter: ISortValues) => {
    fields.push(filter.field);
    order.push(filter.order);
  });

  const sortedData = _.orderBy(sourceData, [fields], order);
  console.log('sortedData: ', sortedData);

  return sortedData;
};
