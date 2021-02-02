import React from "react";
import {Container, Row} from "react-bootstrap";
import './DashBoard.css'
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faCubes, faFileArchive, faHistory} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getTools} from "../../actions/ToolsAction";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {Pie} from "@ant-design/charts";
import {getScanResults, getScanTasks} from "../../actions/TasksAction";
import {getCases} from "../../actions/CasesAction";
import ScanTaskList from "../../components/task-list/ScanTaskList";

class DashBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    getToolName(id) {
        for (let i = 0; i < this.props.tools.length; i++) {
            if (this.props.tools[i].id === id) {
                return this.props.tools[i].name;
            }
        }
    }

    render() {
        let toolsData = [];
        let data = {};
        this.props.tools.map((tool, index) => {
            if (data[tool.category] == null) {
                data[tool.category] = {
                    type: tool.category,
                    value: 1,
                }
            } else {
                data[tool.category].value++;
            }
        });
        for (let key in data) {
            toolsData.push(data[key]);
        }

        let toolsConfig = {
            appendPadding: 20,
            data: toolsData,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.618,
            meta: {
                value: {
                    formatter: function formatter(v) {
                        return ''.concat(v);
                    },
                },
            },
            label: {
                type: 'inner',
                offset: '-50%',
                style: {textAlign: 'center'},
                autoRotate: false,
                content: '{value}',
            },
            interactions: [
                {type: 'element-selected'},
                {type: 'element-active'},
                {type: 'pie-statistic-active'},
            ],
        };

        let casesData = [];
        data = [];
        this.props.cases.map((cas, index) => {
            if (data[this.getToolName(cas.securityToolId)] == null) {
                data[this.getToolName(cas.securityToolId)] = {
                    type: this.getToolName(cas.securityToolId),
                    value: 1,
                }
            } else {
                data[this.getToolName(cas.securityToolId)].value++;
            }
        });
        for (let key in data) {
            casesData.push(data[key]);
        }

        let casesConfig = {
            appendPadding: 20,
            data: casesData,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.618,
            meta: {
                value: {
                    formatter: function formatter(v) {
                        return ''.concat(v);
                    },
                },
            },
            label: {
                type: 'inner',
                offset: '-50%',
                style: {textAlign: 'center'},
                autoRotate: false,
                content: '{value}',
            },
            interactions: [
                {type: 'element-selected'},
                {type: 'element-active'},
                {type: 'pie-statistic-active'},
            ],
        };
        return <Container className={'DashBoard'}>
            <Row style={{padding: 0, margin: 0}}>
                <Card title={'项目'} w={2}>
                    <Container>
                        <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCube}/>
                        <Link to={'/projects'}><h1
                            style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.projects.length}</h1></Link>
                    </Container>
                </Card>
                <Card title={'应用'} w={2}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCubes}/>
                    <Link to={'/projects'}><h1
                        style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.apps.length}</h1></Link>
                </Card>
                <Card title={'扫描记录'} w={2}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faHistory}/>
                    <Link to={'/dashboard'}><h1
                        style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.tasks.length}</h1></Link>
                </Card>
                <Card title={'扫描结果'} w={2}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faFileArchive}/>
                    <Link to={'/dashboard'}><h1
                        style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.scanResults.length}</h1></Link>
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0}}>
                <Card title={'安全工具'} w={3}>
                    <Pie style={{height: '12em'}} {...toolsConfig} />
                </Card>
                <Card title={'用例'} w={5}>
                    <Pie style={{height: '12em'}} {...casesConfig} />
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                <Card title={'最近的扫描'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.props.tasks.length !== 0) ? this.tasksFilterNotReady().map((task, index) => {
                                    return <ScanTaskList task={task} key={index}/>;
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
                <Card title={'待扫描的任务'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.tasks && this.tasksFilterByStatus('READY').length !== 0) ? this.tasksFilterByStatus('READY').map((task, index) => {
                                    return <ScanTaskList task={task} key={index}/>;
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
            </Row>
        </Container>
    }

    tasksFilterNotReady(){
        let data = [];
        for (let i = 0; i < this.props.tasks.length; i++) {
            if (this.props.tasks[i].status !== 'READY') {
                data.push(this.props.tasks[i]);
            }
        }
        return data;
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

    componentDidMount() {
        this.props.getProjects();
        this.props.getTools();
        this.props.getCases();

        this.props.getScanTasks({});
        this.props.getScanResults(1);

        this.props.setBreadCrumbMenu([
            {
                title: 'Home',
                clickable: true,
                route: '/'
            },
            {
                title: 'Dashboard',
                clickable: false,
                route: ''
            }
        ]);
    }
}


const mapStateToProps = state => ({
    projects: state.reduxResult.projects.data,
    apps: state.reduxResult.apps,
    tools: state.reduxResult.tools.data,
    cases: state.reduxResult.cases.data,
    tasks: state.reduxResult.tasks.data,
    scanResults: state.reduxResult.scanResults.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProjects,
    getTools,
    getCases,
    getScanTasks,
    getScanResults,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
