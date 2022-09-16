import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardContentContainer, DashBoardLayoutContainer, DashboardMainContainerContainer } from '../components/container';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import entityService from '../services/entity';

import { sidebar } from '../styles/constants';
import { MenuItem, SidebarLinks } from '../iterators/sidebaLinks';
import { IEntity } from '../components/Entity/form';
interface IWrappedProps {}

interface State {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  sidebarItems: MenuItem[];
}
const withDashboardLayout = (WrappedComponent: React.ComponentType<any>): React.ComponentType<any> => {
  const { Content } = Layout;
  return class extends React.Component<IWrappedProps, State> {
    state = { isSidebarCollapsed: false, isDarkMode: false, sidebarItems: SidebarLinks };
    // async componentDidMount() {
    //   console.log('LOGGING');

    //   try {
    //     let sidebarEntities: MenuItem[] = [];
    //     const res = await entityService.getEntities();
    //     res.entities.forEach((currentEntity: IEntity) => {
    //       if (currentEntity.isDisplayonMenu) {
    //         sidebarEntities.push({
    //           key: `/entity/${currentEntity.databaseName}`,
    //           label: `${currentEntity.name}`,
    //           link: `/entity/${currentEntity.databaseName}`,
    //         });
    //       }
    //     });
    //     this.setState({ sidebarItems: [...this.state.sidebarItems, ...sidebarEntities] });
    //     console.log('sidebarItems: ', this.state.sidebarItems);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    onSidebarStateChange = (collapsed: boolean) => {
      this.setState({ isSidebarCollapsed: collapsed });
    };

    onSidebarItemUpdate = (sidebarItem: MenuItem) => {

    };

    render(): React.ReactNode {
      const { isSidebarCollapsed, isDarkMode, sidebarItems } = this.state;
      const sidebarWidth = isSidebarCollapsed ? sidebar.collapsed.width : sidebar.width;
      return (
        <Layout>
          <Sidebar sidebarItem={sidebarItems} collapsed={isSidebarCollapsed} onSidebarStateChange={this.onSidebarStateChange} onSidebarItemUpdate={this.onSidebarItemUpdate} />
          <Layout className="site-layout">
            <Topbar isDarkMode={isDarkMode} isSidebarCollapsed={isSidebarCollapsed} onSidebarStateChange={this.onSidebarStateChange} />
            <Content>
              <DashboardContentContainer>
                <WrappedComponent {...this.props} onSidebarItemUpdate={this.onSidebarItemUpdate} />
              </DashboardContentContainer>
            </Content>
          </Layout>
        </Layout>
      );
    }
  };
};

export default withDashboardLayout;
