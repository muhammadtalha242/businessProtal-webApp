import React from "react";
import { SidebarContainer } from "./container";

interface Props {}

const SideBar: React.FC<Props> = (Props) => {
  return <SidebarContainer collapsed={false}>Side bar</SidebarContainer>;
};

export default SideBar;
