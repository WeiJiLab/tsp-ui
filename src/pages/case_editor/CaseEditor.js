import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import './CaseEditor.css';
import Card from "../../components/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFileSignature, faShieldAlt} from "@fortawesome/free-solid-svg-icons";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {setBreadCrumbMenu} from "../../actions/BreadCrumbMenuAction";
import {getCase} from "../../actions/CasesAction";
import {getScanTasks} from "../../actions/TasksAction";
import {getTool} from "../../actions/ToolsAction";
import {Link} from "react-router-dom";

import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.js'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';

class CaseEditor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Container className={'CaseEditor'}>
            <Row style={{padding: 0, margin: 0}}>
                <Col md={3} style={{padding: 0, margin: 0}}>
                    {this.renderCaseCard()}
                    {this.renderToolCard()}
                </Col>
                <Col md={9} style={{padding: 0, margin: 0}}>
                    <Card title={'用例编辑器'} w={12}>
                        <CodeMirror
                            editorDidMount={editor => {
                                this.instance = editor
                            }}
                            value={'// here should be case script'}
                            options={{
                                mode: {name: 'text/css'},
                                theme: 'solarized dark',
                                autofocus: true,
                                styleActiveLine: true,
                                lineNumbers: true,
                                smartIndent: true,
                                lineWrapping: true,
                                foldGutter: true,
                                gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],//end
                                extraKeys: {
                                    "Ctrl": "autocomplete",
                                    "Ctrl-S": function (editor) {
                                        // this.codeSave(editor)
                                    },
                                    "Ctrl-Z": function (editor) {
                                        editor.undo();
                                    },//undo
                                    "F8": function (editor) {
                                        editor.redo();
                                    },//Redo
                                },
                                autoCloseBrackets: true
                            }}
                            onChange={this.codeOnChange}
                            onBlur={this.codeOnBlur}
                            onBeforeChange={(editor, data, value) => {
                                console.log("onBeforeChange fresh")
                                console.log(JSON.stringify(data));
                            }}
                        />
                    </Card>
                </Col>
            </Row>
        </Container>
    }

    codeOnChange() {

    }

    codeOnBlur() {

    }

    renderCaseCard() {
        return <Card title={'用例信息'} w={12}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faFileSignature}/>&nbsp;{this.props.cas.name}</h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.cas.description}</h6>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <p>{this.props.cas.scriptPath}&nbsp;&nbsp;<FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faDownload}/></p>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }

    renderToolCard() {
        return <Card title={'工具信息'} w={12}>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3><FontAwesomeIcon style={{color: 'rgb(36, 66, 164)'}} icon={faShieldAlt}/>&nbsp;<Link
                            to={'/tool/' + this.props.tool.id}>{this.props.tool.name}</Link></h3>
                    </Col>
                </Row>
                <Row style={{marginTop: '1em'}}>
                    <Col md={12}>
                        <h6>{this.props.tool.description}</h6>
                    </Col>
                </Row>
            </Container>
        </Card>;
    }


    componentDidMount() {
        this.props.getCase(this.props.match.params.caseId);
        this.props.setBreadCrumbMenu([
            {
                title: 'Cases',
                clickable: true,
                route: '/cases'
            },
            {
                title: 'Case-' + this.props.match.params.caseId,
                clickable: true,
                route: '/case/' + this.props.match.params.caseId
            },
            {
                title: 'Editor',
                clickable: false,
                route: ''
            }
        ]);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteAppResult !== this.props.deleteAppResult) {
            this.props.getProject(this.props.match.params.id);

        }
        if (nextProps.cas !== this.props.cas) {
            this.props.getTool(nextProps.cas.securityToolId);
        }

    }
}

const mapStateToProps = state => ({
    cas: state.reduxResult.cas.data,
    tool: state.reduxResult.tool.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getCase,
    getTool,
    getScanTasks,
    setBreadCrumbMenu
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CaseEditor);
