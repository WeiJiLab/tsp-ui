import React from 'react'
import styles from './NoMatchPage.module.css'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row } from 'antd'

export const NoMatchPage: React.FC = () => {
  return (
    <div className={styles.NoMatch}>
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
        <h3 style={{ textAlign: 'center', width: '100%' }}>Oops, No page matched.</h3>
      </Row>
    </div>
  )
}
