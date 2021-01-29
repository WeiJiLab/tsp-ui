import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Tool.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getApp, getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getTool} from "../../actions/ToolsAction";

class Tool extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Tool'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton><FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                    <PushButton style={{marginLeft: '1em'}} onClick={this.gotoCreateCase.bind(this)}> <FontAwesomeIcon
                        icon={faPlus}/> &nbsp;添加用例</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderToolCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'用例列表'} w={6}>
                    <Container>
                        <Row>
                            <span style={{color: '#668'}}>无</span>
                        </Row>
                    </Container>
                </Card>
                <Card title={'正在运行中的扫描任务'} w={6}>
                    <Container>
                        <Row>
                            <span style={{color: '#668'}}>无</span>
                        </Row>
                    </Container>
                </Card>
            </Row>
        </Container>
    }

    renderToolCard() {
        return <Card title={'工具信息'} w={6}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{this.props.tool.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <span style={{fontSize: '1.1em'}}>{this.props.tool.description}</span>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getTool(this.props.match.params.toolId);

        this.props.setBreadCrumbMenu([
            {
                title: 'Tools',
                clickable: true,
                route: '/tools'
            },
            {
                title: 'Tool-' + this.props.match.params.toolId,
                clickable: false,
                route: ''
            }
        ]);
    }

    gotoCreateCase(){
        this.props.history.push('/tool/case/' + this.props.match.params.toolId);
    }
}

const mapStateToProps = state => ({
    tool: state.reduxResult.tool.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBreadCrumbMenu,
    getTool
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tool);
