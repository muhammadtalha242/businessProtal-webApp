import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import Router from './routes';
import { Provider as UserProvider } from '../src/context/user.context';
import { Provider as AuthProvider } from '../src/context/auth.context';
import { Provider as EntityProvider } from '../src/context/entity.context';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <EntityProvider>
            <Router />
          </EntityProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
