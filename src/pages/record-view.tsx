import React from 'react';

import withDashboardLayout from '../higher-order-components/with-dashboard-layout';
import RecordView from '../components/RecordView';
import { EntityRecordsContainer } from '../components/container';

interface Props {}

const RecordsPage: React.FC<Props> = (Props) => {
  return (
    <EntityRecordsContainer>
      <RecordView />
    </EntityRecordsContainer>
  );
};

export default withDashboardLayout(RecordsPage);
