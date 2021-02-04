import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleRight, faAngleUp} from "@fortawesome/free-solid-svg-icons";

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
                    <Row style={{paddingLeft: '0em'}}>
                        <Col md={this.props.mode === 'full' ? 9 : 6} onClick={this.showItemClick.bind(this)}>
                            <FontAwesomeIcon style={{fontSize: this.props.mode === 'full' ? '1em' : '2em'}}
                                             icon={data.icon}/> {this.props.mode === 'full' ? data.title : ''}
                        </Col>
                        <Col md={this.props.mode === 'full' ? 1 : 6} onClick={this.showMenu.bind(this)}>
                            {this.props.open ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown}/>}
                        </Col>
                    </Row>
                </Col>
            </Container>
            <Container className={'MaskClassNameMask'}
                       style={{padding: 0, margin: 0, display: this.props.open ? 'block' : 'none'}}>
                <Col md={12} className={'MenuItemNiberBottom'} style={{paddingLeft: 0}}>
                    {this.renderMenuItemChild(data)}
                </Col>
            </Container>
        </Row>
    }

    showItemClick() {
        this.props.onClick(this.props.index);
        this.props.closeAll(this.props.index);
        this.props.openItem(this.props.index);
    }

    showMenu() {
        this.props.openItem(this.props.index);
    }


    renderMenuItemChild(data) {
        return <Container
            style={{background: 'rgb(30,59,153)', borderRadius: '0.3em', borderTopRightRadius: '1.5em', paddingLeft: '1em', margin: 0}}>
            {
                data.child.map((child, id) => {
                    return <Link key={id} style={{textDecoration: 'none', color: '#fff'}} to={child.route}>
                        <Row style={{padding: 0, margin: 0, paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                            <Col md={this.props.mode === 'full' ? 9 : 6} style={{textAlign: 'left',padding:0}}>
                                <FontAwesomeIcon style={{fontSize: this.props.mode === 'full' ? '1em' : '2em'}}
                                                 icon={child.icon}/> {this.props.mode === 'full' ? child.title : ''}
                            </Col>
                            <Col md={this.props.mode === 'full' ? 1 : 6}>
                                <FontAwesomeIcon icon={faAngleRight}/>
                            </Col>
                        </Row>
                    </Link>
                })
            }
        </Container>;
    }
}


export default MenuItem;
