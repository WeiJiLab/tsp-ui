import React from "react";
import {Container, FormControl, FormLabel, Row} from "react-bootstrap";
import './AppCreate.css';
import PushButton from "../../components/basic/button/PushButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/business/card/ResourceCard";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ModalWrapper from "../../components/business/modal/ModalWrapper";
import {createApp, getProject} from "../../actions/ProjectsAction";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";

class AppCreate extends React.Component {

    constructor(props) {
        super(props);
        this.createAppRequest = {
            name: '',
            description: '',
            ownerId: 0
        };

        this.state = {
            btnCreate: {
                disabled: false,
                text: '创建应用'
            },
            modalShow: false,
        };
    }

    render() {
        return <Container className={'AppCreate'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'创建应用'} md={6}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>项目</FormLabel>
                        <FormControl disabled={true} placeHolder={this.props.project.name}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>应用名称</FormLabel>
                        <FormControl onChange={this.changeName.bind(this)} placeHolder={'输入应用名称'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>应用描述</FormLabel>
                        <FormControl onChange={this.changeDesc.bind(this)} as="textarea" placeHolder={'输入描述'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)}
                                      title={'提示'}>{this.state.modalText}</ModalWrapper>
                        <PushButton disabled={this.state.btnCreate.disabled} onClick={this.createApp.bind(this)}> <FontAwesomeIcon
                            icon={faCheck}/> &nbsp;{this.state.btnCreate.text}
                        </PushButton>
                    </Row>
                </Card>
            </Row>
        </Container>
    }

    modalClose() {
        this.setState({
            modalShow: false,
        });
    }

    showModal(text) {
        this.setState({
            modalShow: true,
            modalText: text,
        });
    }

    changeName(e) {
        this.createAppRequest.name = e.currentTarget.value;
    }

    changeDesc(e) {
        this.createAppRequest.description = e.currentTarget.value;
    }

    createApp() {
        if (this.createAppRequest.name === '' || this.createAppRequest.description === '') {
            this.showModal('信息填写不完整');
        } else {
            this.setState({
                btnCreate: {
                    disabled: true,
                    text: '创建中...'
                }
            });
            this.props.createApp(this.props.match.params.projectId, this.createAppRequest);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createAppResult !== this.props.createAppResult) {
            this.setState({
                btnCreate: {
                    disabled: false,
                    text: '创建应用'
                }
            });
            if (!nextProps.createAppResult.status) {
                this.showModal(nextProps.createAppResult.message);
            } else {
                this.props.history.push('/project/' + nextProps.createAppResult.data.projectId);
            }
        }
    }

    componentDidMount() {
        this.props.getProject(this.props.match.params.projectId);
        this.props.setBreadCrumbMenu([
            {
                title: 'Projects',
                clickable: true,
                route: '/projects'
            },
            {
                title: 'Project-' + this.props.match.params.projectId,
                clickable: true,
                route: '/project/' + this.props.match.params.projectId
            },
            {
                title: 'Create',
                clickable: false,
                route: ''
            },
        ]);
    }
}


const mapStateToProps = state => ({
    createAppResult: state.reduxResult.createAppResult,
    project: state.reduxResult.project.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createApp,
    getProject,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppCreate);
