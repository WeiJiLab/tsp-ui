import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Projects.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faCubes, faEllipsisH, faTh, faThList} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: 'grid'
        };
    }

    changeToList() {
        this.setState({
            layout: 'list'
        });
    }

    changeToGrid() {
        this.setState({
            layout: 'grid'
        });
    }

    render() {
        return <Container className={'Projects'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={12}>
                    <FontAwesomeIcon style={{color: this.state.layout === 'list' ? 'rgb(36, 66, 164)' : '#99a', fontSize: '1.5em'}}
                                     onClick={this.changeToList.bind(this)} icon={faThList}/>
                    <FontAwesomeIcon
                        style={{color: this.state.layout === 'grid' ? 'rgb(36, 66, 164)' : '#99a', marginLeft: '0.5em', fontSize: '1.5em'}}
                        onClick={this.changeToGrid.bind(this)} icon={faTh}/>
                </Col>
            </Row>
            {
                this.state.layout === 'list' ?
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        {this.props.projects.map((project, index) => {
                            return this.renderProjectRow(project, index);
                        })}
                    </Row>
                    :
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        {this.props.projects.map((project, index) => {
                            return this.renderProjectCard(project, index);
                        })}
                    </Row>
            }
        </Container>
    }

    renderProjectRow(project, index) {
        return <Card w={12} key={index}>
            <Container>
                <Row style={{marginTop: '0.5em'}}>
                    <Col md={1}>
                        <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '3em'}} icon={faCube}/>
                    </Col>
                    <Col md={11}>
                        <Row>
                            <Col md={6}>
                                <h3>{project.name}</h3>
                            </Col>
                            <Col md={6} style={{textAlign: 'right'}}>
                                <FontAwesomeIcon style={{color: '#668'}} icon={faCubes}/>&nbsp;<span>{project.applications.length}</span>&nbsp;
                                <FontAwesomeIcon
                                    icon={faEllipsisH}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <h6>{project.description}</h6>
                            </Col>
                            <Col md={2} style={{textAlign: 'right'}}>
                                <FontAwesomeIcon icon={faChevronRight}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    renderProjectCard(project, index) {
        return <Card w={3} key={index}>
            <Container>
                <Row>
                    <Col md={8}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{project.name}</h3>
                    </Col>
                    <Col md={4} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{project.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={6}>
                        <FontAwesomeIcon style={{color: '#668'}} icon={faCubes}/>&nbsp;<span>{project.applications.length}</span>
                    </Col>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faChevronRight}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
