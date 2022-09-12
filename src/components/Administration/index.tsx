import React from 'react';
import { VerticalSpace } from '../common/space';

import { AdministrationComponentContainer } from './container';
import UserGroup from './user-group';
import Users from './users';

interface props {}

const Admin: React.FC<props> = (props) => {
  return (
    <AdministrationComponentContainer>
      <UserGroup />
      <VerticalSpace height={16} />
      <Users />
    </AdministrationComponentContainer>
  );
};

export default Admin;
