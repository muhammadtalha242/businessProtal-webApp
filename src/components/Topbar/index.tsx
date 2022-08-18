import React from 'react';
import { TopbarContainer } from './container';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Notifications from './notifications';

interface Props {
  onSidebarStateChange: (collapsed: boolean) => void;
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
}

const TopBar: React.FC<Props> = ({ onSidebarStateChange, isSidebarCollapsed, isDarkMode }) => {
  return (
    <TopbarContainer className="site-layout-background">
      {React.createElement(isSidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => onSidebarStateChange(!isSidebarCollapsed),
      })}
      <Notifications />
    </TopbarContainer>
  );
};

export default TopBar;
