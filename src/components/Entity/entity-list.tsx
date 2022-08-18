import React from 'react';

import { EntityListContainer } from './container';
import { IEntity } from './form';
import Table from '../common/table-dragable';
import type { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import { Link } from 'react-router-dom';

interface props {
  entities: IEntity[];
  onEdit: (entity: IEntity) => void;
  onView: (entity: IEntity) => void;
}

export interface IDataType {
  key: number;
  name: string;
  description: string;
  data: IEntity;
}

const EntityLis: React.FC<props> = (props) => {
  const editEntity = (record: IDataType) => () => {
    props.onEdit(record.data);
  };
  const deleteEntity = (entity: any) => () => {
    console.log('entity : ', entity);
  };
  const viewEntityData = (record: IDataType) => () => {
    props.onView(record.data);
  };

  const tableData: IDataType[] = props.entities.map((entity: IEntity, index: number) => ({
    key: index,
    name: entity.name,
    description: entity.description,
    data: entity,
  }));
  const columns: ColumnsType<IDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/entity/${record.data.databaseName}`} state={{ currentEntity: record.data }}>
            <div onClick={viewEntityData(record)}>view</div>
          </Link>
          <div onClick={editEntity(record)}>Edit</div>
          <div onClick={deleteEntity(record)}>Delete</div>
        </Space>
      ),
    },
  ];

  return (
    <EntityListContainer>
      <Table data={tableData} columns={columns} />
    </EntityListContainer>
  );
};

export default EntityLis;
