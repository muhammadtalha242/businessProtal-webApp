import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import EntityComponenet from '../components/Entity';

interface props {}

const Entity: React.FC<props> = (props) => {
  return (
    <>
      <EntityComponenet {...props} />
    </>
  );
};

export default withDashboardLayout(Entity);
