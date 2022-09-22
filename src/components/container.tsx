import styled from 'styled-components';
import { GREEN_PRIMARY, GREY_PRIMARY, NAVY_PRIMARY, WHITE } from '../styles/colors';

interface DashboardMainContainerProps {
  sidebarWidth: number;
}

export const DashBoardLayoutContainer = styled.div``;

export const DashBoardContainer = styled.div``;

export const EntityRecordsContainer = styled.div``;

export const EntityPermissionsContainer = styled.div``;

export const DashboardMainContainerContainer = styled.div<DashboardMainContainerProps>`
  margin-left: ${(props) => `${props.sidebarWidth}px`};
  overflow: hidden;
`;

export const DashboardContentContainer = styled.div`
  margin: 8px 32px;
`;

export const AuthFormContainer = styled.div`
  text-align: center;
  .content {
    padding: 32px;
    background: ${WHITE};
    // box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    margin: 0 auto;
    width: 460px;
    text-align: center;

    .heading {
      font-size: 28px;
      line-height: 42px;
      color: ${NAVY_PRIMARY};
      font-weight: bold;
    }

    .sub-heading {
      margin-top: 8px;
      font-size: 14px;
      line-height: 21px;
      color: ${NAVY_PRIMARY};

      .green {
        color: ${GREEN_PRIMARY};
      }
    }

    .form-container {
      text-align: left;

      .verify-input-container {
        text-align: center;
        display: flex;
        justify-content: space-between;
        width: 420px;
        margin: 0 auto;
        margin-bottom: 28px;

        input {
          width: 48px;
          height: 48px;
          border: 1px solid ${GREY_PRIMARY};
          border-radius: 8px;
          text-align: center;
        }
      }
    }
  }
`;

export const LoginFormContainer = styled.div`
  .social-login-component {
    display: flex;
    justify-content: center;

    .social-login-button {
      display: flex;
      align-items: center;
      margin-right: 16px;
      padding: 12px 16px;
      border-radius: var(--border-radius-small);
      border: 1px solid #c5c7d0;
      box-sizing: border-box;
      cursor: pointer;
      background: unset;
    }
  }
`;

export const DashboardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  .left-col {
    display: flex;
    align-items: center;

    .header-text {
      margin: 0 16px 0 0;
      font-weight: bold;
      font-size: 28px;
      line-height: 42px;
      color: ${NAVY_PRIMARY};
    }
  }

  .right-col {
    display: flex;
    align-items: center;
    font-weight: 500;

    .date {
      font-size: 16px;
      margin-right: 16px;
    }

    .time {
      font-size: 28px;
      line-height: 42px;
      color: ${GREEN_PRIMARY};
    }
  }
`;

export const AdministrationContainer = styled.div``;
