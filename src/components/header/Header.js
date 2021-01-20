import React from "react";
import {Container} from "react-bootstrap";
import './Header.css'


class Header extends React.Component {
    render() {
        return <Container className={'Header'}>
            <p>SCP Platform</p>
        </Container>
    }
}


export default Header;
