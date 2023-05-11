import React, {useEffect, useState} from 'react';

import {Col, Row} from 'antd';
import styles from './MyAppsPage.module.scss';
import AppCard from '../../components/business/card/AppCard';
import {MainLayout} from '../../components';
import {myAppsData} from './Data';

const MyAppsPage: React.FC = () => {

    const [vulnerabilityHighAllCount, setVulnerabilityHighAllCount] = useState<number>(0);
    const [VulnerabilityMediumCount, setVulnerabilityMediumCount] = useState<number>(0);
    const [VulnerabilityLowCount, setVulnerabilityLowCount] = useState<number>(0);

    useEffect(() => {

        setVulnerabilityHighAllCount(
            myAppsData.reduce((a, item) => a + item.VulnerabilityHighCount, 0)
        );
        setVulnerabilityMediumCount(
            myAppsData.reduce((a, item) => a + item.VulnerabilityMediumCount, 0)
        );
        setVulnerabilityLowCount(
            myAppsData.reduce((a, item) => a + item.VulnerabilityLowCount, 0)
        );

    }, [])

    return (
        <MainLayout>
            <div className={styles['MyAppsPage']}>
                <div className={styles['MyAppHeader']}>
                    <Row align={'middle'} justify={'space-between'}>
                        <Col span={8}>
                            <h3 className={styles.HeaderNameFount}>My All Applications</h3>
                        </Col>
                        <Col span={16}>
                            <Row justify={'end'} style={{marginRight: 20}}>
                                <h2 className={styles.HeaderNameFount}>
                                    Notifications :&nbsp;
                                </h2>
                                <h2 className={styles.VulnerabilityHigh}>
                                    {vulnerabilityHighAllCount}
                                </h2>
                                <h2>&nbsp;/&nbsp;</h2>
                                <h2 className={styles.VulnerabilityMedium}>
                                    {VulnerabilityMediumCount}
                                </h2>
                                <h2>&nbsp;/&nbsp;</h2>
                                <h2 className={styles.VulnerabilityLow}>
                                    {VulnerabilityLowCount}
                                </h2>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className={styles['MyAppList']}>
                    <Row align={'middle'} justify={'center'}>
                        <Col span={24} className={styles.MyApps}>
                            {myAppsData.map((data, index) => (
                                <AppCard
                                    key={index}
                                    appId={data.appId}
                                    appName={data.appName}
                                    securityToDoCount={data.securityToDoCount}
                                    VulnerabilityHighCount={data.VulnerabilityHighCount}
                                    VulnerabilityMediumCount={data.VulnerabilityMediumCount}
                                    VulnerabilityLowCount={data.VulnerabilityLowCount}
                                />
                            ))}
                        </Col>
                    </Row>
                </div>
            </div>
        </MainLayout>
    );
}

export default MyAppsPage;
