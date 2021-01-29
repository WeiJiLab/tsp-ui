import {AppActions, ProjectActions, ProjectsActions} from "../actions/ProjectsAction";
import {combineReducers} from 'redux';
import {ToolsActions} from "../actions/ToolsAction";
import {BreadCrumbMenuActions} from "../actions/BreadCrumbMenuAction";

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
    project: {
        status: false,
        message: null,
        data: []
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
    deleteAppResult: {
        status: false,
        message: null,
        data: {}
    }, deleteProjectResult: {
        status: false,
        message: null,
        data: {}
    }, breadCrumbMenus: {
        data: []
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
        case ProjectActions.API_PROJECT_SUCCESS:
            return Object.assign({}, state, {
                project: action.payload,
            });
        case ProjectActions.API_PROJECT_FAILED:
            return Object.assign({}, state, {
                project: action.payload,
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

        default:
            return state;
    }
}

const ScpReducer = combineReducers({
    reduxResult,
});

export default ScpReducer;
