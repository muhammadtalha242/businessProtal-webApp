import React from 'react';
import styled from 'styled-components';

import { GREEN_PRIMARY, NAVY_PRIMARY, RED_PRIMARY } from '../../styles/colors';

interface Props {
  color: string;
  value?: number;
  text?: string;
}

const StatusContainer = styled.div`
  &.flex {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  &.green {
    font-weight: 500;
    color: ${GREEN_PRIMARY};
  }
  &.red {
    font-weight: 500;
    color: ${RED_PRIMARY};
  }
  .bullet {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
  }
  .green-bullet {
    background: ${GREEN_PRIMARY};
  }
  .red-bullet {
    background: ${RED_PRIMARY};
  }
  .value {
    font-weight: 600;
    font-size: 14px;
    color: ${NAVY_PRIMARY};
    margin: 0;
    margin-left: 8px;
  }
`;

const Status: React.FC<Props> = ({ color, value, text }) => {
  return (
    <StatusContainer className={`${color} flex`}>
      <div className={`bullet ${color}-bullet`} />
      {text} <span className="value">{value}</span> 
    </StatusContainer>
  );
};

export default Status;