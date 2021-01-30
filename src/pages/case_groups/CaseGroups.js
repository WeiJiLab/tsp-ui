import React from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import './CaseGroups.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faCube, faCubes, faEllipsisH, faFileSignature, faTh, faThList} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {deleteCaseGroups, getCaseGroups} from "../../actions/CasesAction";

class CaseGroups extends React.Component {
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
        return <Container className={'CaseGroups'}>
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
                        {this.props.cases.map((cas, index) => {
                            return this.renderCaseRow(cas, index);
                        })}
                    </Row>
                    :
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        {this.props.caseGroups.map((cas, index) => {
                            return this.renderCaseCard(cas, index);
                        })}
                    </Row>
            }
        </Container>
    }

    renderCaseRow(cas, index) {
        return <Card w={12} key={index}>
            <Container>
                <Row style={{marginTop: '0.5em'}}>
                    <Col md={1}>
                        <FontAwesomeIcon style={{color: 'rgb(36, 66, 164)', fontSize: '3em',marginTop:'0.1em'}} icon={faCube}/>
                    </Col>
                    <Col md={11}>
                        <Row>
                            <Col md={6}>
                                <h3 style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    display: 'inline-block'
                                }}>{cas.name}</h3>
                            </Col>
                            <Col md={6} style={{textAlign: 'right'}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                        <FontAwesomeIcon
                                            icon={faEllipsisH}/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.deleteCaseGroups.bind(this, cas.id)}>删除</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <FontAwesomeIcon style={{color: '#668'}} icon={faFileSignature}/>&nbsp;
                                <span>{cas.cases.length}</span>&nbsp;&nbsp;&nbsp;
                                <span style={{fontSize:'1.1em'}}>{cas.description}</span>
                            </Col>
                            <Col md={2} style={{textAlign: 'right'}}>
                                <Link to={'case/' + cas.id}> <FontAwesomeIcon icon={faChevronRight}/></Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }


    renderCaseCard(cas, index) {
        return <Card w={3} key={index}>
            <Container>
                <Row>
                    <Col md={8}>
                        <h3 style={{
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden'
                        }}><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faCube}/>&nbsp;{cas.name}</h3>
                    </Col>
                    <Col md={4} style={{textAlign: 'right'}}>
                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown-basic">
                                <FontAwesomeIcon
                                    icon={faEllipsisH}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.deleteCaseGroups.bind(this, cas.id)}>删除</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{cas.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={6}>
                        <FontAwesomeIcon style={{color: '#668'}} icon={faFileSignature}/>&nbsp;<span>{cas.cases.length}</span>
                    </Col>
                    <Col md={6} style={{textAlign: 'right'}}>
                        <Link to={'case/' + cas.id}> <FontAwesomeIcon icon={faChevronRight}/></Link>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    componentDidMount() {
        this.props.setBreadCrumbMenu([
            {
                title: 'Cases',
                clickable: false,
                route: ''
            }
        ]);
        this.props.getCaseGroups();
    }

    deleteCaseGroups(caseId) {
        this.props.deleteCaseGroups(caseId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteCaseGroupsResult !== this.props.deleteCaseGroupsResult) {
            this.props.getCaseGroups();
        }
    }
}

const mapStateToProps = state => ({
    caseGroups: state.reduxResult.caseGroups.data,
    deleteCaseGroupsResult: state.reduxResult.deleteCaseGroupsResult,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCaseGroups,
    deleteCaseGroups,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CaseGroups);
