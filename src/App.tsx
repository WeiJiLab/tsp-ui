import styles from './App.module.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import {
  LoginPage,
  RegisterPage,
  HomePage,
  NoMatchPage,
  ProjectsPage,
  AppInfoPage,
  DetailAppInfo,
  ScanningPage,
  GuidePage,
} from './pages';
import { useAppDispatch, useAppSelector } from './hooks';
import { logOut } from './redux/auth/auth-slice';
import { UnAuthorizePage } from './pages/unauthorized';
import RequireUser from './route/RequireUser';
import MyAppsPage from './pages/my-apps/MyAppsPage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logOut());
    }
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          {/* Private Route */}
          <Route element={<RequireUser allowedRoles={['*', 'admin']} />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['*']} />}>
            <Route path='/my-apps' element={<MyAppsPage />} />
            <Route path='/guide' element={<GuidePage />} />
          </Route>

          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='projects' element={<ProjectsPage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='scanning' element={<ScanningPage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='/app-infos' element={<AppInfoPage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='/app-infos/:appInfoId' element={<DetailAppInfo />} />
          </Route>
          <Route path='unauthorized' element={<UnAuthorizePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path={'*'} element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
