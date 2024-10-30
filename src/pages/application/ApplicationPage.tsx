import React from 'react';
import styles from './ApplicationPage.module.css';
import { MainLayout, TaskItemCard } from '../../components';
import { Col, Row } from 'antd';
import PushButton from '../../components/basic/button/PushButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const ApplicationPage: React.FC = () => {
  const tasks = [
    {
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
    },
    {
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
    },
  ];

  const gotoCreateScan = () => {
    console.log('Create Scan Task');
  };

  const renderAppCard = () => {
    return (
      <div>
        <Row>
          <Col flex={12}>
            <h3>
              <FontAwesomeIcon style={{ color: 'rgb(36, 66, 164)' }} icon={faCube} />
              &nbsp;{'asfd'}
            </h3>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <Col flex={12}>
            <span style={{ fontSize: '1.1em' }}>{'description'}</span>
          </Col>
        </Row>
      </div>
    );
  };

  const renderProjectCard = () => {
    return (
      <div>
        <Row>
          <Col flex={12}>
            <h3>
              <FontAwesomeIcon style={{ color: 'rgb(36, 66, 164)' }} icon={faCube} />
              &nbsp;<Link to={'/project/' + 1}>{'Project Name'}</Link>
            </h3>
          </Col>
        </Row>
        <Row style={{ marginTop: '1em' }}>
          <Col flex={12}>
            <span style={{ fontSize: '1.1em' }}>{'description'}</span>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className={styles.Application}>
        <Row>
          <Col flex={12}>
            <PushButton onClick={gotoCreateScan}>
              <FontAwesomeIcon icon={faPlay} /> &nbsp;创建扫描任务
            </PushButton>
          </Col>
        </Row>
        <Row style={{ padding: 0, margin: 0, marginTop: '1em' }}>
          {renderAppCard()}
          {renderProjectCard()}
        </Row>

        <Row style={{ padding: 0, margin: 0, marginTop: '1em' }}>
          <div>
            <Row>
              {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => {
                  return <TaskItemCard task={task} key={index} />;
                })
              ) : (
                <span style={{ color: '#668' }}>无</span>
              )}
            </Row>
          </div>

          <div>
            <Row>
              {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => {
                  return <TaskItemCard task={task} key={index} />;
                })
              ) : (
                <span style={{ color: '#668' }}>无</span>
              )}
            </Row>
          </div>
        </Row>
      </div>
    </MainLayout>
  );
};
