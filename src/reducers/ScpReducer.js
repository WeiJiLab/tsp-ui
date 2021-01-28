import {ProjectsActions} from "../actions/ProjectsAction";
import {combineReducers} from 'redux';

const initialState = {
    projects: {
        status: false,
        message: null,
        data: []
    }
};

export function reduxResult(state = initialState, action) {
    switch (action.type) {
        case ProjectsActions.API_PROJECTS_SUCCESS:
            return Object.assign({}, state, {
                projects: action.payload,
            });
        case ProjectsActions.API_PROJECTS_FAILED:
            return Object.assign({}, state, {
                projects: action.payload,
            });
        default:
            return state;
    }
}

const ScpReducer = combineReducers({
    reduxResult,
});

export default ScpReducer;
