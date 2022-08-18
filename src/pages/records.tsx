import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import Records from '../components/Records';
import { EntityRecordsContainer } from '../components/container';

interface Props {}

const RecordsPage: React.FC<Props> = (Props) => {
  return (
    <EntityRecordsContainer>
      <Records />
    </EntityRecordsContainer>
  );
};

export default withDashboardLayout(RecordsPage);
