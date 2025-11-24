
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from './SharedLayout';
import { appRoutes } from '../utils/routes';  

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SharedLayout />}>
        {appRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;