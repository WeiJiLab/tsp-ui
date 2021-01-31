import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Task.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faCube,
    faDownload,
    faEject,
    faFileSignature,
    faPlayCircle,
    faShieldAlt,
    faSpinner,
    faStopCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getCase} from "../../actions/CasesAction";
import {getScanTask} from "../../actions/TasksAction";
import {getTool} from "../../actions/ToolsAction";
import {getApp, getProject} from "../../actions/ProjectsAction";

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Case'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'扫描任务基本信息'} w={6}>
                    <Container>
                        {this.renderStatus(this.props.task.status)}
                        <span style={{fontSize: '1em', float: 'right'}}>{this.props.task.endTime ? this.props.task.endTime : '未结束'}</span>
                        <span style={{fontSize: '1em', float: 'right'}}>{this.props.task.startTime ? this.props.task.startTime : '未开始-'}</span>
                    </Container>
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderAppCard()}
                {this.renderCaseCard()}
                {this.renderToolCard()}
            </Row>
        </Container>
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

    renderCaseCard() {
        return <Card title={'用例信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;{this.props.cas.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.scriptPath}&nbsp;&nbsp;<FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faDownload}/></h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    renderToolCard() {
        return <Card title={'工具信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faShieldAlt}/>&nbsp;{this.props.tool.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.tool.description}</h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    renderAppCard() {
        return <Card title={'应用信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}}
                                             icon={faCube}/>&nbsp;{this.props.project.name} &nbsp;/&nbsp; {this.props.app.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <span style={{fontSize: '1.1em'}}>{this.props.project.description}</span>
                    </Col>
                    <Col md={12}>
                        <span style={{fontSize: '1.1em'}}>{this.props.app.description}</span>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }


    componentDidMount() {
        this.props.getScanTask(this.props.match.params.taskId);
        if (this.props.task.useCase) {
            this.props.getCase(this.props.task.useCase.id);
        }
        if (this.props.task.securityTool) {
            this.props.getTool(this.props.task.securityTool.id);
        }
        if (this.props.task.application) {
            this.props.getApp(this.props.task.application.projectId, this.props.task.application.id);
            this.props.getProject(this.props.task.application.projectId);
        }
        this.props.setBreadCrumbMenu([
            {
                title: 'Task',
                clickable: false,
                route: ''
            }
        ]);
    }
}

const mapStateToProps = state => ({
    cas: state.reduxResult.cas.data,
    task: state.reduxResult.task.data,
    app: state.reduxResult.app.data,
    project: state.reduxResult.project.data,
    tool: state.reduxResult.tool.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCase,
    getTool,
    getScanTask,
    getApp,
    getProject,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Task);
