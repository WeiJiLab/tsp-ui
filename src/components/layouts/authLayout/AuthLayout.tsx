import React from 'react';
import styles from './AuthLayout.module.css';
import logo from '../../../assets/logo.svg';
import { Link, Outlet } from 'react-router-dom';
import { CaretDownOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Footer } from '../../index';
import { useTranslation } from 'react-i18next';

const { Header, Content } = Layout;

interface PropsTypes {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<PropsTypes> = (props) => {
   const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout className={styles.userLayoutContainer}>
        <Header className={styles.header}>
          <div className={styles.lang}>
            <Dropdown overlay={menu}>
              <Button>
                {' '}
                {t('layout.select_language')} <CaretDownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <div className={styles.top}>
            <div className={styles.contentHeader}>
              <Link to='/'>
                <img alt='logo' className={styles.logo} src={logo} />
                <span className={styles.title}>{t('layout.scp_security_service_platform')}</span>
              </Link>
            </div>
            <div className={styles.desc}>{t('layout.scp_security_service_platform_desc')}</div>
            {props.children}
          </div>
        </Content>
        <Footer />
      </Layout>

      <Outlet />
    </>
  );
};
