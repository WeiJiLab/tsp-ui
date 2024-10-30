import React from 'react';

import styles from './HomePage.module.css';
import { Col, Row } from 'antd';
import { MainLayout, BaseRingPieCharts, ResourceCard, TaskItemCard } from '../../components';
import { faCube, faCubes, faFileArchive, faHistory } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      {/* 资源 */}
      <div className={styles.Resource}>
        <h2 className={styles.titleText}>{t('home_page.resource')}</h2>
        <Col className={styles.ResourceItem}>
          <ResourceCard title={t('home_page.project')} count={3} icon={faCube} to={'/projects'} />
          <ResourceCard
            title={t('home_page.application')}
            count={3}
            icon={faCubes}
            to={'/app-infos'}
          />
          <ResourceCard
            title={t('home_page.scanning_records')}
            count={3}
            icon={faHistory}
            to={'/dashboard'}
          />
          <ResourceCard
            title={t('home_page.scan_results')}
            count={3}
            icon={faFileArchive}
            to={'/dashboard'}
          />
        </Col>
      </div>

      {/* 统计 */}
      <div className={styles.Resource}>
        <h2 className={styles.titleText}>{t('home_page.statistics')}</h2>
        <Col className={styles.ResourceItem}>
          <BaseRingPieCharts
            title={t('home_page.security_tools')}
            date={[
              { type: 'SCA', value: 27 },
              { type: 'SAST', value: 25 },
              { type: 'DAST', value: 18 },
              { type: 'IAST', value: 15 },
              { type: 'AUDIT', value: 10 },
              { type: 'Others', value: 19 },
            ]}
          />
          <BaseRingPieCharts
            title={t('home_page.use_case')}
            date={[
              { type: 'Inspec', value: 27 },
              { type: 'Others', value: 19 },
            ]}
          />
        </Col>
      </div>

      {/* 最近的扫描 */}
      <div className={styles.Resource}>
        <Row>
          <Col span={12}>
            <h2 className={styles.titleText}>{t('home_page.recent_scans')}</h2>
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                status: 'READY',
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                status: 'RUNNING',
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                status: 'DONE',
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
          </Col>
          <Col span={12}>
            <h2 className={styles.titleText}>{t('home_page.tasks_waiting_to_be_scanned')}</h2>
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                status: 'FAILED',
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                status: 'ABORT',
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
            <TaskItemCard
              task={{
                id: 1,
                application: {
                  projectId: 1,
                  name: 'name',
                  id: 1,
                },
                securityTool: {
                  id: 1,
                  name: 'toolsName',
                },
                useCase: {
                  id: 1,
                  name: 'useCaseName',
                },
                // status: "ABORT",
                startTime: '2018-05-01T00:00+08:00',
                endTime: '2022-05-01T00:00+08:00',
              }}
            />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};
