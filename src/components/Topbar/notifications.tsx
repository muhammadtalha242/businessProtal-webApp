import React, { useContext, useState } from 'react';
import { Badge, Popover, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { NotificationsDetailsContainer, DetailsContainer } from './container';
import { GREY_QUINARY } from '../../styles/colors';
import styled from 'styled-components';
import { UserContext, setUser, initialState } from '../../context/user.context';
import { useNavigate } from 'react-router';
import { error } from '../common/message';

interface NotificationsProps {}
const MenuPopover = styled(Menu)`
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);

  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 12px;
    color: ${GREY_QUINARY};
  }
`;

const NotificationsDetails: React.FC<NotificationsProps> = (props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { dispatch: userDispatch, state: userState } = useContext(UserContext);
  const history = useNavigate();
  
  const logout = ()=>{
    try {
      setUser(userDispatch)(initialState)
      history('/login')
    } catch (e :any) {
      error("Error.")
    }
  }

  const MenuOverlay = () => {
    return (
      <MenuPopover>
        <Menu.Item onClick={logout}>
          <div>
            <img src={'/images/icons/log-out.svg'} alt="logout" /> <span>Log Out</span>
          </div>
        </Menu.Item>
      </MenuPopover>
    );
  };
  let userGroupNames: string[] = [];
  if (userState.userGroupCodes) {
    userState.userGroupCodes.forEach((ugCode: number) => {
      // const ug = props.userGroups.find((userGroup: IOptionType) => {
      //   return userGroup.value === ugCode;
      // });
      // userGroupNames.push(ug ? ug.label : '');
    });
  }
  return (
    <NotificationsDetailsContainer>
      <Dropdown placement="bottomRight" overlay={MenuOverlay}>
        <DetailsContainer>
          <div className="identity">
            <div className="name">{userState.name}</div>
            {true && <div className="role">Admin</div>}
          </div>
          {/* <UserOutlined width={4} height={4} /> */}
          {/* <img width={56} height={56} style={{ borderRadius: '50%' }} src={userState.image} alt="profile" /> */}
        </DetailsContainer>
      </Dropdown>
    </NotificationsDetailsContainer>
  );
};

export default NotificationsDetails;
