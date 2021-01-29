import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Application.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCube, faPlay} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getApp, getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Application'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton> <FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderAppCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'扫描记录'} w={6}>
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

    renderAppCard() {
        return <Card title={'应用信息'} w={3}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{this.props.app.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <span style={{fontSize:'1.1em'}}>{this.props.app.description}</span>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.projectId);
        this.props.getApp(this.props.match.params.projectId, this.props.match.params.appId);

        this.props.setBreadCrumbMenu([
            {
                title: 'Projects',
                clickable: true,
                route: '/projects'
            },
            {
                title: 'Project-' + this.props.match.params.projectId,
                clickable: true,
                route: '/project/' + this.props.match.params.projectId
            },
            {
                title: 'Application-' + this.props.match.params.appId,
                clickable: false,
                route: ''
            }
        ]);
    }
}

const mapStateToProps = state => ({
    project: state.reduxResult.project.data,
    app: state.reduxResult.app.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProject,
    getApp,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Application);
