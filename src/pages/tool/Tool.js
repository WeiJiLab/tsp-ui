import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import './Tool.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faEllipsisH, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getTool} from "../../actions/ToolsAction";
import {deleteCase, getCasesByToolId} from "../../actions/CasesAction";
import {Link} from "react-router-dom";
import {getScanTasks} from "../../actions/TasksAction";

class Tool extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Tool'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton onClick={this.gotoCreateScan.bind(this)}><FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
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
                            {
                                (this.props.toolCases && this.props.toolCases.length !== 0) ? this.props.toolCases.map((cas, index) => {
                                    return this.renderCaseRow(cas, index);
                                }) : <span style={{color: '#668'}}>无</span>
                            }
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

    gotoCreateScan() {
        this.props.history.push({
            pathname: '/task/create',
            createInfo: {
                toolId: this.props.match.params.toolId,
            }
        });
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

    renderCaseRow(cas, index) {
        return <Container className={'AppItem'} key={index}>
            <Row style={{marginTop: '0.5em'}}>
                <Col md={1}>
                    <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '2em', marginTop: '0.5em'}} icon={faCube}/>
                </Col>
                <Col md={11}>
                    <Row>
                        <Col md={6}>
                            <h3>{cas.name}</h3>
                        </Col>
                        <Col md={6} style={{textAlign: 'right'}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="none" id="dropdown-basic">
                                    <FontAwesomeIcon
                                        icon={faEllipsisH}/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.deleteCase.bind(this, cas.id)}>删除</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <h6>{cas.description}</h6>
                        </Col>
                        <Col md={2} style={{textAlign: 'right'}}>
                            <Link to={'/case/' + cas.id}><FontAwesomeIcon icon={faChevronRight}/></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>;
    }

    componentDidMount() {
        this.props.getTool(this.props.match.params.toolId);
        this.props.getScanTasks({
            toolId: this.props.match.params.toolId
        });
        this.props.getCasesByToolId(this.props.match.params.toolId);

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

    deleteCase(caseId) {
        this.props.deleteCase(caseId);
    }

    gotoCreateCase() {
        this.props.history.push('/tool/case/' + this.props.match.params.toolId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteCaseResult !== this.props.deleteCaseResult) {
            this.props.getCasesByToolId(this.props.match.params.toolId);
        }
    }
}

const mapStateToProps = state => ({
    tool: state.reduxResult.tool.data,
    toolCases: state.reduxResult.toolCases.data,
    deleteCaseResult: state.reduxResult.deleteCaseResult,
    tasks: state.reduxResult.tasks.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBreadCrumbMenu,
    getTool,
    deleteCase,
    getScanTasks,
    getCasesByToolId
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tool);
