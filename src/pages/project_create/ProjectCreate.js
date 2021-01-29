import React from "react";
import {Container, FormControl, FormLabel, Row} from "react-bootstrap";
import './ProjectCreate.css';
import PushButton from "../../components/button/PushButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {createProject} from "../../actions/ProjectsAction";
import {connect} from "react-redux";
import ModalWrapper from "../../components/modal/ModalWrapper";

class ProjectCreate extends React.Component {

    constructor(props) {
        super(props);
        this.createProjectRequest = {
            name: '',
            description: '',
            ownerId: 0
        };

        this.state = {
            btnCreate: {
                disabled: false,
                text: '创建项目'
            },
            modalShow: false,
        };
    }

    render() {
        return <Container className={'ProjectCreate'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'创建项目'} md={6}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>项目名称</FormLabel>
                        <FormControl onChange={this.changeName.bind(this)} placeHolder={'输入项目名称'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>项目描述</FormLabel>
                        <FormControl onChange={this.changeDesc.bind(this)} as="textarea" placeHolder={'输入描述'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)}
                                      title={'提示'}>{this.state.modalText}</ModalWrapper>
                        <PushButton disabled={this.state.btnCreate.disabled} onClick={this.createProject.bind(this)}> <FontAwesomeIcon
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
        this.createProjectRequest.name = e.currentTarget.value;
    }

    changeDesc(e) {
        this.createProjectRequest.description = e.currentTarget.value;
    }

    createProject() {
        if (this.createProjectRequest.name === '' || this.createProjectRequest.description === '') {
            this.showModal('信息填写不完整');
        } else {
            this.setState({
                btnCreate: {
                    disabled: true,
                    text: '创建中...'
                }
            });
            this.props.createProject(this.createProjectRequest);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createProjectResult !== this.props.createProjectResult) {
            this.setState({
                btnCreate: {
                    disabled: false,
                    text: '创建项目'
                }
            });
            this.props.history.push('/project/' + nextProps.createProjectResult.id);
        }
    }
}


const mapStateToProps = state => ({
    createProjectResult: state.reduxResult.createProjectResult.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createProject,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);
