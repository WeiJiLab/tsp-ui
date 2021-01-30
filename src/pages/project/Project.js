import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import './Project.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faChevronRight,
    faCube,
    faCubes, faEject,
    faEllipsisH,
    faFileSignature,
    faPlayCircle,
    faPlus,
    faShieldAlt,
    faSpinner, faStopCircle, faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {deleteApp, getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {Link} from "react-router-dom";
import {getScanTasks} from "../../actions/TasksAction";

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Projects'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton onClick={this.gotoCreateApp.bind(this)}> <FontAwesomeIcon
                        icon={faPlus}/> &nbsp;创建应用</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderProjectCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'应用'} w={6}>
                    <Container>
                        <Row>
                            {
                                (this.props.project.applications && this.props.project.applications.length !== 0) ? this.props.project.applications.map((app, index) => {
                                    return this.renderAppRow(app, index);
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
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
            </Row>
        </Container>
    }


    renderAppRow(app, index) {
        return <Container className={'AppItem'} key={index}>
            <Row style={{marginTop: '0.5em'}}>
                <Col md={1}>
                    <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em', marginTop: '0.5em'}} icon={faCube}/>
                </Col>
                <Col md={11}>
                    <Row>
                        <Col md={6}>
                            <h3>{app.name}</h3>
                        </Col>
                        <Col md={6} style={{textAlign: 'right'}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    <FontAwesomeIcon
                                        icon={faEllipsisH}/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.deleteApp.bind(this, app.id)}>删除</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <h6>{app.description}</h6>
                        </Col>
                        <Col md={2} style={{textAlign: 'right'}}>
                            <Link to={'/project/' + this.props.project.id + '/' + app.id}><FontAwesomeIcon icon={faChevronRight}/></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>;
    }

    renderProjectCard() {
        return <Card title={'项目信息'} w={3}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{this.props.project.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.project.description}</h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.id);
        this.props.getScanTasks({
            projectId: this.props.match.params.id
        });
        this.props.setBreadCrumbMenu([
            {
                title: 'Projects',
                clickable: true,
                route: '/projects'
            },
            {
                title: 'Project-' + this.props.match.params.id,
                clickable: false,
                route: ''
            }
        ]);
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


    gotoCreateApp() {
        this.props.history.push('/app/create/' + this.props.match.params.id);
    }

    deleteApp(appId) {
        this.props.deleteApp(this.props.match.params.id, appId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteAppResult !== this.props.deleteAppResult) {
            this.props.getProject(this.props.match.params.id);
        }
    }
}

const mapStateToProps = state => ({
    project: state.reduxResult.project.data,
    tasks: state.reduxResult.tasks.data,
    deleteAppResult: state.reduxResult.deleteAppResult,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProject,
    deleteApp,
    getScanTasks,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Project);
