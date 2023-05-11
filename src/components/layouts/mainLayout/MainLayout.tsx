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
      <Layout style={{ maxHeight: '100vh' }}>
        <Header />
        <Layout className='site-layout'>
          <LeftMenu />
          <Content style={{ overflow: 'auto' }}>
            {/* 页面内容 content */}
            <div className='site-layout-background' style={{ padding: 24, minHeight: 360 }}>
              {loading ? <ScpSpan /> : children}
            </div>
            {/* <Footer /> */}
          </Content>
        </Layout>
      </Layout>

      <Outlet />
    </>
  );
};
