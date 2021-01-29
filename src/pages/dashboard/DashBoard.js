import React from "react";
import {Container, Row} from "react-bootstrap";
import './DashBoard.css'
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {getProjects} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faBoxes, faCube, faCubes, faShieldVirus} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

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
                <Card title={'项目'} w={3}>
                    <Container>
                        <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCube}/>
                        <Link to={'/projects'}><h1 style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>0</h1></Link>
                    </Container>
                </Card>
                <Card title={'应用'} w={3}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faCubes}/>
                    <Link to={'/apps'}><h1 style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>0</h1></Link>
                </Card>
                <Card title={'安全工具'} w={3}>
                    <FontAwesomeIcon style={{fontSize: '2em', color: 'rgb(36, 66, 164)'}} icon={faShieldVirus}/>
                    <Link to={'/tools'}><h1 style={{display: 'inline-block', padding: 0, margin: 0, marginLeft: '0.5em'}}>0</h1></Link>
                </Card>
            </Row>
            <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                <Card title={'最近的扫描'} w={6}>
                    {/*<PushButton>按钮</PushButton>*/}
                    <span style={{color: '#aaa'}}>无</span>
                </Card>
                <Card title={'待扫描的任务'} w={6}>
                    <span style={{color: '#aaa'}}>无</span>
                    {/*<ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)} title={'这是个弹框'}>啦啦啦</ModalWrapper>*/}
                    {/*<PushButton onClick={this.showModal.bind(this)}>弹框</PushButton>*/}
                </Card>
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
