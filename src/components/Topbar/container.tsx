import styled from 'styled-components';
import { Layout } from 'antd';
import { GREY_SECONDARY, NAVY_PRIMARY } from '../../styles/colors';
const { Header } = Layout;

export const TopbarContainer = styled(Header)`
  background: #fff;
  padding: 0px 8px 0px;
  display: flex;
  justify-content: space-between;
  
  .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: #1890ff;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  .identity {
    width: 212px;
    margin-right: 12px;
    text-align: right;

    .name {
      font-weight: 500;
      color: ${NAVY_PRIMARY};
      font-size: 18px;
      line-height: 27px;
    }

    .role {
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      color: ${GREY_SECONDARY};
    }
  }
`;

export const NotificationsDetailsContainer = styled.div`
  display: flex;
  align-items: center;
`;
