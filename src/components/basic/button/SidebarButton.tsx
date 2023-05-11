import React, {CSSProperties} from 'react';

import {Button} from 'antd';
import styles from './SidebarButton.module.css';

interface PropsTypes {
    style?: CSSProperties;
    disabled?: boolean;
    onClick?: any;
    children: React.ReactNode;
}


const SidebarButton: React.FC<PropsTypes> = ({style, disabled, onClick, children}) => {
    return (
        <Button style={style} disabled={disabled} onClick={onClick} className={styles.SidebarButton}>
            {children}
        </Button>
    );
}

export default SidebarButton;