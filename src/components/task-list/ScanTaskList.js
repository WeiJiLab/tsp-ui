import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import moment from "moment-timezone";


class ScanTaskList extends Component {

    render() {
        const task = this.props.task;
        const index = this.props.key;
        return <Container className={'AppItem'} key={index}>
            <Row style={{paddingTop: '0.5em', paddingBottom: '0.5em', borderBottom: 'solid 1px #f3f3f3'}}>
                <Col md={10}>
                    <Row>
                        <Col md={6}>
                            <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCubes}/>&nbsp;
                                <Link to={'/project/' + task.application.projectId + '/' + task.application.id}>{task.application.name}</Link>
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h5><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faShieldAlt}/>&nbsp;
                                <Link to={'/tool/' + task.securityTool.id}>{task.securityTool.name}</Link>
                            </h5>
                        </Col>
                        <Col md={6}>
                            <h5><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;
                                <Link to={'/case/' + task.useCase.id}>{task.useCase.name}</Link>
                            </h5>
                        </Col>
                    </Row>
                </Col>
                <Col md={1} style={{paddingTop: '0.7em'}}>
                    <Row>
                        {this.renderStatus(task.status)}
                    </Row>
                    <Row style={{marginTop: '0.3em'}}>
                        {this.renderTime()}
                    </Row>
                </Col>
                <Col md={1} style={{paddingTop: '1em'}}>
                    <Link to={'/task/' + task.id}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faChevronRight}/></Link>
                </Col>
            </Row>
        </Container>;
    }

    renderTime() {
        let timeDuring = moment(this.props.task.startTime).tz('Asia/ShangHai').fromNow() + '-' + moment(this.props.task.endTime).tz('Asia/ShangHai').fromNow();
        switch (this.props.task.status) {
            case 'READY':
                return <span style={{fontSize: '0.77em'}}>未开始</span>;
            case 'RUNNING':
                return <span style={{fontSize: '0.77em'}}>{moment(this.props.task.startTime).tz('Asia/ShangHai').fromNow() + '-未结束'}</span>;
            case 'DONE':
                return <span
                    style={{fontSize: '0.77em'}}>{timeDuring}</span>;
            case 'FAILED':
                return <span
                    style={{fontSize: '0.77em'}}>{timeDuring}</span>;
            case 'ABORT':
                return <span
                    style={{fontSize: '0.77em'}}>{timeDuring}</span>;
            default:
                return <span
                    style={{fontSize: '0.77em'}}>{timeDuring}</span>;
        }
    }

    renderStatus(status) {
        switch (status) {
            case 'READY':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faClock}/>;
            case 'RUNNING':
                return <FontAwesomeIcon style={{color: 'green', fontSize: '2em'}} icon={faSpinner}/>;
            case 'DONE':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faCheckCircle}/>;
            case 'FAILED':
                return <FontAwesomeIcon style={{color: 'red', fontSize: '2em'}} icon={faTimesCircle}/>;
            case 'ABORT':
                return <FontAwesomeIcon style={{color: 'gray', fontSize: '2em'}} icon={faStopCircle}/>;
            default:
                return <FontAwesomeIcon style={{color: 'gray', fontSize: '2em'}} icon={faEject}/>;
        }
    }
}

export default ScanTaskList;
