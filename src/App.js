import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import LeftMenu from "./components/left-menu/LeftMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import DashBoard from "./pages/dashboard/DashBoard";
import {faCircle, faCubes, faFileSignature, faShieldAlt, faTachometerAlt} from "@fortawesome/free-solid-svg-icons";
import {Component} from "react";
import BreadCrumbMenu from "./components/breadcrumb-menu/BreadCrumbMenu";
import Charts from "./pages/charts/Charts";
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

const menuData = [
    {
        title: '主页',
        route: '',
        icon: faTachometerAlt,
        routable: false,
        child: [
            {
                title: 'Dashboard',
                route: '/',
                icon: faCircle,
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
                icon: faCircle,
                routable: true,
            },
            {
                title: '创建项目',
                route: '/project/create',
                icon: faCircle,
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
                title: '总览',
                route: '/tools',
                icon: faCircle,
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
            {
                title: '创建用例组',
                route: '/case-groups/create',
                icon: faCircle,
                routable: true,
            },
            {
                title: '用例组',
                route: '/case-groups',
                icon: faCircle,
                routable: true,
            },
            {
                title: '用例',
                route: '/cases',
                icon: faCircle,
                routable: true,
            },
        ]
    },
    // {
    //     title: '图表',
    //     route: '',
    //     icon: faChartArea,
    //     routable: false,
    //     child: [
    //         {
    //             title: '各种图表',
    //             route: '/charts',
    //             icon: faCircle,
    //             routable: true,
    //         }
    //     ]
    // }
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
    }

    render() {
        return (
            <Container className="App" style={{padding: 0}}>
                <Container style={{margin: 0, padding: 0}}>
                    <Row style={{margin: 0, padding: 0}}>
                        <Col md={2} style={{margin: 0, padding: 0, paddingLeft: '2em', paddingTop: '1em', background: 'transparent'}}>
                            <Container style={{padding: 0, margin: 0, borderBottom: 'solid 1px rgb(55,83,182)', height: '4em'}}>
                                <p style={{
                                    color: '#fff',
                                    display: 'inline-block',
                                    height: '4em',
                                    lineHeight: '1.5em',
                                    padding: 0,
                                    margin: 0,
                                    paddingLeft: '0.5em',
                                    fontWeight: 'bolder',
                                    fontSize: '2em',
                                }}>Aιγίς</p><span style={{color: '#fff', fontSize: '0.7em'}}>&nbsp;v0.0.1</span>
                            </Container>
                            <LeftMenu menu={menuData}/>
                        </Col>
                        <Col md={10} style={{margin: 0, padding: 0, paddingRight: '2em', paddingTop: '1em', paddingBottom: '1em'}}>
                            <Container style={{
                                margin: 0,
                                padding: '1.5em',
                                height: '4em',
                                borderBottom: 'solid 1px #dedede',
                                background: 'rgb(242, 245, 248)',
                                borderTopLeftRadius: '2em',
                                borderTopRightRadius: '2em',
                            }}>
                                <BreadCrumbMenu data={this.props.breadCrumbMenus}/>
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

                                    <Route exact path={'/charts'} component={Charts}/>
                                </AnimatedSwitch>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
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
