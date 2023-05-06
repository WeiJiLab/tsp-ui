import React from 'react';
import { Row } from 'antd';
import styles from './UnAuthorizePage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

export const UnAuthorizePage: React.FC = () => {
  return (
    <div className={styles.UnAuthorizePage}>
      <Row style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', width: '100%', fontSize: '6em' }}>404</h1>
      </Row>
      <Row style={{ textAlign: 'center', marginTop: '2em' }}>
        <FontAwesomeIcon
          style={{ textAlign: 'center', fontSize: '5em', width: '100%' }}
          icon={faSadCry}
        />
      </Row>
      <Row style={{ textAlign: 'center', marginTop: '1em' }}>
        <h3 style={{ textAlign: 'center', width: '100%' }}>Oops, Unauthorized Page</h3>
      </Row>
    </div>
  );
};
