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

export const SortRecordsRowContainer = styled.div`
  cursor: pointer;

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
`;

export const FilterRecordsHeaderContainer = styled.div`
  color: ${BLACK};
  text-align: start;
`;

export const SortRecordsHeaderContainer = styled.div`
  color: ${BLACK};
  text-align: start;
`;

export const FieldNameContainer = styled.div`
  width: 30%;
`;
export const FieldValueContainer = styled.div`
  width: 70%;
`;

export const EntityRecordHeaderContainer = styled.div`
  padding: 4px 16px;
  display: inline-flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-transform: uppercase;
  color: ${BLACK};
  width: 100%;

  .left {
    width: 30%;
  }

  .right {
    width: 70%;
  }
`;

export const EntityRecordValuesContainer = styled.div`
  padding: 4px 16px;
  display: inline-flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  color: ${BLACK};
  width: 100%;
`;
