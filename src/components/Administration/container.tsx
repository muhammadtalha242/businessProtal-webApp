import styled from 'styled-components';

import { GREEN_PRIMARY, GREY_PRIMARY, GREY_QUATERNARY, NAVY_PRIMARY, WHITE } from '../../styles/colors';


export const AdministrationComponentContainer = styled.div``;

export const UserGroupHeaderContainer = styled.div`
  color: ${GREY_PRIMARY};
  text-align: start;
  font-weight: 600;
  padding-bottom: 24px;
  padding: 12px 16px 16px 16px;
  font-size: 12px;
  text-transform: uppercase;
`;

export const UserGroupDataRowsContainer = styled.div`
  text-align: start;
  background: ${GREY_QUATERNARY};
  box-shadow: 3px 3px 6px 0px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 12px 16px 16px 16px;
  margin-bottom: 16px;
`;

export const UserGroupContainer = styled.div`
  background: ${WHITE};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 12px 16px 16px 16px;
`;

export const UserGroupListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .flex {
    display: flex;
    justify-content: space-between;
    line-height: 36px;
    width: 75%;
    text-transform: uppercase;

    .name {
      font-weight: 600;
      font-size: 14px;
      color: ${GREEN_PRIMARY};
    }

    .total-group {
      font-weight: 600;
      font-size: 16px;
      color: ${NAVY_PRIMARY};
    }

    .groups {
      display: flex;
    }
  }
`;

export const UserGroupFormContainer = styled.div``;
