import React, { useContext, useEffect, useState } from 'react';

import { EntityContext } from '../../context/entity.context';
import UserGroupService from '../../services/user-group';
import { IUserGroup } from '../Administration/user-group';
import Table from '../common/table-dragable';
import type { ColumnsType } from 'antd/es/table';
import SelectField, { IOptionType } from '../common/select';

interface props {}

const ENTITY_LEVEL_PERMISSIONS: IOptionType[] = [
  { value: 'None', label: 'None' },
  { value: 'readRecord', label: 'Read Record' },
  { value: 'createRecord', label: 'Edit Record' },
  { value: 'deleteRecord', label: 'Delete Record' },
];

export interface IDataType {
  key: number;
  userGroup: string;
}

const EntityPermission: React.FC<props> = (props) => {
  const { state: entityState } = useContext(EntityContext);
  const [userGroups, setuserGroups] = useState<IUserGroup[]>([]);
  const [columnData, setColumnData] = useState<ColumnsType<IDataType>>();
  const [tableData, setTableData] = useState<IDataType[]>();

  useEffect(() => {
    const fectchData = async () => {
      const res: IUserGroup[] = await fetchUserGroups();
      getTableColumns(res);
    };
    fectchData();
  }, []);

  const fetchUserGroups = async () => {
    const res = await UserGroupService.getUserGroups();
    setuserGroups(res.userGroups);
    return res.userGroups;
  };

  const getTableColumns = (res: IUserGroup[]) => {
    const columns: ColumnsType<IDataType> = [
      {
        title: 'Entity Permissions',
        dataIndex: 'entityPermissions',
        key: 'entityPermissions',
        render: (_, record) => {
          console.log(record);
          //if
          return (
            <>
              <SelectField
                options={ENTITY_LEVEL_PERMISSIONS}
                value={''}
                setValue={() => {}}
                placeholder="Choose Permission type"
                name="permissionType"
                key="permissionType"
                lineHeight={0}
                marginBottom={0}
              />
            </>
          );
        },
      },
    ];

    setColumnData([{ title: 'User Groups', dataIndex: 'userGroup' }, ...columns]);

    const rowData: IDataType[] = res.map((userGroup: IUserGroup, index: number) => {
      return {
        userGroup: userGroup.name,
        key: index,
        dataIndex: 'userGroups',
      };
    });
    setTableData([...rowData]);
  };
  console.log('tableData: ', tableData);
  console.log('columnData: ', columnData);

  return (
    <>
      <Table data={tableData} columns={columnData} />
    </>
  );
};
export default EntityPermission;
