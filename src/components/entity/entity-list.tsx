import React from 'react';

import { EntityListContainer } from './container';
import { IEntity } from './form';
import EntityItem from './entity-item';
import Table from '../common/table-dragable';
import { tableData, columns } from '../../constants/table';
interface props {
  entities: IEntity[];
}

const EntityLis: React.FC<props> = (props) => {
  return (
    <EntityListContainer>
      {/* <Table data={tableData} columns={columns} /> */}
      {props.entities.map((entity: IEntity, index: number) => {
        return <EntityItem entity={entity} key={index} />;
      })}
    </EntityListContainer>
  );
};

export default EntityLis;
