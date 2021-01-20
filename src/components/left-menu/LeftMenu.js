import React from "react";
import {Container} from "react-bootstrap";
import './LeftMenu.css'
import MenuItem from "./MenuItem";

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'LeftMenu'}>

            {
                this.props.menu.map((data, index) => {
                    return <MenuItem data={data}/>
                })
            }

        </Container>
    }
}


export default LeftMenu;
