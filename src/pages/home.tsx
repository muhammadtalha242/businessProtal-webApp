import React from "react";

import withDashboardLayout from "../higher-order-components/with-dashboard-layout";
import Dashboard from "../components/Dashboard";
import { DashBoardContainer } from "../components/container";

interface Props {}

const HomePage: React.FC<Props> = (Props) => {
  return (
    <DashBoardContainer>
      <Dashboard />
    </DashBoardContainer>
  );
};

export default withDashboardLayout(HomePage);
