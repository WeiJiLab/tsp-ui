import './App.css';
import {Col, Container, Row,Image} from "react-bootstrap";
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
    },
    {
        title: '测试',
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
    },
    {
        title: '测试2',
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
        <Container className="App" style={{padding:0}}>
            <Container style={{margin: 0, padding: 0}}>
                <Row style={{margin: 0, padding: 0}}>
                    <Col md={2} style={{ margin: 0, padding: 0, paddingLeft: '3em', paddingTop: '1em', background: 'transparent' }}>
                        <Container>
                            <Image style={{width:'2em',height:'2em',display:'inline-block'}} src={'http://midone.left4code.com/dist/images/logo.svg'}/>
                            <p style={{color:'#fff',display:'inline-block',height:'2em',lineHeight:'2em',padding:0,margin:0,marginLeft:'1em'}}>SCP</p>
                        </Container>
                        <LeftMenu menu={menuData}/>
                    </Col>
                    <Col md={10} style={{margin: 0, padding: 0,paddingRight:'1em',paddingTop:'1em'}}>
                        <Container style={{margin: 0,padding:'1em',background:'#fff',borderRadius:'2em',}}>
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
