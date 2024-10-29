import React from 'react';

import styles from './HomePage.module.css';
import { Col, Row } from 'antd';
import { MainLayout, BaseRingPieCharts, ResourceCard, TaskItemCard } from '../../components';
import { faCube, faCubes, faFileArchive, faHistory } from '@fortawesome/free-solid-svg-icons';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      {/* Resources */}
      <div className={styles.Resource}>
        <h2 className={styles.titleText}>Resources</h2>
        <Col className={styles.ResourceItem}>
          <ResourceCard title={'Resources'} count={3} icon={faCube} to={'/projects'} />
          <ResourceCard title={'Application'} count={3} icon={faCubes} to={'/app-infos'} />
          <ResourceCard title={'Scan Records'} count={3} icon={faHistory} to={'/dashboard'} />
          <ResourceCard title={'Scan Results'} count={3} icon={faFileArchive} to={'/dashboard'} />
        </Col>
      </div>

      {/* 统计 */}
      <div className={styles.Resource}>
        <h2 className={styles.titleText}>Statistics</h2>
        <Col className={styles.ResourceItem}>
          <BaseRingPieCharts
            title={'Security Tools'}
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
            title={'Usecases'}
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
            <h2 className={styles.titleText}>Lastest Scan</h2>
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
            <h2 className={styles.titleText}>Waiting Tasks</h2>
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
