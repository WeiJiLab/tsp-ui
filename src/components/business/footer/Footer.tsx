import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>{t('footer.detail') as ReactNode}</Layout.Footer>
  );
};
