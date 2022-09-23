import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import 'antd/dist/antd.css';

import Router from './routes';
import { Provider as UserProvider } from '../src/context/user.context';
import { Provider as AuthProvider } from '../src/context/auth.context';
import { Provider as EntityProvider } from '../src/context/entity.context';
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <EntityProvider>
              <Router />
            </EntityProvider>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
