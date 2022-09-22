import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import Permissions from '../components/Permissions';
import { EntityPermissionsContainer } from '../components/container';

interface Props {}

const PermissionsPage: React.FC<Props> = (Props) => {
  return (
    <EntityPermissionsContainer>
      <Permissions />
    </EntityPermissionsContainer>
  );
};

export default withDashboardLayout(PermissionsPage);
