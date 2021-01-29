import {API_PROJECTS} from "../api/ScpApi";
import {getFromApi} from "../api/Fetch";

export const ProjectsActions = {
    API_PROJECTS_SUCCESS: 'API_PROJECTS_SUCCESS',
    API_PROJECTS_FAILED: 'API_PROJECTS_FAILED',
};

export const getProjects = (data) => (dispatch) => {
    getFromApi(API_PROJECTS, ProjectsActions.API_PROJECTS_SUCCESS, ProjectsActions.API_PROJECTS_FAILED, data, dispatch);
};
