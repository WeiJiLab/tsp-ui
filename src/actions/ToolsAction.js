import {API_TOOLS} from "../api/ScpApi";
import {getFromApi} from "../api/Fetch";

export const ToolsActions = {
    API_TOOLS_SUCCESS: 'API_TOOLS_SUCCESS',
    API_TOOLS_FAILED: 'API_TOOLS_FAILED',
};

export const getTools = (data) => (dispatch) => {
    getFromApi(API_TOOLS, ToolsActions.API_TOOLS_SUCCESS, ToolsActions.API_TOOLS_FAILED, data, dispatch);
};

