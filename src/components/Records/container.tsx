import styled from 'styled-components';
import { BLACK, GREEN_PRIMARY, GREY_PRIMARY, GREY_SECONDARY, WHITE } from '../../styles/colors';

export const EntityRecordDisplayContainer = styled.div``;

export const EntityRecordFormContainer = styled.div`
  background: ${WHITE};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 12px 16px 16px 16px;
  margin-bottom: 64px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .text {
      font-weight: bold;
      font-size: 18px;
      color: ${GREY_PRIMARY};
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    padding: 0px 16px 16px 16px;
    .footer-right {
      display: flex;
    }
  }
`;

export const FilterCollapesContainer = styled.div`
  margin-bottom: 48px;
`;

export const FilterRecordsContainer = styled.div`
  .new-clause {
    margin: 12px 0;
    text-align: start;

    .image {
      margin-right: 8px;
      cursor: pointer;
    }

    .text {
      font-size: 16px;
      color: ${BLACK};
      cursor: pointer;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;

    .footer-right {
      display: flex;
    }
  }
`;

export const FilterRecordsRowContainer = styled.div`
  cursor: pointer;
`;

export const FilterRecordsHeaderContainer = styled.div`
  color: ${BLACK};
  text-align: start;
`;
