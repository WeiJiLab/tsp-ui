import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import LeftMenu from "./components/left-menu/LeftMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import ScanList from "./pages/scan-list/ScanList";
import DashBoard from "./pages/dashboard/DashBoard";
import {faBox, faBoxes, faCircle, faDotCircle, faHome, faShieldAlt} from "@fortawesome/free-solid-svg-icons";
import {Component} from "react";
import BreadCrumbMenu from "./components/breadcrumb-menu/BreadCrumbMenu";
import Charts from "./pages/charts/Charts";
import Apps from "./pages/apps/Apps";
import AppCreate from "./pages/app_create/AppCreate";
import Projects from "./pages/projects/Projects";
import ProjectCreate from "./pages/project_create/ProjectCreate";
import Tools from "./pages/tools/Tools";

const menuData = [
    {
        title: '主页',
        route: '',
        icon: faHome,
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
        icon: faBox,
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
        title: '应用',
        route: '',
        icon: faBoxes,
        routable: false,
        child: [
            {
                title: '应用列表',
                route: '/apps',
                icon: faCircle,
                routable: true,
            },
            {
                title: '创建应用',
                route: '/app/create',
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
            },
            {
                title: '合规扫描',
                route: '/ScanList',
                icon: faCircle,
                routable: true,
            }
        ]
    },
    {
        title: '图表',
        route: '',
        icon: faDotCircle,
        routable: false,
        child: [
            {
                title: '各种图表',
                route: '/charts',
                icon: faCircle,
                routable: true,
            }
        ]
    }
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: [
                {
                    title: 'Application',
                    clickable: false,
                    route: '/'
                },
                {
                    title: 'Application2',
                    clickable: true,
                    route: '/'
                }
            ]
        };
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
                                <BreadCrumbMenu data={this.state.breadcrumb}/>
                            </Container>
                            <Container
                                style={{
                                    margin: 0,
                                    padding: '1.5em',
                                    background: 'rgb(242, 245, 248)',
                                    borderBottomLeftRadius: '2em',
                                    borderBottomRightRadius: '2em'
                                }}>
                                <Switch>
                                    <Route exact path={'/'} component={DashBoard}/>
                                    <Route exact path={'/projects'} component={Projects}/>
                                    <Route exact path={'/project/create'} component={ProjectCreate}/>
                                    <Route exact path={'/apps'} component={Apps}/>
                                    <Route exact path={'/app/create'} component={AppCreate}/>
                                    <Route exact path={'/tools'} component={Tools}/>


                                    <Route exact path={'/ScanList'} component={ScanList}/>
                                    <Route exact path={'/charts'} component={Charts}/>
                                </Switch>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Container>
        );
    }
}

export default App;
