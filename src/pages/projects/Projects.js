import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Projects.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faCubes, faEllipsisH, faTh, faThList} from "@fortawesome/free-solid-svg-icons";

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
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                        {this.renderProjectRow()}
                    </Row>
                    :
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                        {this.renderProjectCard()}
                    </Row>
            }
        </Container>
    }

    renderProjectRow() {
        return <Card w={12}>
            <Container>
                <Row style={{marginTop: '0.5em'}}>
                    <Col md={1}>
                        <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '3em'}} icon={faCube}/>
                    </Col>
                    <Col md={11}>
                        <Row>
                            <Col md={6}>
                                <h3>SCP</h3>
                            </Col>
                            <Col md={6} style={{textAlign: 'right'}}>
                                <FontAwesomeIcon style={{color: '#668'}} icon={faCubes}/>&nbsp;<span>3</span>&nbsp; <FontAwesomeIcon
                                icon={faEllipsisH}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <h6>Security Check Platform</h6>
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

    renderProjectCard() {
        return <Card w={3}>
            <Container>
                <Row>
                    <Col md={6}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;SCP</h3>
                    </Col>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>Security Check Platform</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={6}>
                        <FontAwesomeIcon style={{color: '#668'}} icon={faCubes}/>&nbsp;<span>3</span>
                    </Col>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }
}

export default Projects;
