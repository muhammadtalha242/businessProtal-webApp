import React, { useEffect, useContext, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router';
import jsCookie from 'js-cookie';

import { UserContext } from '../context/user.context';
import { AuthContext } from '../context/auth.context';

import { matchPath } from '../utils/helper';
import { useLocalStorage } from '../hooks/useLocalStorage';

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ResetPassword from '../pages/auth/reset-password';
import VerifyAccount from '../pages/auth/verify-account';
import NewPassword from '../pages/auth/new-password';
import Dashboard from '../pages/home';
import Entity from '../pages/entity';
import EntityRecords from '../pages/records';
import EntityPermission from '../pages/permission';
import Administartion from '../pages/administration';

interface props {}

interface IPage {
  key: string;
  path: string;
  exact: boolean;
  isProtected: boolean;
  component: React.ElementType;
  subComponent?: React.ElementType;
}

const PAGES: IPage[] = [
  {
    key: 'dashboard',
    path: '/',
    exact: true,
    isProtected: true,
    component: Dashboard,
  },
  {
    key: 'entity',
    path: '/entity',
    exact: true,
    isProtected: true,
    component: Entity,
  },
  {
    key: 'entity',
    path: '/entity/:entityName',
    exact: true,
    isProtected: true,
    component: EntityRecords,
  },
  {
    key: 'entity',
    path: '/entity/:entityName/:recordId',
    exact: true,
    isProtected: true,
    component: EntityRecords,
  },
  {
    key: 'permissions',
    path: '/entity/:entityName/permissions',
    exact: true,
    isProtected: true,
    component: EntityPermission,
  },
  {
    key: 'admin',
    path: '/admin',
    exact: true,
    isProtected: false,
    component: Administartion,
  },

  /**auth-routes**/
  {
    key: 'login',
    path: '/login',
    exact: true,
    isProtected: false,
    component: Login,
  },
  {
    key: 'register',
    path: '/register',
    exact: true,
    isProtected: false,
    component: Register,
  },
  {
    key: 'new-password',
    path: '/new-password',
    exact: true,
    isProtected: false,
    component: NewPassword,
  },
  {
    key: 'reset-password',
    path: '/reset-password',
    exact: true,
    isProtected: false,
    component: ResetPassword,
  },
  {
    key: 'verify-account',
    path: '/verify-account',
    exact: true,
    isProtected: false,
    component: VerifyAccount,
  },
];

const Router: React.FC<props> = (props) => {
  const location = useLocation();
  const history = useNavigate();
  const { state: useState, dispatch: userDispatch } = useContext(UserContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const isLoaded = useRef(true);

  useEffect(() => {
    console.log('path: ');

    const sessionCheck = () => {
      const accessToken = jsCookie.get('accessToken');
      const path = location.pathname;
      // const [storedValue, setValue] = useLocalStorage("testKey", "TEST")

      const route = PAGES.find((page) => page.path === path || matchPath(path, page.path));
      console.log('path: ', path);
      console.log('authState.isAuthenticated: ', authState.isAuthenticated);

      if (!authState.isAuthenticated && !!accessToken) {
        history('/login');
      } else if (authState.isAuthenticated || (!authState.isAuthenticated && !route?.isProtected)) {
        history(path);
      } else {
        history('/login');
      }
    };
    if (isLoaded.current === true || process.env.NODE_ENV !== 'development') {
      sessionCheck();
    }
    return () => {
      console.log('isLoaded pre: ', isLoaded.current);
      isLoaded.current = false;
    };
  }, [location, history, authState]);
  const filteredPages: IPage[] = [];
  PAGES.forEach((page) => {
    if (authState.isAuthenticated || !page.isProtected) filteredPages.push(page);
  });

  const Components = filteredPages.map((page: IPage) => {
    return <Route key={page.key} path={page.path} element={<page.component {...props} />} />;
  });

  return <Routes>{Components}</Routes>;
};
export default Router;
