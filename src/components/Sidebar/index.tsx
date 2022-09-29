import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'antd';

import { MenuItem, SidebarLinks } from '../../iterators/sidebaLinks';
import { LogoContainer, SidebarContainer } from './container';
import { useNavigate } from 'react-router';
import { MenuItemGroupProps } from 'antd/lib/menu';
import { UserContext } from '../../context/user.context';
import { USER_GROUP_MAP } from '../../constants/userGroups';

interface Props {
  collapsed: boolean;
  onSidebarStateChange: (collapsed: boolean) => void;
  onSidebarItemUpdate: Function;
  sidebarItem: MenuItem[];
}

const SideBar: React.FC<Props> = ({ collapsed, onSidebarStateChange, sidebarItem }) => {
  const { state: userState } = useContext(UserContext);
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredItem = sidebarItem.filter((item: MenuItem) => {
      if (!item.requiresAdmin || (item.requiresAdmin && userState.userGroupCodes?.includes(USER_GROUP_MAP.SYSTEM_ADMIN))) {
        return item;
      }
    });
    setSidebarItems(filteredItem);
  }, [sidebarItem]);

  const onSelect: any = (e: any) => {
    // navigate(e.key);
  };
  const onClick: any = (e: any) => {
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
