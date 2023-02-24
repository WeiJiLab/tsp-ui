import React from 'react';
import { Layout, Menu } from 'antd';
import { MENU_ITEMS, MENU_NAVIGATE } from './MenuItems';
import { useNavigate } from 'react-router-dom';
import { menuSlice } from '../../../redux/menu/slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const LeftMenu: React.FC = () => {
  const navigate = useNavigate();
  const collapsed = useAppSelector((state) => state.menu.collapsed);
  const themeMode = useAppSelector((state) => state.menu.themeMode);
  const dispatch = useAppDispatch();

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => dispatch(menuSlice.actions.switchCollapsed())}
      theme={themeMode}
      width="250"
    >
      <div className='logo'></div>
      <Menu
        theme={themeMode}
        defaultSelectedKeys={['1']}
        mode='inline'
        items={MENU_ITEMS}
        onClick={({ key }) => {
          const path = MENU_NAVIGATE.get(key);
          if (path) {
            navigate(path);
          }
        }}
      />
    </Layout.Sider>
  );
};

export default LeftMenu;
