import {API_SCAN_RESULT, API_SCAN_TASK} from "../api/ScpApi";
import {getFromApi, postFromApi} from "../api/Fetch";

export const TasksActions = {
    API_TASKS_SUCCESS: 'API_TASKS_SUCCESS',
    API_TASKS_FAILED: 'API_TASKS_FAILED',
    API_TASKS_RESULT_SUCCESS: 'API_TASKS_RESULT_SUCCESS',
    API_TASKS_RESULT_FAILED: 'API_TASKS_RESULT_FAILED',
    API_TASKS_START_SUCCESS: 'API_TASKS_START_SUCCESS',
    API_TASKS_START_FAILED: 'API_TASKS_START_FAILED',
};

export const getResults = (appId, data) => (dispatch) => {
    getFromApi(API_SCAN_RESULT + '/' + appId, TasksActions.API_TASKS_RESULT_SUCCESS, TasksActions.API_TASKS_RESULT_FAILED, data, dispatch);
};

export const getTasks = (data) => (dispatch) => {
    getFromApi(API_SCAN_TASK, TasksActions.API_TASKS_SUCCESS, TasksActions.API_TASKS_FAILED, data, dispatch);
};

export const startTask = (data) => (dispatch) => {
    postFromApi(API_SCAN_TASK, TasksActions.API_TASKS_START_SUCCESS, TasksActions.API_TASKS_START_FAILED, data, dispatch);
};



