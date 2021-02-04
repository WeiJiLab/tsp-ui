import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Case.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faEdit, faFileSignature, faPlay, faShieldAlt} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getCase} from "../../actions/CasesAction";
import {getScanTasks} from "../../actions/TasksAction";
import {getTool} from "../../actions/ToolsAction";
import ScanTaskList from "../../components/task-list/ScanTaskList";
import {Link} from "react-router-dom";
import {AWS_S3_BUCKET} from "../../api/ScpApi";

class Case extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Case'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton onClick={this.gotoCreateScan.bind(this)}> <FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderCaseCard()}
                {this.renderToolCard()}

            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'扫描记录'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.props.tasks.length !== 0) ? this.props.tasks.map((task, index) => {
                                    return <ScanTaskList task={task} key={index}/>;
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
                <Card title={'扫描中的任务'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.tasksFilterByStatus('RUNNING').length !== 0) ? this.props.tasks.map((task, index) => {
                                    return <ScanTaskList task={task} key={index}/>;
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
                caseId: this.props.match.params.caseId,
            }
        });
    }

    renderCaseCard() {
        return <Card title={'用例信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3>
                            <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;{this.props.cas.name}
                            <Link to={'/case-editor/' + this.props.cas.id}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', float: 'right'}}
                                                                                            icon={faEdit}/></Link>
                        </h3>
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


    componentDidMount() {
        this.props.getCase(this.props.match.params.caseId);
        this.props.getScanTasks({
            useCaseId: this.props.match.params.caseId,
        });
        this.props.setBreadCrumbMenu([
            {
                title: 'Cases',
                clickable: true,
                route: '/cases'
            },
            {
                title: 'Case-' + this.props.match.params.caseId,
                clickable: false,
                route: ''
            }
        ]);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    deleteApp(appId) {
        this.props.deleteApp(this.props.match.params.id, appId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteAppResult !== this.props.deleteAppResult) {
            this.props.getProject(this.props.match.params.id);

        }
        if (nextProps.cas !== this.props.cas) {
            this.props.getTool(nextProps.cas.securityToolId);
        }

    }
}

const mapStateToProps = state => ({
    cas: state.reduxResult.cas.data,
    deleteAppResult: state.reduxResult.deleteAppResult,
    tasks: state.reduxResult.tasks.data,
    tool: state.reduxResult.tool.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCase,
    getTool,
    getScanTasks,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Case);
