import './App.css';
import Header from "./components/header/Header";
import {Col, Container, Row} from "react-bootstrap";
import LeftMenu from "./components/left-menu/LeftMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch} from "react-router-dom";
import ScanList from "./pages/scan-list/ScanList";
import ScanResult from "./pages/scan-result/ScanResult";
import DashBoard from "./pages/dashboard/DashBoard";

const menuData = [
    {
        title: '主页',
        route: '',
        routable: false,
        child: [
            {
                title: 'Dashboard',
                route: '/',
                routable: true,
            }
        ]
    },
    {
        title: '合规',
        route: '',
        routable: false,
        child: [
            {
                title: '合规列表',
                route: '/ScanList',
                routable: true,
            },
            {
                title: '检测结果',
                route: '/ScanResult',
                routable: true,
            }
        ]
    }
];

function App() {
    return (
        <Container className="App">
            <Header/>
            <Container style={{margin: 0, padding: 0}}>
                <Row style={{margin: 0, padding: 0}}>
                    <Col md={3} style={{margin: 0, padding: 0}}>
                        <LeftMenu menu={menuData}/>
                    </Col>
                    <Col md={9} style={{margin: 0, padding: 0}}>
                        <Container style={{margin: 0, padding: 0}}>
                            <Switch>
                                <Route exact path={'/'} component={DashBoard}/>
                                <Route exact path={'/ScanList'} component={ScanList}/>
                                <Route exact path={'/ScanResult'} component={ScanResult}/>
                            </Switch>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default App;
