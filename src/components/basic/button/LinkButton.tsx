import React from 'react';
import styles from './LinkButton.module.scss';

interface LinkProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement> | undefined) => void;
    style?: React.CSSProperties;
}

const LinkButton: React.FC<LinkProps> = ({children, onClick, style, ...rest}) => {

    return (
        <div className={styles.LinkButton}>
            <a onClick={onClick} style={style} className={styles.link} {...rest}>
                {children}
            </a>
        </div>
    );
};

export default LinkButton;
