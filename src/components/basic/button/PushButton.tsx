import React, { CSSProperties } from 'react'
import styles from './PushButton.module.css'
import { Button } from 'antd'

interface PropsTypes {
  style?: CSSProperties
  disabled?: boolean
  onClick?: any
  children: React.ReactNode
}

const PushButton: React.FC<PropsTypes> = ({ style, disabled, onClick, children }) => {
  return (
    <Button style={style} disabled={disabled} onClick={onClick} className={styles.PushButton}>
      {children}
    </Button>
  )
}

export default PushButton
