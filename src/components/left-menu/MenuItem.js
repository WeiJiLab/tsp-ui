import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

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
            <Col md={12} className={"MenuItem"}>
                <Row onClick={this.showMenu.bind(this)} style={{paddingLeft: '2em'}}>
                    {data.title} &nbsp;&nbsp;<FontAwesomeIcon icon={faChevronRight}/>
                </Row>
            </Col>
            <Col md={12} style={{padding: 0, display: this.state.isMenuOpen ? 'block' : 'none'}}>
                {this.renderMenuItemChild(data)}
            </Col>
        </Row>
    }

    showMenu() {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    }


    renderMenuItemChild(data) {
        return <Fragment>
            {
                data.child.map((child, id) => {
                    return <Link style={{color: '#fff'}} to={child.route}>
                        <Row style={{padding: 0}}>
                            <Col style={{padding: 0}} md={12}>
                                {child.title}
                            </Col>
                        </Row>
                    </Link>
                })
            }
        </Fragment>;
    }
}


export default MenuItem;
