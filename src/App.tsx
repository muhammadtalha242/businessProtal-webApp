import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import Router from './routes';
import { Provider as UserProvider } from '../src/context/user.context';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Router />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
