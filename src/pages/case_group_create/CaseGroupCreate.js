import React from "react";
import {Container, FormControl, FormLabel, Row} from "react-bootstrap";
import './CaseGroupCreate.css';
import PushButton from "../../components/basic/button/PushButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/business/card/ResourceCard";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ModalWrapper from "../../components/business/modal/ModalWrapper";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {createCaseGroup} from "../../actions/CasesAction";

class CaseGroupCreate extends React.Component {

    constructor(props) {
        super(props);
        this.createCaseGroupRequest = {
            name: '',
            description: ''
        };

        this.state = {
            btnCreate: {
                disabled: false,
                text: '创建用例组'
            },
            modalShow: false,
        };
    }

    render() {
        return <Container className={'ProjectCreate'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'创建用例组'} md={6}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例组名称</FormLabel>
                        <FormControl onChange={this.changeName.bind(this)} placeHolder={'输入用例组名称'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例组描述</FormLabel>
                        <FormControl onChange={this.changeDesc.bind(this)} as="textarea" placeHolder={'输入描述'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)}
                                      title={'提示'}>{this.state.modalText}</ModalWrapper>
                        <PushButton disabled={this.state.btnCreate.disabled} onClick={this.createCaseGroup.bind(this)}> <FontAwesomeIcon
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
        this.createCaseGroupRequest.name = e.currentTarget.value;
    }

    changeDesc(e) {
        this.createCaseGroupRequest.description = e.currentTarget.value;
    }

    createCaseGroup() {
        if (this.createCaseGroupRequest.name === '' || this.createCaseGroupRequest.description === '') {
            this.showModal('信息填写不完整');
        } else {
            this.setState({
                btnCreate: {
                    disabled: true,
                    text: '创建中...'
                }
            });
            this.props.createCaseGroup(this.createCaseGroupRequest);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createCaseGroupResult !== this.props.createCaseGroupResult) {
            this.setState({
                btnCreate: {
                    disabled: false,
                    text: '创建用例组'
                }
            });
            if (!nextProps.createCaseGroupResult.status) {
                this.showModal(nextProps.createCaseGroupResult.message);
            } else {
                this.props.history.push('/case/' + nextProps.createCaseGroupResult.data.id);
            }
        }
    }

    componentDidMount() {
        this.props.setBreadCrumbMenu([
            {
                title: 'CaseGroup',
                clickable: true,
                route: '/case-groups'
            },
            {
                title: 'Create',
                clickable: false,
                route: ''
            }
        ]);
    }
}


const mapStateToProps = state => ({
    createCaseGroupResult: state.reduxResult.createCaseGroupResult,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    createCaseGroup,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CaseGroupCreate);
