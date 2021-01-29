import {API_PROJECTS} from "../api/ScpApi";
import {getFromApi} from "../api/Fetch";

export const ProjectsActions = {
    API_PROJECTS_SUCCESS: 'API_PROJECTS_SUCCESS',
    API_PROJECTS_FAILED: 'API_PROJECTS_FAILED',
};

export const ProjectActions = {
    API_PROJECT_SUCCESS: 'API_PROJECT_SUCCESS',
    API_PROJECT_FAILED: 'API_PROJECT_FAILED',
};

export const getProjects = (data) => (dispatch) => {
    getFromApi(API_PROJECTS, ProjectsActions.API_PROJECTS_SUCCESS, ProjectsActions.API_PROJECTS_FAILED, data, dispatch);
};

export const getProject = (id, data) => (dispatch) => {
    getFromApi(API_PROJECTS + '/' + id, ProjectActions.API_PROJECT_SUCCESS, ProjectActions.API_PROJECT_SUCCESS, data, dispatch);
};
