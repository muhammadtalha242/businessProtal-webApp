import React from "react";

import withDashboardLayout from "../higher-order-components/with-dashboard-layout";
import EntityComponenet from "../components/entity";

interface props {}

const Entity: React.FC<props> = (props) => {
  return (
    <>
      <EntityComponenet />
    </>
  );
};

export default withDashboardLayout(Entity);
