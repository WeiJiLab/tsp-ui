import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import './Project.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faEllipsisH, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {deleteApp, getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Projects'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton> <FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                    <PushButton style={{marginLeft: '1em'}} onClick={this.gotoCreateApp.bind(this)}> <FontAwesomeIcon
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
                            <span style={{color: '#668'}}>无</span>
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
                            <FontAwesomeIcon icon={faChevronRight}/>
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
    deleteAppResult: state.reduxResult.deleteAppResult,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProject,
    deleteApp,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Project);
