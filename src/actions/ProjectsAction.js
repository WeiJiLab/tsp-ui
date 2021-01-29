import {API_PROJECTS} from "../api/ScpApi";
import {deleteFromApi, getFromApi, postFromApi} from "../api/Fetch";

export const ProjectsActions = {
    API_PROJECTS_SUCCESS: 'API_PROJECTS_SUCCESS',
    API_PROJECTS_FAILED: 'API_PROJECTS_FAILED',
    API_PROJECT_CREATE_SUCCESS: 'API_PROJECT_CREATE_SUCCESS',
    API_PROJECT_CREATE_FAILED: 'API_PROJECT_CREATE_FAILED',
};

export const ProjectActions = {
    API_PROJECT_SUCCESS: 'API_PROJECT_SUCCESS',
    API_PROJECT_FAILED: 'API_PROJECT_FAILED',
};

export const AppActions = {
    API_APP_CREATE_SUCCESS: 'API_APP_CREATE_SUCCESS',
    API_APP_CREATE_FAILED: 'API_APP_CREATE_FAILED',
    API_APP_DELETE_SUCCESS: 'API_APP_DELETE_SUCCESS',
    API_APP_DELETE_FAILED: 'API_APP_DELETE_FAILED',
    API_PROJECT_DELETE_SUCCESS: 'API_PROJECT_DELETE_SUCCESS',
    API_PROJECT_DELETE_FAILED: 'API_PROJECT_DELETE_FAILED'
};

export const getProjects = (data) => (dispatch) => {
    getFromApi(API_PROJECTS, ProjectsActions.API_PROJECTS_SUCCESS, ProjectsActions.API_PROJECTS_FAILED, data, dispatch);
};

export const getProject = (id, data) => (dispatch) => {
    getFromApi(API_PROJECTS + '/' + id, ProjectActions.API_PROJECT_SUCCESS, ProjectActions.API_PROJECT_SUCCESS, data, dispatch);
};

export const createProject = (data) => (dispatch) => {
    postFromApi(API_PROJECTS, ProjectsActions.API_PROJECT_CREATE_SUCCESS, ProjectsActions.API_PROJECT_CREATE_FAILED, data, dispatch);
};

export const createApp = (projectId, data) => (dispatch) => {
    postFromApi(API_PROJECTS + '/' + projectId + "/applications", AppActions.API_APP_CREATE_SUCCESS, AppActions.API_APP_CREATE_FAILED, data, dispatch);
};

export const deleteApp = (projectId, appId, data) => (dispatch) => {
    deleteFromApi(API_PROJECTS + '/' + projectId + "/applications/" + appId, AppActions.API_APP_DELETE_SUCCESS, AppActions.API_APP_DELETE_FAILED, data, dispatch);
};


export const deleteProject = (projectId, data) => (dispatch) => {
    deleteFromApi(API_PROJECTS + '/' + projectId, AppActions.API_PROJECT_DELETE_SUCCESS, AppActions.API_PROJECT_DELETE_FAILED, data, dispatch);
};
