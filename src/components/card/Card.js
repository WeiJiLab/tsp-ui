import React, {Component} from "react";

import './Card.css'
import {Col, Container} from "react-bootstrap";

class Card extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Col md={this.props.w} className={'CardContainer'}>
            <h5 style={{color: '#333'}}>{this.props.title}</h5>
            <Container className={'Card'}>
                {this.props.children}
            </Container>
        </Col>
    }
}

export default Card;
