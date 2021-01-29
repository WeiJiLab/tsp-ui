import React, {Component} from "react";
import './PushButton.css';
import {Button} from "react-bootstrap";

class PushButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Button style={this.props.style} disabled={this.props.disabled} onClick={this.props.onClick} className={'PushButton'}>{this.props.children}</Button>
    }
}

export default PushButton;
