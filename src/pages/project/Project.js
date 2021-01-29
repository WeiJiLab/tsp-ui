import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Project.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faCubes, faEllipsisH, faPlay} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import PushButton from "../../components/button/PushButton";

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Projects'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton> <FontAwesomeIcon icon={faPlay}/> &nbsp;创建扫描任务</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                {this.renderProjectCard()}
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                <Card title={'应用'} w={6}>
                    <Container>
                        <Row>
                            {
                                this.props.project.applications ? this.props.project.applications.map((app, index) => {
                                    return this.renderAppRow(app, index);
                                }) : <span style={{color: '#668'}}>无</span>
                            }
                        </Row>
                    </Container>
                </Card>
                <Card title={'扫描记录'} w={6}>
                    <Container>
                        <Row>
                            <span style={{color: '#668'}}>无</span>
                        </Row>
                    </Container>
                </Card>
            </Row>
        </Container>
    }

    renderAppRow(app, index) {
        return <Container key={index}>
            <Row style={{marginTop: '0.5em'}}>
                <Col md={2}>
                    <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '3em'}} icon={faCube}/>
                </Col>
                <Col md={10}>
                    <Row>
                        <Col md={6}>
                            <h3>{app.name}</h3>
                        </Col>
                        <Col md={6} style={{textAlign: 'right'}}>
                            <FontAwesomeIcon
                                icon={faEllipsisH}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <h6>{app.description}</h6>
                        </Col>
                        <Col md={2} style={{textAlign: 'right'}}>
                            <FontAwesomeIcon icon={faChevronRight}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>;
    }


    renderProjectCard() {
        return <Card title={'应用信息'} w={3}>
            <Container>
                <Row>
                    <Col md={8}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCubes}/>&nbsp;{this.props.project.name}</h3>
                    </Col>
                    <Col md={4} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.project.description}</h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.id);
    }
}

const mapStateToProps = state => ({
    project: state.reduxResult.project.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Project);
