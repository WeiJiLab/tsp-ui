import styles from './App.module.scss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';

import { LoginPage, RegisterPage, HomePage, NoMatchPage, ProjectsPage, AppInfoPage } from './pages';
import { useAppDispatch } from './hooks';
import { isAuthenticated } from './common';
import { logOut } from './redux/auth/auth-slice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated()) {
      dispatch(logOut());
    }
  }, [dispatch]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/app-infos' element={<AppInfoPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path={'*'} element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
