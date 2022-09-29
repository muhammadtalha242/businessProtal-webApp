import styled from 'styled-components';
import { BLUE_TERTIARY, GREEN_PRIMARY, GREY_PRIMARY, GREY_QUATERNARY, GREY_QUINARY, GREY_SECONDARY, NAVY_PRIMARY, RED_PRIMARY, WHITE } from '../../styles/colors';

export const EntityComponenetContainer = styled.div``;

export const EntityFormContainer = styled.div`
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

  .form {
    .flex {
      display: flex;
    }

    .space-between {
      justify-content: space-between;
    }

    .left-col {
      width: 24%;
    }

    .right-col {
      width: 74%;
    }

    .field {
      margin-bottom: 16px;

      .label {
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
        letter-spacing: 0.05em;
        color: ${GREY_SECONDARY};
      }

      input {
        border: 1px solid ${GREY_PRIMARY};
        border-radius: 8px;
        height: 48px;
        width: 100%;
        padding: 16px 12px;
        outline: none;

        &:focus {
          border-color: ${GREEN_PRIMARY};
        }
      }
    }
  
    .add-field {
        padding: 16px 16px 0px 16px;
        text-align: right;
      }

  .form-inputs {
    display: flex;
    padding: 0px 16px 0px 16px;
    align-items: center;

    .form-input-left {
      width: 30%;
    }

    .form-input-center {
      width: 68%;
    }

    .form-input-right {
      width: 2%;
    }
  
  
}
.footer {
    display: flex;
    justify-content: space-between;
    padding: 0px 16px 16px 16px;

    .footer-left {
      display: flex;
    }

    .footer-right {
      display: flex;
    }
  }
`;

export const PopoverContent = styled.div`
  width: 174px;
  height: 120px;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .option {
    display: flex;
  }

  .left-col {
    width: 30px;
    text-align: center;
  }

  .right-col {
    width: calc(100% - 30px);
    padding-left: 4px;

    &.apply {
      color: ${GREEN_PRIMARY};
    }
  }
`;

export const IFieldRowContainer = styled.div`
  padding: 16px 12px;
  background: ${GREY_QUATERNARY};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;

  .row {
    line-height: 24px;
    padding: 0px 16px 0px 16px;
    align-items: center;

    .row-field {
      display: flex;
      margin-right: 4px;
      width: 100%;
      justify-content: space-between;

      .row-index {
        font-weight: bold;
        font-size: 14px;
        margin-right: 6px;
      }

      .field {
        width: 32.5%;
      }

      .field-settings {
        width: 2%;
      }
    }
  }
`;

export const EntitySettingsModalContainer = styled.div`
  background: ${GREY_QUATERNARY};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  width: 100%;
  height: fit-content;
  padding: 8px;

  .row {
    display: flex;
    justify-content: space-between;
  }

  .width-48 {
    width: 48%;
  }
`;

export const EntityListHeaderContainer = styled.div`
  padding: 4px 16px;
  display: inline-flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  color: ${GREY_PRIMARY};
  width: 100%;

  .checkbox {
    width: 2%;
  }

  .name {
    width: 30%;
  }

  .description {
    width: 50%;
  }

  .actions {
    width: 18%;
  }
`;

export const EntityListContainer = styled.div`
  padding-bottom: 12px;
`;

export const EntityItemContainer = styled.div`
  background: ${GREY_QUATERNARY};
  border-radius: 8px;
  height: 48px;
  margin-bottom: 8px;
  padding: 16px 12px;
  align-items: center;
  font-size: 14px;
  color: ${NAVY_PRIMARY};

  .flex {
    display: flex;

    .checkbox {
      width: 2%;
    }

    .name {
      width: 30%;
    }

    .description {
      width: 50%;
    }

    .actions {
      width: 18%;
    }
  }
`;
