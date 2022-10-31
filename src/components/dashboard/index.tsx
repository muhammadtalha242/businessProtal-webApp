import React from 'react';
import GoogleMapComponent from '../common/google-maps';

interface Props {}

const Dashboard: React.FC<Props> = (Props) => {
  return (
    <>
      This is DashBoard
      <GoogleMapComponent />
    </>
  );
};

export default Dashboard;
