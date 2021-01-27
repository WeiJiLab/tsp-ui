import React, {Component, Fragment} from "react";
import './ModalWrapper.css';
import {Container, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

class ModalWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
        }
    }

    close() {
        this.setState({
            show: false,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                show: this.props.show,
            })
        }
    }

    render() {
        return <Fragment>
            <Modal show={this.state.show} onHide={this.close.bind(this)}>
                <Container className={'ModalContainer'}>
                    {this.props.title}
                    <FontAwesomeIcon style={{fontSize: '1em', right: 0, float: 'right'}} onClick={this.close.bind(this)} icon={faTimes}/>
                </Container>
                <Container className={'ModalContainer'}>
                    {this.props.children}
                </Container>
            </Modal>
        </Fragment>;
    }
}

export default ModalWrapper;
