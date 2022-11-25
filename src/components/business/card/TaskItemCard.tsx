import React from 'react';
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronRight,
  faClock,
  faCubes,
  faEject,
  faFileSignature,
  faShieldAlt,
  faSpinner,
  faStopCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment-timezone';

interface PropsTypes {
  task: any;
}

export const TaskItemCard: React.FC<PropsTypes> = ({ task }) => {
  const renderTime = () => {
    const timeDuring =
      moment(task.startTime).tz('Asia/ShangHai').fromNow() +
      '-' +
      moment(task.endTime).tz('Asia/ShangHai').fromNow();
    switch (task.status) {
      case 'READY':
        return <span style={{ fontSize: '0.77em' }}>未开始</span>;
      case 'RUNNING':
        return (
          <span style={{ fontSize: '0.77em' }}>
            {moment(task.startTime).tz('Asia/ShangHai').fromNow() + '-未结束'}
          </span>
        );
      case 'DONE':
        return <span style={{ fontSize: '0.77em' }}>{timeDuring}</span>;
      case 'FAILED':
        return <span style={{ fontSize: '0.77em' }}>{timeDuring}</span>;
      case 'ABORT':
        return <span style={{ fontSize: '0.77em' }}>{timeDuring}</span>;
      default:
        return <span style={{ fontSize: '0.77em' }}>{timeDuring}</span>;
    }
  };

  const renderStatus = (statue: any) => {
    switch (statue) {
      case 'READY':
        return (
          <FontAwesomeIcon style={{ color: 'rgb(36, 66, 164)', fontSize: '2em' }} icon={faClock} />
        );
      case 'RUNNING':
        return <FontAwesomeIcon style={{ color: 'green', fontSize: '2em' }} icon={faSpinner} />;
      case 'DONE':
        return (
          <FontAwesomeIcon
            style={{ color: 'rgb(36, 66, 164)', fontSize: '2em' }}
            icon={faCheckCircle}
          />
        );
      case 'FAILED':
        return <FontAwesomeIcon style={{ color: 'red', fontSize: '2em' }} icon={faTimesCircle} />;
      case 'ABORT':
        return <FontAwesomeIcon style={{ color: 'gray', fontSize: '2em' }} icon={faStopCircle} />;
      default:
        return <FontAwesomeIcon style={{ color: 'gray', fontSize: '2em' }} icon={faEject} />;
    }
  };

  return (
    <Card
      hoverable
      style={{
        marginTop: 10,
        marginLeft: 10,
      }}
    >
      <Row align={'middle'} justify={'center'}>
        <Col span={15}>
          <Row align={'middle'} justify={'center'}>
            <Col span={24}>
              <h4>
                <FontAwesomeIcon
                  style={{ color: 'rgb(36, 66, 164)', fontSize: '1.5em' }}
                  icon={faCubes}
                />
                &nbsp;
                {task.application && task.application.projectId ? (
                  <Link to={'/project/' + task.application.projectId + '/' + task.application.id}>
                    {task.application.name}
                  </Link>
                ) : (
                  'None'
                )}
              </h4>
            </Col>
          </Row>
          <Row align={'middle'} justify={'center'}>
            <Col span={12}>
              <h4>
                <FontAwesomeIcon
                  style={{ color: 'rgb(36, 66, 164)', fontSize: '1.5em' }}
                  icon={faShieldAlt}
                />
                &nbsp;
                {task.securityTool && task.securityTool.id ? (
                  <Link to={'/tool/' + task.securityTool.id}>{task.securityTool.name}</Link>
                ) : (
                  'None'
                )}
              </h4>
            </Col>
            <Col span={12}>
              <h4>
                <FontAwesomeIcon
                  style={{ color: 'rgb(36, 66, 164)', fontSize: '1.5em' }}
                  icon={faFileSignature}
                />
                &nbsp;
                {task.useCase && task.useCase.id ? (
                  <Link to={'/case/' + task.useCase.id}>{task.useCase.name}</Link>
                ) : (
                  'None'
                )}
              </h4>
            </Col>
          </Row>
        </Col>
        <Col span={7}>
          <Row>{renderStatus(task.status)}</Row>
          <Row style={{ marginTop: '0.3em' }}>{renderTime()}</Row>
        </Col>
        <Col span={2} style={{ paddingTop: '1em' }}>
          <Link to={'/task/' + task.id}>
            <FontAwesomeIcon
              style={{ color: 'rgb(36, 66, 164)', fontSize: '2em' }}
              icon={faChevronRight}
            />
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
