import React from 'react';

import {Card, Col, Row} from 'antd';

import styles from './AppCard.module.scss';
import {useNavigate} from 'react-router-dom';

interface PropsTypes {
    appId: string,
    appName: string,
    securityToDoCount: number,
    VulnerabilityHighCount: number,
    VulnerabilityMediumCount: number,
    VulnerabilityLowCount: number,
}

const AppCard: React.FC<PropsTypes> = (
    {
        appId,
        appName,
        securityToDoCount,
        VulnerabilityHighCount,
        VulnerabilityMediumCount,
        VulnerabilityLowCount,
    }
) => {

    const navigate = useNavigate();

    return (
        <Card
            className={styles['AppCard']}
            hoverable={true}
            style={{
                marginTop: 10,
                marginLeft: 10,
                width: 300,
            }}
            onClick={() => navigate(`/my-apps-infos/${appId}`)}
        >
            <Row align={'middle'} justify={'center'} style={{
                height: 50,
                marginBottom: 10
            }}>
                <h3 className={styles.AppName}>{appName}</h3>
            </Row>
            <Row align={'middle'} justify={'center'}>
                <Col span={24}>
                    <div className={styles.SecuritySubCard}>
                        <Row>
                            <h4 className={styles.StatisticalTitleStyle}>Security To-Do</h4>
                        </Row>
                        <Row>
                            <h2 className={styles.SecurityToDoCount}>
                                {securityToDoCount}
                            </h2>
                        </Row>
                    </div>
                    <div className={styles.SecuritySubCard}>
                        <Row>
                            <h4 className={styles.StatisticalTitleStyle}>Security Findings</h4>
                        </Row>

                        <Row>
                            <h2 className={styles.VulnerabilityHigh}>
                                {VulnerabilityHighCount}
                            </h2>
                            <h2>/</h2>
                            <h2 className={styles.VulnerabilityMedium}>
                                {VulnerabilityMediumCount}
                            </h2>
                            <h2>/</h2>
                            <h2 className={styles.VulnerabilityLow}>
                                {VulnerabilityLowCount}
                            </h2>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
    );
}

export default AppCard;