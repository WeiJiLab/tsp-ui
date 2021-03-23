import React from "react";
import LeftMenu from "../../business/left-menu/LeftMenu";
import { Layout } from "antd";
import { Footer, Header } from "../../index";

const {Content} = Layout;

interface PropsTypes {
  children: React.ReactNode;
}

export const MainLayout: React.FC<PropsTypes> = (
    {
      children
    }
) => {
  return (
      <Layout style={{minHeight: '100vh'}}>
        <LeftMenu/>
        <Layout className="site-layout">
          <Header/>
          <Content style={{margin: '0 16px'}}>
            {/* 页面内容 content */}
            <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
              {children}
            </div>
          </Content>
          <Footer/>
        </Layout>
      </Layout>

  );
};
