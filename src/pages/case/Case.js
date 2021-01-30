import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import './Case.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faDownload, faEllipsisH, faFileSignature, faPlay} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {Link} from "react-router-dom";
import {getCase} from "../../actions/CasesAction";
import {getScanTasks} from "../../actions/TasksAction";

class Case extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Case'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton onClick={this.gotoCreateScan.bind(this)}> <FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderCaseCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'扫描记录'} w={6}>
                    {/*<Container>*/}
                    {/*    <Row>*/}
                    {/*        {*/}
                    {/*            (this.props.project.applications && this.props.project.applications.length !== 0) ? this.props.project.applications.map((app, index) => {*/}
                    {/*                return this.renderAppRow(app, index);*/}
                    {/*            }) : <span style={{color: '#668'}}>无</span>*/}
                    {/*        }*/}
                    {/*    </Row>*/}
                    {/*</Container>*/}
                    <Container>
                        <Row>
                            <span style={{color: '#668'}}>无</span>
                        </Row>
                    </Container>
                </Card>
                <Card title={'扫描中的任务'} w={6}>
                    <Container>
                        <Row>
                            {this.props.tasks.map((task,index)=>{
                                return <span style={{color: '#668'}}>{task.id}</span>
                            })}
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
                caseId: this.props.match.params.caseId,
            }
        });
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
                            <Link to={'/project/' + this.props.project.id + '/' + app.id}><FontAwesomeIcon icon={faChevronRight}/></Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>;
    }

    renderCaseCard() {
        return <Card title={'用例信息'} w={4}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;{this.props.cas.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.scriptPath}&nbsp;&nbsp;<FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faDownload}/></h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getCase(this.props.match.params.caseId);
        this.props.getScanTasks({
            useCaseId: this.props.match.params.caseId
        });
        this.props.setBreadCrumbMenu([
            {
                title: 'Cases',
                clickable: true,
                route: '/cases'
            },
            {
                title: 'Case-' + this.props.match.params.caseId,
                clickable: false,
                route: ''
            }
        ]);
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
    cas: state.reduxResult.cas.data,
    deleteAppResult: state.reduxResult.deleteAppResult,
    tasks: state.reduxResult.tasks.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCase,
    getScanTasks,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Case);
