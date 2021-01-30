import React, {Component} from "react";
import {Container, Row} from "react-bootstrap";
import './NoMatch.css'
import {bindActionCreators} from "redux";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {connect} from "react-redux";
import {faSadCry} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class NoMatch extends Component {
    render() {
        return <Container className={'NoMatch'}>
            <Row style={{textAlign: 'center'}}><h1 style={{textAlign: 'center', width: '100%', fontSize: '6em'}}>404</h1></Row>
            <Row style={{textAlign: 'center', marginTop: '2em'}}><FontAwesomeIcon style={{textAlign: 'center', fontSize: '5em', width: '100%'}}
                                                                                  icon={faSadCry}/></Row>
            <Row style={{textAlign: 'center', marginTop: '1em'}}><h3 style={{textAlign: 'center', width: '100%'}}>Oops, No page matched.</h3></Row>
        </Container>
    }

    componentDidMount() {
        this.props.setBreadCrumbMenu([
            {
                title: '404',
                clickable: false,
                route: ''
            }
        ]);
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NoMatch);
