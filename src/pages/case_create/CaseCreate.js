import React from "react";
import {Col, Container, FormControl, FormLabel, Row} from "react-bootstrap";
import './CaseCreate.css';
import PushButton from "../../components/button/PushButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/card/Card";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ModalWrapper from "../../components/modal/ModalWrapper";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getTool} from "../../actions/ToolsAction";
import Dropzone from 'react-dropzone';
import {createCase} from "../../actions/CasesAction";

class CaseCreate extends React.Component {

    constructor(props) {
        super(props);
        this.createCaseRequest = new FormData();

        this.state = {
            btnCreate: {
                disabled: false,
                text: '创建用例'
            },
            modalShow: false,
            files: [],
        };
    }

    onDrop(files) {
        this.setState({
            files
        });
        // let fileList = [];
        // let loadedFiles = [];
        // files.forEach((file) => {
        //     const reader = new FileReader()
        //     reader.onabort = () => console.log('file reading was aborted')
        //     reader.onerror = () => console.log('file reading has failed')
        //     reader.onload = () => {
        //         console.log('file loaded')
        //         fileList.push(file);
        //         loadedFiles.push({
        //             name: file.name,
        //             size: file.size
        //         })
        //     }
        //     reader.readAsArrayBuffer(file);
        // });
        // this.setState({
        //     files: fileList,
        //     loadedFiles
        // });
    };

    render() {
        return <Container className={'CaseCreate'}>
            <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                <Card title={'添加用例'} md={6}>
                    <Row style={{padding: 0, margin: 0, marginTop: '0em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>工具</FormLabel>
                        <FormControl disabled={true} placeHolder={this.props.tool.name}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '2em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例名称</FormLabel>
                        <FormControl onChange={this.changeName.bind(this)} placeHolder={'输入用例名称'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例描述</FormLabel>
                        <FormControl onChange={this.changeDesc.bind(this)} as="textarea" placeHolder={'输入描述'}/>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>用例文件</FormLabel>
                        <Dropzone onDrop={this.onDrop.bind(this)}>
                            {({getRootProps, getInputProps}) => (
                                <Row className="container" style={{padding: 0, margin: 0}}>
                                    <Col md={12} {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <p>将用例文件拖拽到此处</p>
                                    </Col>
                                </Row>
                            )}
                        </Dropzone>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <FormLabel style={{color: 'rgb(36, 66, 84)'}}>准备上传的用例文件</FormLabel>
                        <Col md={12} style={{border: 'solid 1px #eee', borderRadius: '2px', minHeight: '1em', background: '#fafafa'}}>
                            {
                                this.state.files.map((file, index) => (
                                    <Row key={index}>
                                        {file.name} - {file.size} bytes
                                    </Row>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row style={{padding: 0, margin: 0, marginTop: '1em'}}>
                        <ModalWrapper show={this.state.modalShow} closeHook={this.modalClose.bind(this)}
                                      title={'提示'}>{this.state.modalText}</ModalWrapper>
                        <PushButton disabled={this.state.btnCreate.disabled} onClick={this.createCase.bind(this)}> <FontAwesomeIcon
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
        this.createCaseRequest.append('name', e.currentTarget.value);
    }

    changeDesc(e) {
        this.createCaseRequest.append('description', e.currentTarget.value);
    }

    createCase() {
        console.log('files', this.state.files);
        this.createCaseRequest.append("file", this.state.files[0]);
        this.createCaseRequest.append("toolId", this.props.match.params.toolId);
        console.log('name', this.createCaseRequest.get('name'));
        console.log('description', this.createCaseRequest.get('description'));
        console.log('toolId', this.createCaseRequest.get('toolId'));
        console.log('file', this.createCaseRequest.get('file'));
        if (!this.createCaseRequest.get('name') || !this.createCaseRequest.get('file') || this.state.files.length === 0 || !this.createCaseRequest.get('description') || !this.createCaseRequest.get('toolId')) {
            this.showModal('信息填写不完整');
        } else {
            this.setState({
                btnCreate: {
                    disabled: true,
                    text: '创建中...'
                }
            });
            this.props.createCase(this.createCaseRequest);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.createCaseResult !== this.props.createCaseResult) {
            this.setState({
                btnCreate: {
                    disabled: false,
                    text: '创建用例'
                }
            });
            if (!nextProps.createCaseResult.status) {
                this.showModal(nextProps.createCaseResult.message);
            } else {
                this.props.history.push('/tool/' + nextProps.createCaseResult.data.toolId);
            }
        }
    }

    componentDidMount() {
        this.props.getTool(this.props.match.params.toolId);
        this.props.setBreadCrumbMenu([
            {
                title: 'Tools',
                clickable: true,
                route: '/tools'
            },
            {
                title: 'Tool-' + this.props.match.params.toolId,
                clickable: true,
                route: '/tool/' + this.props.match.params.toolId
            },
            {
                title: 'AddCase',
                clickable: false,
                route: ''
            },
        ]);
    }
}


const mapStateToProps = state => ({
    createCaseResult: state.reduxResult.createCaseResult,
    tool: state.reduxResult.tool.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getTool,
    setBreadCrumbMenu,
    createCase
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CaseCreate);
