import React, { useContext } from 'react';
import { Checkbox, Space } from 'antd';

import { UserContext } from '../../context/user.context';
import { EntityContext, setEntity } from '../../context/entity.context';

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
}

export interface IDataType {
  key: number;
  name: string;
  description: string;
  data: IEntity;
}

const EntityLis: React.FC<props> = (props) => {
  const { state: userState } = useContext(UserContext);
  const { state: entityState, dispatch: EntityDispatch } = useContext(EntityContext);

  const editEntity = (record: IDataType) => () => {
    console.log('record.data: ', record.data);

    props.onEdit(record.data);
  };

  const viewEntityData = (record: IDataType) => () => {
    setEntity(EntityDispatch)(record.data);
    props.onView(record.data);
  };

  const setSelectedEntity = (record: IDataType) => {
    setEntity(EntityDispatch)(record.data);
  };

  const tableData: IDataType[] = entityState.allEntities.map((entity: IEntity, index: number) => ({
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
          {userState.userGroupCodes?.includes(USER_GROUP_MAP.SYSTEM_ADMIN) && <div onClick={editEntity(record)}>Edit</div>}

          {/* <div onClick={deleteEntity(record)}>Delete</div> */}

          {userState.userGroupCodes?.includes(USER_GROUP_MAP.SYSTEM_ADMIN) && (
            <Link to={`/entity/${record.data.databaseName}/permissions`}>
              <div onClick={() => setSelectedEntity(record)}>permissions</div>
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
