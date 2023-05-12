import React from 'react';
import LeftMenu from '../../business/left-menu/LeftMenu';
import { Layout } from 'antd';
import { Header } from '../../index';
import { ScpSpan } from '../../basic';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss'

const { Content } = Layout;

interface PropsTypes {
  loading?: boolean;
  children?: React.ReactNode;
}

export const MainLayout: React.FC<PropsTypes> = ({ loading = false, children }) => {
  return (
    <>
      <Layout className={styles.layout}>
        <Header />
        <Layout>
          <LeftMenu />
          <Content style={{ overflow: 'auto' }}>
            <div className={styles.content}>{loading ? <ScpSpan /> : children}</div>
          </Content>
        </Layout>
      </Layout>
      <Outlet />
    </>
  );
};
