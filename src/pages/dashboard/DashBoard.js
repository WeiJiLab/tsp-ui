import React from "react";
import {Container, Row} from "react-bootstrap";
import './DashBoard.css'
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faCubes, faShieldVirus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getTools} from "../../actions/ToolsAction";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {Pie} from "@ant-design/charts";

class DashBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
        };
    }

    render() {
        let data = [];
        let toolsData = {};
        this.props.tools.map((tool, index) => {
            if (toolsData[tool.category] == null) {
                toolsData[tool.category] = {
                    type: tool.category,
                    value: 1,
                }
            } else {
                toolsData[tool.category].value++;
            }
        });
        for (let key in toolsData) {
            data.push(toolsData[key]);
        }

        let toolsConfig = {
            appendPadding: 20,
            data: data,
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
                <Card title={'安全工具'} w={3}>
                    <Pie style={{height:'12em'}} {...toolsConfig} />
                </Card>
                <Card title={'项目'} w={3}>
                    <Container>
                        <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCube}/>
                        <Link to={'/projects'}><h1
                            style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.projects.length}</h1></Link>
                    </Container>
                </Card>
                <Card title={'应用'} w={3}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCubes}/>
                    <Link to={'/projects'}><h1
                        style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>{this.props.apps.length}</h1></Link>
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                <Card title={'最近的扫描'} w={6}>
                    <span style={{color: '#aaa'}}>无</span>
                </Card>
                <Card title={'待扫描的任务'} w={6}>
                    <span style={{color: '#aaa'}}>无</span>
                </Card>
            </Row>
        </Container>
    }

    modalClose() {
        this.setState({
            modalShow: false,
        });
    }

    showModal() {
        this.setState({
            modalShow: true,
        });
    }

    componentDidMount() {
        this.props.getProjects();
        this.props.getTools();
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
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProjects,
    getTools,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
