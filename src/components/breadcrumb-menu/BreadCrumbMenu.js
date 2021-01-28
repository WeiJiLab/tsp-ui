import {Component} from "react";
import {Breadcrumb} from "react-bootstrap";

import './BreadCrumbMenu.css'

class BreadCrumbMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Breadcrumb className={'BC'}>
            {
                this.props.data.map((item, index) => {
                    return <Breadcrumb.Item key={index} active={!item.clickable} href={item.route}>{item.title}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    }
}

export default BreadCrumbMenu;
