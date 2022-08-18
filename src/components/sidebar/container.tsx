import styled from 'styled-components';
import { Layout, Menu } from 'antd';

import { GREEN_PRIMARY, GREY_QUATERNARY, NAVY_PRIMARY, WHITE } from '../../styles/colors';

import { sidebar } from '../../styles/constants';
const { Sider } = Layout;

interface ISidebarListContainerProps {
  collapsed: boolean;
}

interface ISidebarContainerProps {
  collapsed: boolean;
}

interface ISidebarHeaderContainerProps {
  collapsed: boolean;
}

export const SidebarContainer = styled(Sider)<ISidebarContainerProps>`
  left: 0;
  top: 0;
  min-height: 100vh;
  width: ${(props) => (props.collapsed ? sidebar.collapsed.width : sidebar.width)}px;
  background: ${WHITE};
`;

export const LogoContainer = styled.div``;


export const SidebarHeaderContainer = styled.div<ISidebarHeaderContainerProps>`
  margin: 24px 16px 32px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;