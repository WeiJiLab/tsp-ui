import React from "react";
import {Container, Row} from "react-bootstrap";
import './DashBoard.css'
import Card from "../../components/card/Card";
import PushButton from "../../components/button/PushButton";
import ModalWrapper from "../../components/modal/ModalWrapper";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";

class DashBoard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
        };
    }

    render() {
        return <Container className={'DashBoard'}>
            <Row style={{padding: 0, margin: 0}}>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
            </Row>
            <Row style={{padding: 0, margin: 0}}>
                <Card title={'一堆按钮'} w={3}>
                    <PushButton>按钮</PushButton>
                </Card>
                <Card title={'一个弹框'} w={3}>
                    <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)} title={'这是个弹框'}>啦啦啦</ModalWrapper>
                    <PushButton onClick={this.showModal.bind(this)}>弹框</PushButton>
                </Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
                <Card title={'卡片'} w={3}>这是个卡片</Card>
            </Row>
        </Container>
    }

    modalClose() {
        this.setState({
            modalShow: false,
        });
    }

    showModal() {
        this.setState({
            modalShow: true,
        });
    }

    componentDidMount() {
        this.props.getProjects();
    }
}


const mapStateToProps = state => ({
    project: state.reduxResult.project
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getProjects,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
