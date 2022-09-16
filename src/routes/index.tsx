import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router';

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import ResetPassword from '../pages/auth/reset-password';
import VerifyAccount from '../pages/auth/verify-account';
import NewPassword from '../pages/auth/new-password';
import Dashboard from '../pages/home';
import Entity from '../pages/entity';
import EntityRecords from '../pages/records';
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
    isProtected: false,
    component: Dashboard,
  },
  {
    key: 'entity',
    path: '/entity',
    exact: true,
    isProtected: false,
    component: Entity,
  },
  {
    key: 'entity',
    path: '/entity/:entityName',
    exact: true,
    isProtected: false,
    component: EntityRecords,
  },
  {
    key: 'entity',
    path: '/entity/:entityName/:recordId',
    exact: true,
    isProtected: false,
    component: EntityRecords,
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
  const filteredPages = PAGES.filter((page: IPage) => !page.isProtected);

  const Components = filteredPages.map((page: IPage) => {
    return <Route key={page.key} path={page.path} element={<page.component {...props} />} />;
  });

  return <Routes>{Components}</Routes>;
};
export default Router;
