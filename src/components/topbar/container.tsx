import styled from "styled-components";
import { GREEN_PRIMARY } from "../../styles/colors";

export const TopbarContainer = styled.div`
  height: 56px;
  margin: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 4px solid ${GREEN_PRIMARY};

  .hamburger {
    cursor: pointer;
  }
`;
