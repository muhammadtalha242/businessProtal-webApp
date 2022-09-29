import React, { useContext, useEffect, useRef, useState } from 'react';

import { EntityContext, setAllEntities, updateEntityPermissions } from '../../context/entity.context';
import UserGroupService from '../../services/user-group';
import { IUserGroup } from '../Administration/user-group';
import Table from '../common/table-dragable';
import type { ColumnsType } from 'antd/es/table';
import MultiSelectField, { IOptionType } from '../common/select-multiple';
import DashboardHeader from '../common/dashboard-header';
import { FilledButton } from '../common/button';
import { BLUE_TERTIARY, WHITE } from '../../styles/colors';
import entityService from '../../services/entity';
import { error, success } from '../common/message';

interface props {}

const ENTITY_LEVEL_PERMISSIONS: IOptionType[] = [
  { value: 'entityPermissionsNone', label: 'None' },
  { value: 'entityPermissionsRead', label: 'Read Entity' },
  { value: 'entityPermissionsCreate', label: 'Create/Edit Records' },
  { value: 'entityPermissionsDelete', label: 'Delete Record' },
];

const entity_permissions = ['entityPermissionsNone', 'entityPermissionsRead', 'entityPermissionsCreate', 'entityPermissionsDelete'];
export interface IDataType {
  key: number;
  userGroup: string;
  data: IUserGroup;
}

interface IEntityLevelPermissions {
  [key: string]: string[];
}

const EntityPermission: React.FC<props> = (props) => {
  const { state: entityState, dispatch: entityDispatch } = useContext(EntityContext);
  const [entityPermissions, setEntityPermissions] = useState<IEntityLevelPermissions>({});
  const [userGroups, setuserGroups] = useState<IUserGroup[]>([]);
  const [columnData, setColumnData] = useState<ColumnsType<IDataType>>();
  const [tableData, setTableData] = useState<IDataType[]>();

  useEffect(() => {
    fectchData();
    console.log('entityState.selectEntity: ', entityState.selectEntity);
  }, []);

  const fectchData = async () => {
    const res: IUserGroup[] = await fetchUserGroups();
    console.log('REs', res);
    const values = setEntityPermissionsValues(res);

    getTableColumns(res, values);
  };
  const setEntityPermissionsValues = (userGroups: IUserGroup[]) => {
    const currentEntity: any = entityState.selectEntity;

    let values: IEntityLevelPermissions = {};
    userGroups.forEach((userGroup: IUserGroup) => {
      const permissions: string[] = [];
      entity_permissions.forEach((perm: string) => {
        if (currentEntity[perm].includes(userGroup.code)) permissions.push(perm);
      });

      values[userGroup.code] = permissions;
    });

    console.log('values: ', values);
    setEntityPermissions({ ...values });
    return values;
  };

  const fetchUserGroups = async () => {
    const res = await UserGroupService.getUserGroups();
    const test = await setuserGroups([...res.userGroups]);
    console.log(' user ', userGroups);
    console.log(' test ', test);

    return res.userGroups;
  };

  const onInputChange =
    (userGroup: IUserGroup) =>
    ({ name, value }: { name: string; value: string[] }) => {
      const currentEntityPermissions: IEntityLevelPermissions = { ...entityPermissions };

      currentEntityPermissions[userGroup.code] = [...value];

      console.log('currentEntityPermissions: ', currentEntityPermissions);

      setEntityPermissions((prev: IEntityLevelPermissions) => {
        return { ...prev, ...currentEntityPermissions };
      });
      return;
    };

  const getTableColumns = (res: IUserGroup[], values: IEntityLevelPermissions) => {
    const columns: ColumnsType<IDataType> = [
      {
        title: 'Entity Permissions',
        dataIndex: 'entityPermissions',
        key: `entityPermissions`,
        render: (_, record) => {
          const permissions = values || entityPermissions;

          console.log('permissions: ', permissions);
          console.log('permissions[record.data.code]: ', permissions[record.data.code]);
          return (
            <>
              <MultiSelectField
                options={ENTITY_LEVEL_PERMISSIONS}
                setValue={onInputChange(record.data)}
                defaultValue={values[record.data.code]}
                placeholder="Choose Permission type"
                name="permissionType"
                key={`permissionType ${record.data.code}`}
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
        data: userGroup,
      };
    });
    setTableData([...rowData]);
  };

  const savePermissions = async () => {
    const currentEntity: any = entityState.selectEntity;
    try {
      entity_permissions.forEach((perm: string) => {
        currentEntity[perm] = [];
      });
      Object.entries(entityPermissions).forEach((value: [string, string[]]) => {
        const [groupCode, permissions] = value;
        permissions.forEach((perm: string) => {
          currentEntity[perm].push(parseInt(groupCode));
        });
      });
      updateEntityPermissions(entityDispatch)(currentEntity);
      await entityService.updateEntity(currentEntity.databaseName, { entity: currentEntity });
      const res = await entityService.getEntities();
      setAllEntities(entityDispatch)(res.entities);
      success('Permissions updated successfully.');
    } catch (e: any) {
      error('Error.');

    }
  };

  return (
    <>
      <DashboardHeader title="Entity">
        <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={savePermissions}>
          <img src="/images/icons/add.svg" alt="add" /> Save Permissions
        </FilledButton>
      </DashboardHeader>
      <Table data={tableData} columns={columnData} />
    </>
  );
};
export default EntityPermission;
