import React from "react";
import {Container, Row} from "react-bootstrap";
import './DashBoard.css'
import Card from "../../components/card/Card";

class DashBoard extends React.Component {
    render() {
        return <Container className={'DashBoard'}>
            <Row style={{padding: 0, margin: 0}}>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
            </Row>
        </Container>
    }
}

export default DashBoard;
