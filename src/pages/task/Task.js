import React from "react";
import {Col, Container, ProgressBar, Row} from "react-bootstrap";
import './Task.css';
import Card from "../../components/business/card/ResourceCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faClock,
    faCube,
    faDownload,
    faFileSignature,
    faQuestion,
    faShieldAlt,
    faSpinner,
    faStopCircle,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getCase} from "../../actions/CasesAction";
import {getScanResultByTaskId, getScanTask} from "../../actions/TasksAction";
import {getTool} from "../../actions/ToolsAction";
import {getApp, getProject} from "../../actions/ProjectsAction";
import {Link} from "react-router-dom";
import moment from "moment-timezone";
import {AWS_S3_BUCKET} from "../../api/ScpApi";

class Task extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Case'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'扫描状态'} w={6}>
                    <Container>
                        <Row>
                            <Col md={4}>
                                {this.renderStatus(this.props.task.status)}
                            </Col>
                            <Col md={8}>
                                <p style={{fontSize: '1em', marginTop: '0.6em', float: 'right'}}>{this.getTime()}</p>
                            </Col>
                        </Row>
                        <ProgressBar style={{margin: 0}} variant={this.getVariant()} animated now={this.getProgressCount()}/>
                    </Container>
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderAppCard()}
                {this.renderCaseCard()}
                {this.renderToolCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderResultCard()}
            </Row>
        </Container>
    }

    getTime() {
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


    getVariant() {
        if (this.props.task.status === 'READY' || this.props.task.status === 'RUNNING') {
            return "";
        } else if (this.props.task.status === 'DONE') {
            return 'success'
        } else if (this.props.task.status === 'ABORT') {
            return 'warning';
        } else if (this.props.task.status === 'FAILED') {
            return 'danger';
        } else {
            return "";
        }
    }

    getProgressCount() {
        switch (this.props.task.status) {
            case 'READY':
                return 6.18;
            case 'RUNNING':
                return 61.8;
            case 'DONE':
                return 100;
            case 'FAILED':
                return 100;
            case 'ABORT':
                return 100;
            default:
                return 61.8;
        }
    }

    renderStatus(status) {
        switch (status) {
            case 'READY':
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faClock}/>
                    <h3 style={{color: 'rgb(36, 66, 164)', display: 'inline-block'}}>&nbsp;准备中</h3>
                </Container>;
            case 'RUNNING':
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'green', fontSize: '2em'}} icon={faSpinner}/>
                    <h3 style={{color: 'green', display: 'inline-block'}}>&nbsp;扫描中</h3>
                </Container>;
            case 'DONE':
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em'}} icon={faCheckCircle}/>
                    <h3 style={{color: 'rgb(36, 66, 164)', display: 'inline-block'}}>&nbsp;扫描完成</h3>
                </Container>;
            case 'FAILED':
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'red', fontSize: '2em'}} icon={faTimesCircle}/>
                    <h3 style={{color: 'red', display: 'inline-block'}}>&nbsp;扫描失败</h3>
                </Container>;
            case 'ABORT':
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'gray', fontSize: '2em'}} icon={faStopCircle}/>
                    <h3 style={{color: 'gray', display: 'inline-block'}}>&nbsp;终止</h3>
                </Container>;
            default:
                return <Container style={{padding: 0}}>
                    <FontAwesomeIcon style={{color: 'gray', fontSize: '2em'}} icon={faQuestion}/>
                    <h3 style={{color: 'gray', display: 'inline-block'}}>&nbsp;未知状态</h3>
                </Container>;
        }
    }

    renderCaseCard() {
        return <Card title={'用例信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;<Link
                            to={'/case/' + this.props.cas.id}>{this.props.cas.name}</Link></h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.scriptPath}&nbsp;&nbsp;
                            <a href={AWS_S3_BUCKET + this.props.cas.scriptPath}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}}
                                                                                                 icon={faDownload}/></a></h6>
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
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faShieldAlt}/>&nbsp;<Link
                            to={'/tool/' + this.props.tool.id}>{this.props.tool.name}</Link></h3>
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
                                             icon={faCube}/>&nbsp;<Link
                            to={'/project/' + this.props.project.id}>{this.props.project.name}</Link> &nbsp;/&nbsp; <Link
                            to={"/project/" + this.props.project.id + '/' + this.props.app.id}>{this.props.app.name}</Link></h3>
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

    renderResultCard() {
        return <Card title={'扫描结果'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>{this.props.result.result}</h3>
                    </Col>
                </Row>

                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <span style={{fontSize: '1.1em'}}>{this.props.result.resultPath} </span>
                        {this.props.result.resultPath && this.props.result.resultPath !== '' ?
                            <a href={AWS_S3_BUCKET + this.props.result.resultPath}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}}
                                                                                                    icon={faDownload}/></a>
                            : null}
                    </Col>
                </Row>
            </Container>
        </Card>;
    }


    componentDidMount() {
        this.props.getScanTask(this.props.match.params.taskId);
        this.props.getScanResultByTaskId(this.props.match.params.taskId);
        this.props.setBreadCrumbMenu([
            {
                title: 'Task',
                clickable: false,
                route: ''
            }
        ]);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task !== this.props.task) {
            this.props.getCase(nextProps.task.useCase.id);
            this.props.getApp(nextProps.task.application.projectId, nextProps.task.application.id);
            this.props.getProject(nextProps.task.application.projectId);
            this.props.getTool(nextProps.task.toolId);
        }
    }
}

const mapStateToProps = state => ({
    cas: state.reduxResult.cas.data,
    task: state.reduxResult.task.data,
    app: state.reduxResult.app.data,
    project: state.reduxResult.project.data,
    tool: state.reduxResult.tool.data,
    result: state.reduxResult.result.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCase,
    getTool,
    getScanTask,
    getApp,
    getProject,
    setBreadCrumbMenu,
    getScanResultByTaskId,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Task);
