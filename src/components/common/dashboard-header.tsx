import React from 'react';
import moment from 'moment';
import { DashboardHeaderContainer } from '../container';

interface Props {
  title: React.ReactNode | string;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<Props> = (props) => {
  return (
    <DashboardHeaderContainer>
      <div className="left-col">
        <h1 className="header-text">{props.title}</h1>
        {props.children}
      </div>
      <div className="right-col">
        <div className="date">{moment().format('MMMM, DD')}</div>
        <div className="time">{moment().format('hh:mm')}</div>
      </div>
    </DashboardHeaderContainer>
  );
};

export default DashboardHeader;
