import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Layout, Button, Typography, Tooltip } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';
import { ToggleThemeButton } from './toggle-theme-button';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { JwtUtils, getToken } from '../../../common';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { menuSlice } from '../../../redux/menu/slice';
import { logOut } from '../../../redux/auth/auth-slice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const jwtToken = getToken();
  const themeMode = useAppSelector((state) => state.menu.themeMode);
  const collapsed = useAppSelector((state) => state.menu.collapsed);

  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    if (jwtToken) {
      const token = JwtUtils.getJwtPayload(jwtToken);
      setUsername(token.username);
    }
  }, [jwtToken]);

  const switchCollapsed = () => {
    dispatch(menuSlice.actions.switchCollapsed());
  };

  const onLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <Layout.Footer
      style={
        themeMode === 'dark'
          ? {
              backgroundColor: '#242526',
              boxShadow: '0 0 2px rgb(0 0 0/0.4)',
            }
          : {
              backgroundColor: '#ffffff',
              boxShadow: '0 0 2px rgb(0 0 0 / 0.1)',
            }
      }
      className={styles.HeaderContainer}
    >
      <Tooltip>
        {collapsed ? (
          <MenuUnfoldOutlined
            className={styles.menuIcon}
            onClick={switchCollapsed}
            style={themeMode === 'dark' ? { color: '#ffffff' } : { color: '#242526' }}
          />
        ) : (
          <MenuFoldOutlined
            className={styles.menuIcon}
            onClick={switchCollapsed}
            style={themeMode === 'dark' ? { color: '#ffffff' } : { color: '#242526' }}
          />
        )}
      </Tooltip>

      <div className={styles.RightContainer}>
        {jwtToken ? (
          <Button.Group className={styles['button-group']}>
            <div className={styles.text}>
              {'欢迎'}
              <Typography.Text strong>{username}</Typography.Text>
            </div>
            <Button onClick={onLogout}>{'注销'}</Button>
          </Button.Group>
        ) : (
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => navigate('/register')}>{'注册'}</Button>
            <Button onClick={() => navigate('/login')}>{'登录'}</Button>
          </Button.Group>
        )}
        <>
          <div style={{ width: '1em' }} />
          <ToggleThemeButton />
        </>
      </div>
    </Layout.Footer>
  );
};
