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
import EntityLevelPermission from './entity-level-permissions';

interface props {}

const EntityPermission: React.FC<props> = (props) => {
  const { state: entityState, dispatch: entityDispatch } = useContext(EntityContext);

  const savePermissions = (cb: any) => {
    console.log('in parent');
    // cb();
  };

  return (
    <>
      <DashboardHeader title={`Entity-Permissions: ${entityState.selectEntity.name}`}>
        <FilledButton width="164px" height="32px" background={BLUE_TERTIARY} color={WHITE} font="14px" onClick={savePermissions}>
          <img src="/images/icons/add.svg" alt="add" /> Save Permissions
        </FilledButton>
      </DashboardHeader>
      <EntityLevelPermission savePermissions={savePermissions} />
    </>
  );
};
export default EntityPermission;
