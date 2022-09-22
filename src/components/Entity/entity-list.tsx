import React, { useContext } from 'react';
import { Space } from 'antd';

import { UserContext } from '../../context/user.context';

import { EntityListContainer } from './container';
import { IEntity } from './form';
import Table from '../common/table-dragable';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { USER_GROUP_MAP } from '../../constants/userGroups';

interface props {
  entities: IEntity[];
  onEdit: (entity: IEntity) => void;
  onView: (entity: IEntity) => void;
  onDelete: (entityId: number) => void;
}

export interface IDataType {
  key: number;
  name: string;
  description: string;
  data: IEntity;
}

const EntityLis: React.FC<props> = (props) => {
  const { state: userState } = useContext(UserContext);

  const editEntity = (record: IDataType) => () => {
    props.onEdit(record.data);
  };

  const deleteEntity = (record: IDataType) => () => {
    if (record.data.id) props.onDelete(record.data.id);
  };

  const viewEntityData = (record: IDataType) => () => {
    props.onView(record.data);
  };
  console.log('userState.userGroup: ', typeof userState.userGroup?.code);
  console.log('userState.userGroup?.code: ');

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

          {userState.userGroup?.code.toString() === USER_GROUP_MAP.SYSTEM_ADMIN && (
            <Link to={`/entity/${record.data.databaseName}/permissions`}>
              <div onClick={viewEntityData(record)}>permissions</div>
            </Link>
          )}
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
