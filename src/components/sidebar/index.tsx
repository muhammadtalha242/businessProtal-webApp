import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';

import { MenuItem, SidebarLinks } from '../../iterators/sidebaLinks';
import { LogoContainer, SidebarContainer } from './container';
import { useNavigate } from 'react-router';

interface Props {
  collapsed: boolean;
  onSidebarStateChange: (collapsed: boolean) => void;
  onSidebarItemUpdate: Function;
  sidebarItem: MenuItem[];
}

const SideBar: React.FC<Props> = ({ collapsed, onSidebarStateChange, sidebarItem }) => {
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>();

  useEffect(() => {
    setSidebarItems(sidebarItem);
  }, [sidebarItem]);

  const navigate = useNavigate();
  const onSelect: any = (e: any) => {
    console.log('onSelect ', e);
    // navigate(e.key);
  };
  const onClick: any = (e: any) => {
    console.log('onClick ', e);
    navigate(e.key);
  };

  const updateSidebarItems = () => {};
  return (
    <SidebarContainer trigger={null} collapsible collapsed={collapsed}>
      <LogoContainer>
        <img src="/images/Polaris-Logo.jpg" alt="logo" />
      </LogoContainer>

      <Menu mode="inline" style={{ marginTop: 16 }} defaultSelectedKeys={['1']} onClick={onClick} onSelect={onSelect} items={sidebarItems} />
    </SidebarContainer>
  );
};

export default SideBar;
