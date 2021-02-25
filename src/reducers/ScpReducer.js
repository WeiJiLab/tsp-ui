import {AppActions, ProjectActions, ProjectsActions} from "../actions/ProjectsAction";
import {combineReducers} from 'redux';
import {ToolsActions} from "../actions/ToolsAction";
import {BreadCrumbMenuActions} from "../actions/BreadCrumbMenuAction";
import {CasesActions} from "../actions/CasesAction";
import {TasksActions} from "../actions/TasksAction";

const initialState = {
    projects: {
        status: false,
        message: null,
        data: []
    },
    apps: [],
    tools: {
        status: false,
        message: null,
        data: []
    },
    tool: {
        status: false,
        message: null,
        data: {}
    },
    project: {
        status: false,
        message: null,
        data: {}
    },
    app: {
        status: false,
        message: null,
        data: {}
    },
    createProjectResult: {
        status: false,
        message: null,
        data: {}
    },
    createAppResult: {
        status: false,
        message: null,
        data: {}
    },
    createCaseResult: {
        status: false,
        message: null,
        data: {}
    },
    deleteAppResult: {
        status: false,
        message: null,
        data: {}
    },
    deleteProjectResult: {
        status: false,
        message: null,
        data: {}
    },
    breadCrumbMenus: {
        data: []
    },
    cases: {
        status: false,
        message: null,
        data: []
    },
    toolCases: {
        status: false,
        message: null,
        data: []
    },
    cas: {
        status: false,
        message: null,
        data: {}
    },
    caseGroups: {
        status: false,
        message: null,
        data: []
    },
    caseGroup: {
        status: false,
        message: null,
        data: {}
    },
    deleteCaseResult: {
        status: false,
        message: null,
        data: {}
    },
    deleteCaseGroupResult: {
        status: false,
        message: null,
        data: {}
    },
    createCaseGroupResult: {
        status: false,
        message: null,
        data: {}
    },
    tasks: {
        status: false,
        message: null,
        data: []
    },
    task: {
        status: false,
        message: null,
        data: {}
    },
    scanResults: {
        status: false,
        message: null,
        data: []
    },
    taskStartResult: {
        status: false,
        message: null,
        data: {}
    },
    result: {
        status: false,
        message: null,
        data: {}
    }
};

export function reduxResult(state = initialState, action) {
    switch (action.type) {
        case ProjectsActions.API_PROJECTS_SUCCESS:
            let applications = [];
            action.payload.data.map((pj, index) => {
                pj.applications.map((ap, id) => {
                    applications.push(ap);
                });
            });
            return Object.assign({}, state, {
                projects: action.payload,
                apps: applications,
            });
        case ProjectsActions.API_PROJECTS_FAILED:
            return Object.assign({}, state, {
                projects: action.payload,
                apps: [],
            });
        case ToolsActions.API_TOOLS_SUCCESS:
            return Object.assign({}, state, {
                tools: action.payload,
            });
        case ToolsActions.API_TOOLS_FAILED:
            return Object.assign({}, state, {
                tools: action.payload,
            });
        case ToolsActions.API_TOOL_SUCCESS:
            return Object.assign({}, state, {
                tool: action.payload,
            });
        case ToolsActions.API_TOOL_FAILED:
            return Object.assign({}, state, {
                tool: action.payload,
            });
        case ProjectActions.API_PROJECT_SUCCESS:
            return Object.assign({}, state, {
                project: action.payload,
            });
        case ProjectActions.API_PROJECT_FAILED:
            return Object.assign({}, state, {
                project: action.payload,
            });

        case AppActions.API_APP_SUCCESS:
            return Object.assign({}, state, {
                app: action.payload,
            });
        case AppActions.API_APP_FAILED:
            return Object.assign({}, state, {
                app: action.payload,
            });

        case ProjectsActions.API_PROJECT_CREATE_SUCCESS:
            return Object.assign({}, state, {
                createProjectResult: action.payload,
            });
        case ProjectsActions.API_PROJECT_CREATE_FAILED:
            return Object.assign({}, state, {
                createProjectResult: action.payload,
            });

        case AppActions.API_APP_CREATE_SUCCESS:
            return Object.assign({}, state, {
                createAppResult: action.payload,
            });
        case AppActions.API_APP_CREATE_FAILED:
            return Object.assign({}, state, {
                createAppResult: action.payload,
            });

        case CasesActions.API_CASE_CREATE_SUCCESS:
            return Object.assign({}, state, {
                createCaseResult: action.payload,
            });
        case CasesActions.API_CASE_CREATE_FAILED:
            return Object.assign({}, state, {
                createCaseResult: action.payload,
            });

        case AppActions.API_APP_DELETE_SUCCESS:
            return Object.assign({}, state, {
                deleteAppResult: action.payload,
            });
        case AppActions.API_APP_DELETE_FAILED:
            return Object.assign({}, state, {
                deleteAppResult: action.payload,
            });

        case AppActions.API_PROJECT_DELETE_SUCCESS:
            return Object.assign({}, state, {
                deleteProjectResult: action.payload,
            });
        case AppActions.API_PROJECT_DELETE_FAILED:
            return Object.assign({}, state, {
                deleteProjectResult: action.payload,
            });
        case BreadCrumbMenuActions.SET_BREAD_CRUMB_MEU:
            return Object.assign({}, state, {
                breadCrumbMenus: action.payload,
            });


        case CasesActions.API_CASE_DELETE_SUCCESS:
            return Object.assign({}, state, {
                deleteCaseResult: action.payload,
            });
        case CasesActions.API_CASE_DELETE_FAILED:
            return Object.assign({}, state, {
                deleteCaseResult: action.payload,
            });
        case CasesActions.API_CASE_SUCCESS:
            return Object.assign({}, state, {
                cas: action.payload,
            });
        case CasesActions.API_CASE_FAILED:
            return Object.assign({}, state, {
                cas: action.payload,
            });
        case CasesActions.API_CASES_SUCCESS:
            return Object.assign({}, state, {
                cases: action.payload,
            });
        case CasesActions.API_CASES_FAILED:
            return Object.assign({}, state, {
                cases: action.payload,
            });
        case CasesActions.API_CASE_GROUP_DELETE_SUCCESS:
            return Object.assign({}, state, {
                deleteCaseGroupResult: action.payload,
            });
        case CasesActions.API_CASE_GROUP_DELETE_FAILED:
            return Object.assign({}, state, {
                deleteCaseGroupResult: action.payload,
            });
        case CasesActions.API_CASE_GROUP_SUCCESS:
            return Object.assign({}, state, {
                caseGroup: action.payload,
            });
        case CasesActions.API_CASE_GROUP_FAILED:
            return Object.assign({}, state, {
                caseGroup: action.payload,
            });
        case CasesActions.API_CASE_GROUPS_SUCCESS:
            return Object.assign({}, state, {
                caseGroups: action.payload,
            });
        case CasesActions.API_CASE_GROUPS_FAILED:
            return Object.assign({}, state, {
                caseGroups: action.payload,
            });

        case CasesActions.API_CASE_CREATE_GROUPS_SUCCESS:
            return Object.assign({}, state, {
                createCaseGroupResult: action.payload,
            });
        case CasesActions.API_CASE_CREATE_GROUPS_FAILED:
            return Object.assign({}, state, {
                createCaseGroupResult: action.payload,
            });

        case TasksActions.API_TASKS_SUCCESS:
            return Object.assign({}, state, {
                tasks: action.payload,
            });
        case TasksActions.API_TASKS_FAILED:
            return Object.assign({}, state, {
                tasks: action.payload,
            });

        case TasksActions.API_TASK_SUCCESS:
            return Object.assign({}, state, {
                task: action.payload,
            });
        case TasksActions.API_TASK_FAILED:
            return Object.assign({}, state, {
                task: action.payload,
            });

        case TasksActions.API_TASKS_RESULT_SUCCESS:
            return Object.assign({}, state, {
                scanResults: action.payload,
            });
        case TasksActions.API_TASKS_RESULT_FAILED:
            return Object.assign({}, state, {
                scanResults: action.payload,
            });
        case TasksActions.API_TASKS_START_SUCCESS:
            return Object.assign({}, state, {
                taskStartResult: action.payload,
            });
        case TasksActions.API_TASKS_START_FAILED:
            return Object.assign({}, state, {
                taskStartResult: action.payload,
            })

        case CasesActions.API_TOOL_CASES_SUCCESS:
            return Object.assign({}, state, {
                toolCases: action.payload,
            });
        case CasesActions.API_TOOL_CASES_FAILED:
            return Object.assign({}, state, {
                toolCases: action.payload,
            });
        case TasksActions.API_RESULT_SUCCESS:
            return Object.assign({}, state, {
                result: action.payload,
            });
        case TasksActions.API_RESULT_FAILED:
            return Object.assign({}, state, {
                result: action.payload,
            });
        default:
            return state;
    }
}

const ScpReducer = combineReducers({
    reduxResult,
});

export default ScpReducer;
