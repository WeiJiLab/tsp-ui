import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './LeftMenu.css'
import MenuItem from "./MenuItem";

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);


        let open = [];
        for (let i = 0; i < this.props.menu.length; i++) {
            open.push(false);
        }

        this.state = {
            selectMenuIndex: 0,
            open: open,
            showPlaceholderBottom: true,
        };
    }

    render() {
        return <Container className={'LeftMenu'}>
            <Row>
                <Container className={this.state.selectMenuIndex === 0 ? 'MaskClassNameMask' : 'MaskClassNameDefault'}
                           style={{padding: 0, margin: 0}}>
                    <Col md={12} className={'MenuItemNiberTop'}>&nbsp;</Col>
                </Container>
            </Row>
            {
                this.props.menu.map((data, index) => {
                    return this.renderItem(data, index)
                })
            }
            {this.state.showPlaceholderBottom ?
                <Row>
                    <Container className={this.state.selectMenuIndex === this.props.menu.length - 1 ? 'MaskClassNameMask' : 'MaskClassNameDefault'}
                               style={{padding: 0, margin: 0}}>
                        <Col md={12} className={'MenuItemNiberBottom'}>&nbsp;</Col>
                    </Container>
                </Row> : null
            }

        </Container>
    }

    renderItem(data, index) {
        let className = 'MenuItem';
        let maskClassName = 'MaskClassNameDefault';

        if (index === this.state.selectMenuIndex) {
            className = 'MenuItemSelected';
            maskClassName = 'MaskClassNameDefault';
        } else if (index === this.state.selectMenuIndex - 1) {
            className = 'MenuItem MenuItemNiberTop';
            maskClassName = 'MaskClassNameMask';
        } else if ((index === this.state.selectMenuIndex + 1) && !this.state.open[this.state.selectMenuIndex]) {
            className = 'MenuItem MenuItemNiberBottom';
            maskClassName = 'MaskClassNameMask';
        }
        return <MenuItem
            key={index}
            maskClassName={maskClassName}
            onClick={this.selectItem.bind(this, index)}
            index={index}
            className={className}
            data={data}
            open={this.state.open[index]}
            closeAll={this.closeAll.bind(this, index)}
            openItem={this.openItem.bind(this, index)}/>;
    }

    openItem(index) {
        let open = this.state.open;
        open[index] = !open[index];

        for (let i = 0; i < this.props.menu.length; i++) {
            if (i !== index) {
                open[i] = false;
            }
        }
        let showPlaceholderBottom = true;
        if (open[index]) {
            showPlaceholderBottom = false;
        }
        this.setState({
            selectMenuIndex: index,
            open: open,
            showPlaceholderBottom: showPlaceholderBottom,
        });
    }

    closeAll(index) {
        let open = this.state.open;
        for (let i = 0; i < this.props.menu.length; i++) {
            open[i] = false;
        }
        this.setState({
            selectMenuIndex: index,
            open: open,
            showPlaceholderBottom: true,
        });
    }

    selectItem(index) {
        this.setState({
            selectMenuIndex: index
        });
    }
}


export default LeftMenu;
