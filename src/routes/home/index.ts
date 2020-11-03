import React from 'react';
import { RouteConfig } from '../type';

const IndexComponent = React.lazy(() => import('src/page/home'));

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: IndexComponent,
    meta: {},
  },
];
