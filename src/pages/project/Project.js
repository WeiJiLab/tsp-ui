import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Project.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PushButton from "../../components/button/PushButton";

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'Projects'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <PushButton>xxx</PushButton>
                </Col>
            </Row>
            <Row style={{padding: 0, margin: 0}}>
                {/*{this.renderApplicationCard()}*/}
            </Row>
        </Container>
    }


    renderApplicationCard(app, index) {
        return <Card w={3} key={index}>
            <Container>
                <Row>
                    <Col md={8}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{app.name}</h3>
                    </Col>
                    <Col md={4} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{app.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <Link to={{
                            route: 'app',
                            id: app.id
                        }}> <FontAwesomeIcon icon={faChevronRight}/></Link>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.getProjects();
    }
}

const mapStateToProps = state => ({
    projects: state.reduxResult.projects.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Project);
