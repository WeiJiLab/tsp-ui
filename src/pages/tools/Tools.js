import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './Tools.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faEllipsisH, faTags, faTh, faThList} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getTools} from "../../actions/ToolsAction";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";

class Tools extends React.Component {
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
        return <Container className={'Tools'}>
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
                        {this.props.tools.map((tool, index) => {
                            return this.renderToolRow(tool, index);
                        })}
                    </Row>
                    :
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        {this.props.tools.map((tool, index) => {
                            return this.renderToolCard(tool, index);
                        })}
                    </Row>
            }
        </Container>
    }

    renderToolRow(tool, index) {
        return <Card w={12} key={index}>
            <Container>
                <Row style={{marginTop: '0.5em'}}>
                    <Col md={1}>
                        <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '3em'}} icon={faCube}/>
                    </Col>
                    <Col md={11}>
                        <Row>
                            <Col md={6}>
                                <h3 style={{
                                    whiteSpace: 'nowrap',
                                    display: 'inline-block',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
                                }}>{tool.name}</h3>&nbsp;
                                <span
                                    style={{
                                        position: 'relative',
                                        background: '#666',
                                        borderRadius: '3px',
                                        padding: '0.3em',
                                        color: '#fff',
                                        paddingTop: '0.1em',
                                        paddingBottom: '0.1em',
                                        top: '-1em',
                                    }}>{tool.category}</span>
                            </Col>
                            <Col md={6} style={{textAlign: 'right'}}>
                                <FontAwesomeIcon
                                    icon={faEllipsisH}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <h6 style={{display: 'inline-block'}}>{tool.description}</h6>&nbsp;&nbsp;&nbsp;
                                <span style={{color: '#668', margin: 0}}><FontAwesomeIcon style={{color: '#668'}} icon={faTags}/>&nbsp;{tool.metadata}</span>
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

    renderToolCard(tool, index) {
        return <Card w={3} key={index}>
            <Container>
                <Row>
                    <Col md={10}>
                        <h3 style={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                        }}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{tool.name}</h3>
                    </Col>
                    <Col md={2} style={{textAlign: 'right'}}>
                        <FontAwesomeIcon icon={faEllipsisH}/>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{tool.description}</h6>
                        <p style={{color: '#668', margin: 0}}><FontAwesomeIcon style={{color: '#668'}} icon={faTags}/>&nbsp;{tool.metadata}</p>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={6}>
                        <span
                            style={{
                                background: '#666',
                                borderRadius: '3px',
                                padding: '0.3em',
                                color: '#fff',
                                paddingTop: '0.1em',
                                paddingBottom: '0.1em'
                            }}>{tool.category}</span>
                    </Col>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <Link to={{
                            route: 'tool',
                            id: tool.id
                        }}> <FontAwesomeIcon icon={faChevronRight}/></Link>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.setBreadCrumbMenu([
            {
                title: 'Tools',
                clickable: false,
                route: ''
            }
        ]);
        this.props.getTools();
    }
}

const mapStateToProps = state => ({
    tools: state.reduxResult.tools.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getTools,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
