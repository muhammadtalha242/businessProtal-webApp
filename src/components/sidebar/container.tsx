import styled from "styled-components";

import {
  GREEN_PRIMARY,
  GREY_QUATERNARY,
  NAVY_PRIMARY,
  WHITE,
} from "../../styles/colors";
import { sidebar } from "../../styles/constants";

interface ISidebarListContainerProps {
  collapsed: boolean;
}

interface ISidebarContainerProps {
  collapsed: boolean;
}

interface ISidebarHeaderContainerProps {
  collapsed: boolean;
}

export const SidebarContainer = styled.div<ISidebarContainerProps>`
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100vh;
  width: ${(props) =>
    props.collapsed ? sidebar.collapsed.width : sidebar.width}px;
  border: 4px solid ${GREEN_PRIMARY};
  border-radius: 0 16px 16px 0;
  box-sizing: border-box;
  background: ${WHITE};
`;
