import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import LeftMenu from "./components/left-menu/LeftMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import ScanList from "./pages/scan-list/ScanList";
import ScanResult from "./pages/scan-result/ScanResult";
import DashBoard from "./pages/dashboard/DashBoard";
import {faCheckCircle, faCircle, faDotCircle, faHome} from "@fortawesome/free-solid-svg-icons";
import {Component} from "react";
import BreadCrumbMenu from "./components/breadcrumb-menu/BreadCrumbMenu";

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
        title: '合规',
        route: '',
        icon: faCheckCircle,
        routable: false,
        child: [
            {
                title: '合规列表',
                route: '/ScanList',
                icon: faCircle,
                routable: true,
            },
            {
                title: '检测结果',
                route: '/ScanResult',
                icon: faCircle,
                routable: true,
            }
        ]
    },
    {
        title: '组件',
        route: '',
        icon: faDotCircle,
        routable: false,
        child: [
            {
                title: '卡片',
                route: '/component/card',
                icon: faCircle,
                routable: true,
            },
            {
                title: '列表',
                route: '/component/list',
                icon: faCircle,
                routable: true,
            },
            {
                title: '表格',
                route: '/component/table',
                icon: faCircle,
                routable: true,
            }
        ]
    },
    {
        title: '表单',
        route: '',
        icon: faDotCircle,
        routable: false,
        child: [
            {
                title: '表单',
                route: '/form',
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
                                    paddingLeft:'0.5em',
                                    fontWeight: 'bolder',
                                    fontSize: '2em',
                                }}>Αιγίς</p><span style={{color: '#fff', fontSize: '0.7em'}}>&nbsp;v0.0.1</span>
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
                                    <Route exact path={'/ScanList'} component={ScanList}/>
                                    <Route exact path={'/ScanResult'} component={ScanResult}/>
                                    <Route exact path={'/component/card'} component={DashBoard}/>
                                    <Route exact path={'/component/list'} component={DashBoard}/>
                                    <Route exact path={'/component/table'} component={DashBoard}/>
                                    <Route exact path={'/form'} component={DashBoard}/>
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
