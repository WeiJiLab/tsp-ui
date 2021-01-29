import {API_TOOLS} from "../api/ScpApi";
import {getFromApi, postFromApi} from "../api/Fetch";

export const ToolsActions = {
    API_TOOLS_SUCCESS: 'API_TOOLS_SUCCESS',
    API_TOOLS_FAILED: 'API_TOOLS_FAILED',
    API_TOOL_SUCCESS: 'API_TOOL_SUCCESS',
    API_TOOL_FAILED: 'API_TOOL_FAILED',
    API_CASE_ADD_SUCCESS: 'API_CASE_ADD_SUCCESS',
    API_CASE_ADD_FAILED: 'API_CASE_ADD_FAILED'
};

export const getTools = (data) => (dispatch) => {
    getFromApi(API_TOOLS, ToolsActions.API_TOOLS_SUCCESS, ToolsActions.API_TOOLS_FAILED, data, dispatch);
};

export const getTool = (id, data) => (dispatch) => {
    getFromApi(API_TOOLS + '/' + id, ToolsActions.API_TOOL_SUCCESS, ToolsActions.API_TOOL_FAILED, data, dispatch);
};

export const createCase = (id, data) => (dispatch) => {
    postFromApi(API_TOOLS + '/' + id + '/case', ToolsActions.API_CASE_ADD_SUCCESS, ToolsActions.API_CASE_ADD_FAILED, data, dispatch);
};



