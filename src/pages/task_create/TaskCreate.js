import React from "react";
import {Container, FormControl, FormLabel, Row} from "react-bootstrap";
import './TaskCreate.css';
import PushButton from "../../components/button/PushButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ModalWrapper from "../../components/modal/ModalWrapper";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {startTask} from "../../actions/TasksAction";
import {getApp, getProject, getProjects} from "../../actions/ProjectsAction";
import {getCase, getCasesByToolId} from "../../actions/CasesAction";
import {getTool, getTools} from "../../actions/ToolsAction";

class TaskCreate extends React.Component {

    constructor(props) {
        super(props);
        this.createTaskRequest = {
            appId: -1,
            useCaseIds: [],
        };

        this.state = {
            btnCreate: {
                disabled: false,
                text: '启动扫描'
            },
            modalShow: false,
            selectedProject: {
                applications: []
            }
        };
    }

    render() {
        return <Container className={'TaskCreate'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'创建扫描任务'} md={6}>
                    {this.renderApp()}
                    {this.renderCase()}
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)}
                                      title={'提示'}>{this.state.modalText}</ModalWrapper>
                        <PushButton disabled={this.state.btnCreate.disabled} onClick={this.createTask.bind(this)}> <FontAwesomeIcon
                            icon={faCheck}/> &nbsp;{this.state.btnCreate.text}
                        </PushButton>
                    </Row>
                </Card>
            </Row>
        </Container>
    }

    renderCase() {
        if (this.props.location.createInfo.caseId) {
            return <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例</FormLabel>
                <FormControl disabled={true} placeHolder={this.props.cas.name}/>
            </Row>;
        } else {
            if (this.props.location.createInfo.toolId) {
                return <Container style={{padding: 0, margin: 0, marginTop: '2em'}}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>安全工具</FormLabel>
                        <FormControl disabled={true} placeHolder={this.props.tool.name}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例</FormLabel>
                        <FormControl onChange={this.selectCase.bind(this)} as="select">
                            {this.props.toolCases.length !== 0 ? <option>请选择</option> : null}
                            {this.props.toolCases.length !== 0 ? this.props.toolCases.map((ca, index) => {
                                return <option>{ca.name}</option>
                            }) : <option>无</option>}
                        </FormControl>
                    </Row>
                </Container>;
            } else {
                return <Container style={{padding: 0, margin: 0, marginTop: '2em'}}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>安全工具</FormLabel>
                        <FormControl onChange={this.selectTool.bind(this)} as="select">
                            {this.props.tools.length !== 0 ? <option>请选择</option> : null}
                            {this.props.tools.length !== 0 ? this.props.tools.map((too, index) => {
                                return <option>{too.name}</option>
                            }) : <option>无</option>}
                        </FormControl>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例</FormLabel>
                        <FormControl onChange={this.selectCase.bind(this)} as="select">
                            {this.props.toolCases.length !== 0 ? <option>请选择</option> : null}
                            {this.props.toolCases.length !== 0 ? this.props.toolCases.map((ca, index) => {
                                return <option>{ca.name}</option>
                            }) : <option>无</option>}
                        </FormControl>
                    </Row>
                </Container>;
            }
        }
    }

    selectTool(event) {
        if(event.target.value!=='请选择') {
            for (let i = 0; i < this.props.tools.length; i++) {
                if (this.props.tools[i].name === event.target.value) {
                    this.props.getCasesByToolId(this.props.tools[i].id);
                }
            }
        }
    }

    selectCase(event) {
        if(event.target.value!=='请选择') {
            let caseList = [];
            for (let i = 0; i < this.props.toolCases.length; i++) {
                if (this.props.toolCases[i].name === event.target.value) {
                    caseList.push(this.props.toolCases[i].id);
                    this.createTaskRequest.useCaseIds = caseList;
                }
            }
        }
    }

    renderApp() {
        if (this.props.location.createInfo.appId && this.props.location.createInfo.projectId) {
            return <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <FormLabel style={{color: 'rgb(36, 66, 84)'}}>应用</FormLabel>
                <FormControl disabled={true} placeHolder={this.props.project.name + ' / ' + this.props.app.name}/>
            </Row>;
        } else {
            return <Container style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                    <FormLabel style={{color: 'rgb(36, 66, 84)'}}>项目</FormLabel>
                    <FormControl onChange={this.selectProject.bind(this)} as="select">
                        {this.props.projects.length !== 0 ? <option>请选择</option> : null}
                        {this.props.projects.length !== 0 ? this.props.projects.map((po, index) => {
                            return <option>{po.name}</option>
                        }) : <option>无</option>}
                    </FormControl>
                </Row>
                <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                    <FormLabel style={{color: 'rgb(36, 66, 84)'}}>应用</FormLabel>
                    <FormControl onChange={this.selectApp.bind(this)} as="select">
                        {this.props.selectedProject.applications.length !== 0 ? <option>请选择</option> : null}
                        {this.state.selectedProject.applications.length !== 0 ? this.state.selectedProject.applications.map((ap, index) => {
                            return <option>{ap.name}</option>
                        }) : <option>无</option>}
                    </FormControl>
                </Row>
            </Container>;
        }
    }

    selectProject(event) {
        if(event.target.value!=='请选择') {
            for (let i = 0; i < this.props.projects.length; i++) {
                if (this.props.projects[i].name === event.target.value) {
                    this.setState({
                        selectedProject: this.props.projects[i]
                    });
                }
            }
        }
    }

    selectApp(event) {
        if(event.target.value!=='请选择') {
            for (let i = 0; i < this.state.selectedProject.applications.length; i++) {
                if (this.state.selectedProject.applications[i].name === event.target.value) {
                    this.createTaskRequest.appId = this.state.selectedProject.applications[i].id;
                }
            }
        }
    }

    modalClose() {
        this.setState({
            modalShow: false,
        });
    }

    showModal(text) {
        this.setState({
            modalShow: true,
            modalText: text,
        });
    }

    createTask() {
        if (this.createTaskRequest.appId === -1 || this.createTaskRequest.useCaseIds.length === 0) {
            this.showModal('信息填写不完整');
        } else {
            this.setState({
                btnCreate: {
                    disabled: true,
                    text: '启动中...'
                }
            });
            this.props.startTask(this.createTaskRequest);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.taskStartResult !== this.props.taskStartResult) {
            this.setState({
                btnCreate: {
                    disabled: false,
                    text: '启动扫描'
                }
            });
            if (!nextProps.taskStartResult.status) {
                this.showModal(nextProps.taskStartResult.message);
            } else {
                if (this.props.location.createInfo.caseId) {
                    this.props.history.push('/case/' + this.props.location.createInfo.caseId);
                } else if (this.props.location.createInfo.appId && this.props.location.createInfo.projectId) {
                    this.props.history.push('/project/' + this.props.location.createInfo.projectId + '/' + this.props.location.createInfo.appId);
                } else if (this.props.location.createInfo.toolId) {
                    this.props.history.push('/tool/' + this.props.location.createInfo.toolId);
                }
            }
        }
    }

    componentDidMount() {
        if (this.props.location.createInfo.caseId) {
            this.props.setBreadCrumbMenu([
                {
                    title: 'Cases',
                    clickable: true,
                    route: '/cases',
                },
                {
                    title: 'Case-' + this.props.location.createInfo.caseId,
                    clickable: true,
                    route: '/case/' + this.props.location.createInfo.caseId,
                }, {
                    title: 'CreateTask',
                    clickable: false,
                    route: '',
                },
            ]);
            this.createTaskRequest.useCaseIds.push(this.props.location.createInfo.caseId);
            this.props.getCase(this.props.location.createInfo.caseId);
            this.props.getProjects();
        } else if (this.props.location.createInfo.appId && this.props.location.createInfo.projectId) {
            this.props.setBreadCrumbMenu([
                {
                    title: 'Projects',
                    clickable: true,
                    route: '/projects'
                },
                {
                    title: 'Project-' + this.props.location.createInfo.projectId,
                    clickable: true,
                    route: '/project/' + this.props.location.createInfo.projectId,
                }, {
                    title: 'App-' + this.props.location.createInfo.appId,
                    clickable: true,
                    route: '/project/' + this.props.location.createInfo.projectId + '/' + this.props.location.createInfo.appId
                }, {
                    title: 'CreateTask',
                    clickable: false,
                    route: ''
                },
            ]);
            this.createTaskRequest.appId = this.props.location.createInfo.appId;
            this.props.getProject(this.props.location.createInfo.projectId);
            this.props.getApp(this.props.location.createInfo.projectId, this.props.location.createInfo.appId);
            this.props.getTools();
        } else {
            this.props.setBreadCrumbMenu([
                {
                    title: 'Tools',
                    clickable: true,
                    route: '/tools',
                },
                {
                    title: 'Tool-' + this.props.location.createInfo.toolId,
                    clickable: true,
                    route: '/tool/' + this.props.location.createInfo.toolId,
                }, {
                    title: 'CreateTask',
                    clickable: false,
                    route: '',
                },
            ]);
            this.props.getTool(this.props.location.createInfo.toolId);
            this.props.getCasesByToolId(this.props.location.createInfo.toolId);
            this.props.getProject(this.props.location.createInfo.projectId);
        }
    }
}


const mapStateToProps = state => ({
    taskStartResult: state.reduxResult.taskStartResult,
    app: state.reduxResult.app.data,
    project: state.reduxResult.project.data,
    projects: state.reduxResult.projects.data,
    tools: state.reduxResult.tools.data,
    tool: state.reduxResult.tool.data,
    toolCases: state.reduxResult.toolCases.data,
    cas: state.reduxResult.cas.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    startTask,
    getApp,
    getProject,
    getCase,
    getTools,
    getTool,
    getCasesByToolId,
    getProjects,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskCreate);
