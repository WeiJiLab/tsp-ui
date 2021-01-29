import {ProjectsActions} from "../actions/ProjectsAction";
import {combineReducers} from 'redux';
import {ToolsActions} from "../actions/ToolsAction";

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
        default:
            return state;
    }
}

const ScpReducer = combineReducers({
    reduxResult,
});

export default ScpReducer;
