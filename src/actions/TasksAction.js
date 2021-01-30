import {API_SCAN_RESULT, API_SCAN_TASK} from "../api/ScpApi";
import {getFromApi, postFromApi} from "../api/Fetch";

export const TasksActions = {
    API_TASKS_SUCCESS: 'API_TASKS_SUCCESS',
    API_TASKS_FAILED: 'API_TASKS_FAILED',
    API_TASKS_RESULT_SUCCESS: 'API_TASKS_RESULT_SUCCESS',
    API_TASKS_RESULT_FAILED: 'API_TASKS_RESULT_FAILED',
    API_TASKS_START_SUCCESS: 'API_TASKS_START_SUCCESS',
    API_TASKS_START_FAILED: 'API_TASKS_START_FAILED',
    API_TASK_SUCCESS: 'API_TASK_SUCCESS',
    API_TASK_FAILED: 'API_TASK_FAILED',
};

export const getScanResults = (appId, data) => (dispatch) => {
    getFromApi(API_SCAN_RESULT + '/' + appId, TasksActions.API_TASKS_RESULT_SUCCESS, TasksActions.API_TASKS_RESULT_FAILED, data, dispatch);
};

export const getScanTasks = (searchRequest, data) => (dispatch) => {
    let params = '';
    params += searchRequest.toolId === undefined ? '' : '&toolId=' + searchRequest.toolId;
    params += searchRequest.projectId === undefined ? '' : '&projectId=' + searchRequest.projectId;
    params += searchRequest.appId === undefined ? '' : '&appId=' + searchRequest.appId;
    params += searchRequest.useCaseId === undefined ? '' : '&useCaseId=' + searchRequest.useCaseId;
    getFromApi(API_SCAN_TASK + '?' + params, TasksActions.API_TASKS_SUCCESS, TasksActions.API_TASKS_FAILED, data, dispatch);
};

export const getScanTask = (id, data) => (dispatch) => {
    getFromApi(API_SCAN_TASK + '/' + id, TasksActions.API_TASK_SUCCESS, TasksActions.API_TASK_FAILED, data, dispatch);
};

export const startTask = (data) => (dispatch) => {
    postFromApi(API_SCAN_TASK, TasksActions.API_TASKS_START_SUCCESS, TasksActions.API_TASKS_START_FAILED, data, dispatch);
};


export class getResults {
}
