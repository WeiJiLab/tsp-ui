import './App.css';
import {Col, Container, Image, Row} from "react-bootstrap";
import LeftMenu from "./components/left-menu/LeftMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";
import {
    faBars, faBell, faCubes, faFileImport,
    faFileSignature,
    faHome,
    faListAlt,
    faShieldAlt,
    faTachometerAlt,
    faUserShield
} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from "react";
import BreadCrumbMenu from "./components/breadcrumb-menu/BreadCrumbMenu";
import AppCreate from "./pages/app_create/AppCreate";
import Projects from "./pages/projects/Projects";
import ProjectCreate from "./pages/project_create/ProjectCreate";
import Tools from "./pages/tools/Tools";
import Project from "./pages/project/Project";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setBreadCrumbMenu} from "./actions/BreadCrumbMenuAction";
import Application from "./pages/app/Application";
import Tool from "./pages/tool/Tool";
import CaseCreate from "./pages/case_create/CaseCreate";
import Cases from "./pages/cases/Cases";
import CaseGroups from "./pages/case_groups/CaseGroups";
import CaseGroupCreate from "./pages/case_group_create/CaseGroupCreate";
import Case from "./pages/case/Case";
import TaskCreate from "./pages/task_create/TaskCreate";
import Task from "./pages/task/Task";
import NoMatch from "./pages/no-match/NoMatch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const menuData = [
    {
        title: '主页',
        route: '',
        icon: faHome,
        routable: false,
        child: [
            {
                title: '平台总览',
                route: '/',
                icon: faTachometerAlt,
                routable: true,
            }
        ]
    },
    {
        title: '项目',
        route: '',
        icon: faCubes,
        routable: false,
        child: [
            {
                title: '项目列表',
                route: '/projects',
                icon: faListAlt,
                routable: true,
            },
            {
                title: '创建项目',
                route: '/project/create',
                icon: faFileImport,
                routable: true,
            }
        ]
    },
    {
        title: '安全工具',
        route: '',
        icon: faShieldAlt,
        routable: false,
        child: [
            {
                title: '工具列表',
                route: '/tools',
                icon: faListAlt,
                routable: true,
            }
        ]
    },
    {
        title: '安全用例',
        route: '',
        icon: faFileSignature,
        routable: false,
        child: [
            // {
            //     title: '创建用例组',
            //     route: '/case-groups/create',
            //     icon: faCircle,
            //     routable: true,
            // },
            // {
            //     title: '用例组',
            //     route: '/case-groups',
            //     icon: faCircle,
            //     routable: true,
            // },
            {
                title: '用例列表',
                route: '/cases',
                icon: faListAlt,
                routable: true,
            },
        ]
    },
];

const AnimatedSwitch = props => {
    const {children} = props
    return (
        <Route
            render={({location}) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames={props.type || 'fade'}
                        timeout={props.duration || 300}>
                        <Switch location={location}>{children}</Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    )
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuMode: 'full'
        };
    }

    render() {
        return (
            <Container className="App" style={{padding: 0}}>
                <Container style={{margin: 0, padding: 0}}>
                    <Row style={{margin: 0, padding: 0}}>
                        <Col md={this.state.menuMode === 'full' ? 2 : 1}
                             style={{margin: 0, padding: 0, paddingLeft: '2em', paddingTop: '2em', background: 'transparent'}}>
                            <Container style={{padding: 0, margin: 0, height: '4em'}}>
                                <p style={{
                                    color: '#fff',
                                    display: 'inline-block',
                                    height: '4em',
                                    lineHeight: '1.5em',
                                    padding: 0,
                                    margin: 0,
                                    paddingLeft: '0.2em',
                                    fontWeight: 'bolder',
                                    fontSize: '2em',
                                }}>
                                    <FontAwesomeIcon style={{fontSize: '2em'}} icon={faUserShield}/>
                                    {this.state.menuMode === 'full' ? 'Aιγίς' : ''}
                                </p>
                                {this.state.menuMode === 'full' ? <span style={{color: '#fff', fontSize: '0.7em'}}>&nbsp;V0.1.2</span> : null}
                            </Container>
                            <Container style={{padding: 0, paddingLeft: '1em'}}>
                                <span onClick={this.changeMenu.bind(this)} style={{color: '#fff'}}><FontAwesomeIcon
                                    icon={faBars}/>&nbsp;{this.state.menuMode === 'full' ? '收起菜单' : '展开'} </span>
                            </Container>
                            <LeftMenu mode={this.state.menuMode} menu={menuData}/>
                        </Col>

                        <Col md={this.state.menuMode === 'full' ? 10 : 11}
                             style={{margin: 0, padding: 0, paddingRight: '2em', paddingTop: '1em', paddingBottom: '1em'}}>
                            <Container style={{
                                margin: 0,
                                padding: '1.5em',
                                height: '4em',
                                borderBottom: 'solid 1px #dedede',
                                background: 'rgb(242, 245, 248)',
                                borderTopLeftRadius: '2em',
                                borderTopRightRadius: '2em',
                            }}>
                                <Row style={{padding: 0, margin: 0}}>
                                    <Col md={8} style={{padding: 0, margin: 0}}>
                                        <BreadCrumbMenu data={this.props.breadCrumbMenus}/>
                                    </Col>
                                    <Col md={4} style={{padding: 0, margin: 0}}>
                                        <Image className={'Icon'} src={'http://midone.left4code.com/dist/images/profile-12.jpg'}/>
                                    </Col>
                                </Row>
                            </Container>
                            <Container
                                style={{
                                    margin: 0,
                                    padding: '1.5em',
                                    background: 'rgb(242, 245, 248)',
                                    borderBottomLeftRadius: '2em',
                                    borderBottomRightRadius: '2em'
                                }}>
                                <AnimatedSwitch>
                                    <Route exact path={'/'} component={DashBoard}/>
                                    <Route exact path={'/dashboard'} component={DashBoard}/>
                                    <Route exact path={'/projects'} component={Projects}/>
                                    <Route exact path={'/project/create'} component={ProjectCreate}/>
                                    <Route exact path={'/project/:id'} component={Project}/>
                                    <Route exact path={'/project/:projectId/:appId'} component={Application}/>
                                    <Route exact path={'/app/create/:projectId'} component={AppCreate}/>
                                    <Route exact path={'/tools'} component={Tools}/>
                                    <Route exact path={'/tool/:toolId'} component={Tool}/>
                                    <Route exact path={'/tool/case/:toolId'} component={CaseCreate}/>
                                    <Route exact path={'/cases'} component={Cases}/>
                                    <Route exact path={'/case/:caseId'} component={Case}/>
                                    <Route exact path={'/case-groups'} component={CaseGroups}/>
                                    <Route exact path={'/case-groups/create'} component={CaseGroupCreate}/>

                                    <Route exact path={'/task/create'} component={TaskCreate}/>
                                    <Route exact path={'/task/:taskId'} component={Task}/>
                                    <Route path="*" component={NoMatch}/>
                                </AnimatedSwitch>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }

    changeMenu() {
        if (this.state.menuMode === 'full') {
            this.setState({
                menuMode: 'tiny'
            });
        } else {
            this.setState({
                menuMode: 'full'
            });
        }
    }

    componentDidMount() {
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
    breadCrumbMenus: state.reduxResult.breadCrumbMenus.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBreadCrumbMenu,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
