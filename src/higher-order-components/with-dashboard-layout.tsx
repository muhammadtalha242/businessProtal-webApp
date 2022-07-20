import React from "react";
import {useParams} from 'react-router-dom';

import {
  DashboardContentContainer,
  DashBoardLayoutContainer,
  DashboardMainContainerContainer,
} from "../components/container";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
// import { RouteComponentProps } from 'react-router';

interface IWrappedProps {}

interface State {}
const withDashboardLayout = (
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> => {
  return class extends React.Component<IWrappedProps, State> {
    render(): React.ReactNode {
      return (
        <>
          <Sidebar />
          <DashboardMainContainerContainer sidebarWidth={248}>
            <Topbar />
            <DashboardContentContainer>
              <WrappedComponent {...this.props} />
            </DashboardContentContainer>
          </DashboardMainContainerContainer>
        </>
      );
    }
  };
};

export default withDashboardLayout;
