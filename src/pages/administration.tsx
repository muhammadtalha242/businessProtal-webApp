import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import Admin from '../components/Administration';
import { AdministrationContainer } from '../components/container';

interface props {}

const Administration: React.FC<props> = (props) => {
  return (
    <AdministrationContainer>
      <Admin />
    </AdministrationContainer>
  );
};

export default withDashboardLayout(Administration);
