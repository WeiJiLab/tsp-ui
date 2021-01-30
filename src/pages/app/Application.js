import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Application.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCube,
    faCubes,
    faEject,
    faFileSignature,
    faPlay,
    faPlayCircle,
    faShieldAlt,
    faSpinner,
    faStopCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getApp, getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getScanTasks} from "../../actions/TasksAction";
import {Link} from "react-router-dom";

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Application'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton onClick={this.gotoCreateScan.bind(this)}><FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderAppCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'扫描记录'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.props.tasks.length !== 0) ? this.props.tasks.map((task, index) => {
                                    return this.renderTaskRow(task, index);
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
                <Card title={'正在运行中的扫描任务'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.tasksFilterByStatus('RUNNING').length !== 0) ? this.props.tasks.map((task, index) => {
                                    return this.renderTaskRow(task, index);
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
            </Row>
        </Container>
    }

    tasksFilterByStatus(status) {
        let data = [];
        for (let i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i].status === status) {
                data.push(this.props.tasks[i]);
            }
        }
        return data;
    }

    gotoCreateScan() {
        this.props.history.push({
            pathname: '/task/create',
            createInfo: {
                projectId: this.props.match.params.projectId,
                appId: this.props.match.params.appId,
            }
        });
    }

    renderAppCard() {
        return <Card title={'应用信息'} w={3}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{this.props.app.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <span style={{fontSize: '1.1em'}}>{this.props.app.description}</span>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    renderTaskRow(task, index) {
        return <Container className={'AppItem'} key={index}>
            <Row style={{paddingTop: '0.5em', paddingBottom: '0.5em', borderBottom: 'solid 1px #f3f3f3'}}>
                <Col md={11}>
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
                                <Link to={'/case/' + task.useCaseEntity.id}>{task.useCaseEntity.name}</Link>
                            </h5>
                        </Col>
                    </Row>
                </Col>
                <Col md={1} style={{paddingTop: '0.7em'}}>
                    <Row>
                        {this.renderStatus(task.status)}
                    </Row>
                    <Row style={{marginTop: '0.3em'}}>
                        <span style={{fontSize: '0.77em'}}>{task.startTime ? task.startTime : '未开始'}</span>
                    </Row>
                </Col>
            </Row>
        </Container>;
    }

    renderStatus(status) {
        switch (status) {
            case 'READY':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faPlayCircle}/>;
            case 'RUNNING':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faSpinner}/>;
            case 'DONE':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faCheckCircle}/>;
            case 'FAILED':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faTimesCircle}/>;
            case 'ABORT':
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faStopCircle}/>;
            default:
                return <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faEject}/>;
        }
    }


    componentDidMount() {
        this.props.getProject(this.props.match.params.projectId);
        this.props.getApp(this.props.match.params.projectId, this.props.match.params.appId);
        this.props.getScanTasks({
            appId: this.props.match.params.appId
        });

        this.props.setBreadCrumbMenu([
            {
                title: 'Projects',
                clickable: true,
                route: '/projects'
            },
            {
                title: 'Project-' + this.props.match.params.projectId,
                clickable: true,
                route: '/project/' + this.props.match.params.projectId
            },
            {
                title: 'Application-' + this.props.match.params.appId,
                clickable: false,
                route: ''
            }
        ]);
    }
}

const mapStateToProps = state => ({
    project: state.reduxResult.project.data,
    app: state.reduxResult.app.data,
    tasks: state.reduxResult.tasks.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProject,
    getApp,
    getScanTasks,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Application);
