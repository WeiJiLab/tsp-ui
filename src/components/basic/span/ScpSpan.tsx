import React from 'react';
import { Spin } from 'antd';

import styles from './ScpSpan.module.scss';

export const ScpSpan: React.FC = () => {
  return <Spin size='large' className={styles.container} />;
};
