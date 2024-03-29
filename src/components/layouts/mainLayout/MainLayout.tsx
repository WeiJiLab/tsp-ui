import React from 'react';
import LeftMenu from '../../business/left-menu/LeftMenu';
import { Layout } from 'antd';
import { Footer, Header } from '../../index';
import { ScpSpan } from '../../basic';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

interface PropsTypes {
  loading?: boolean;
  children?: React.ReactNode;
}

export const MainLayout: React.FC<PropsTypes> = ({ loading = false, children }) => {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <LeftMenu />
        <Layout className='site-layout'>
          <Header />
          <Content style={{ margin: '0 16px' }}>
            {/* 页面内容 content */}
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
              {loading ? <ScpSpan /> : children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>

      <Outlet />
    </>
  );
};
