import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp} from "@fortawesome/free-solid-svg-icons";

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    render() {
        const {data} = this.props;
        return <Row>
            <Container className={this.props.maskClassName} style={{padding: 0, margin: 0}}>
                <Col md={12} className={this.props.className}>
                    <Row style={{paddingLeft: '2em'}}>
                        <Col md={8} onClick={this.showItemClick.bind(this)}>
                            {data.title}
                        </Col>
                        <Col md={1} onClick={this.showMenu.bind(this)}>
                            {this.props.open ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        </Col>
                    </Row>
                </Col>
            </Container>
            <Container className={'MaskClassNameMask'}
                       style={{padding: 0, margin: 0, display: this.props.open ? 'block' : 'none'}}>
                <Col md={12} className={'MenuItemNiberBottom'}>
                    {this.renderMenuItemChild(data)}
                </Col>
            </Container>
        </Row>
    }

    showItemClick() {
        this.props.onClick(this.props.index);
        this.props.closeAll(this.props.index);
    }

    showMenu() {
        this.props.openItem(this.props.index);
    }


    renderMenuItemChild(data) {
        return <Container style={{background: 'rgb(30,59,153)', borderRadius: '5px', paddingLeft: '2em', marginTop: '0.5em'}}>
            {
                data.child.map((child, id) => {
                    return <Link style={{color: '#fff'}} to={child.route}>
                        <Row style={{padding: 0, paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                            <Col style={{padding: 0}} md={12}>
                                {child.title}
                            </Col>
                        </Row>
                    </Link>
                })
            }
        </Container>;
    }
}


export default MenuItem;
