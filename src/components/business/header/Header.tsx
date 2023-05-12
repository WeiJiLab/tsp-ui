import React, {useEffect, useState} from 'react';
import styles from './Header.module.scss';
import {Layout, Typography} from 'antd';
import logo from '../../../assets/new-header-logo.png';

import {useNavigate} from 'react-router-dom';

import {JwtUtils, getToken} from '../../../common';
import {useAppDispatch} from '../../../hooks';
import {logOut} from '../../../redux/auth/auth-slice';
import LinkButton from '../../basic/button/LinkButton';


export const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const jwtToken = getToken();

    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        if (jwtToken) {
            const token = JwtUtils.getJwtPayload(jwtToken);
            setUsername(token.username);
        }
    }, [jwtToken]);
    const onLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    return (
        <Layout.Header
            className={styles['HeaderContainer']}
        >
            <div className={styles.logo}>
                <img src={logo} alt='' height='30px'/>
                <h1>One Security</h1>
            </div>

            <div className={styles.RightContainer}>
                {jwtToken ? (
                    <>
                        <div className={styles.text}>
                            {'欢迎'}
                            <Typography.Text strong>{username}</Typography.Text>
                        </div>

                        <LinkButton onClick={onLogout}>
                            {'Logout'}
                        </LinkButton>
                    </>
                ) : (

                    <LinkButton onClick={() => navigate('/login')}>
                        {'Login'}
                    </LinkButton>
                )}
            </div>
        </Layout.Header>
    );
};
