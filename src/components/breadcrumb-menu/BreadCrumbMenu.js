import {Component} from "react";
import {Breadcrumb} from "react-bootstrap";

import './BreadCrumbMenu.css'
import {Link} from "react-router-dom";

class BreadCrumbMenu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Breadcrumb className={'BC'}>
            {
                this.props.data.map((item, index) => {
                    return <Breadcrumb.Item key={index}
                                            active={!item.clickable}> {this.renderLink(item)} </Breadcrumb.Item>
                })
            }
        </Breadcrumb>;
    }

    renderLink(item) {
        if (item.clickable) {
            return <Link to={item.route}>{item.title}</Link>
        } else {
            return item.title
        }
    }
}

export default BreadCrumbMenu;
