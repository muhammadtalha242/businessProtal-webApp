import _ from 'lodash';
import { IFilterValues } from '../components/Records/filters';

export const transformData = (sourceData: any, fitlerApplied: IFilterValues[]) => {
  let output: any[] = [];
  let interamData: any[] = [];

  fitlerApplied.forEach((filter: IFilterValues) => {
    console.log('filter.: ', filter);

    if (filter.condition === 'or') {
      let y: any = _.filter(sourceData, (o) => {
        return o[filter.field] === filter.value;
      });
      console.log(y);
      interamData = _.uniqBy([...y, ...interamData], 'id');
      console.log('interamData , or', interamData);
    } else {
      const x: any = _.filter(interamData, (o) => {
        return o[filter.field] === filter.value;
      });
      interamData = [...x];
      console.log('x, and', x);

      console.log('interamData , and', interamData);
    }
  });

  output = _.uniqBy([...interamData], 'id');
  console.log(output);

  return output;
};
