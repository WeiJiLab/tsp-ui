import {API_APPS} from "../api/ScpApi";
import {getFromApi} from "../api/Fetch";

export const AppsActions = {
    API_APPS_SUCCESS: 'API_APPS_SUCCESS',
    API_APPS_FAILED: 'API_APPS_FAILED',
};

export const getApps = (data) => (dispatch) => {
    getFromApi(API_APPS, AppsActions.API_APPS_SUCCESS, AppsActions.API_APPS_FAILED, data, dispatch);
};

