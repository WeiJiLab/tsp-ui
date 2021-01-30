import {API_CASE_GROUP, API_CASES} from "../api/ScpApi";
import {deleteFromApi, getFromApi, postFromApi} from "../api/Fetch";

export const CasesActions = {
    API_CASE_CREATE_SUCCESS: 'API_CASE_CREATE_SUCCESS',
    API_CASE_CREATE_FAILED: 'API_CASE_CREATE_FAILED',
    API_CASE_DELETE_SUCCESS: 'API_CASE_DELETE_SUCCESS',
    API_CASE_DELETE_FAILED: 'API_CASE_DELETE_FAILED',
    API_CASE_SUCCESS: 'API_CASE_SUCCESS',
    API_CASE_FAILED: 'API_CASE_FAILED',
    API_CASES_SUCCESS: 'API_CASES_SUCCESS',
    API_CASES_FAILED: 'API_CASES_FAILED',

    API_CASE_CREATE_GROUPS_SUCCESS: 'API_CASE_CREATE_GROUPS_SUCCESS',
    API_CASE_CREATE_GROUPS_FAILED: 'API_CASE_CREATE_GROUPS_FAILED',
    API_CASE_GROUP_DELETE_SUCCESS: 'API_CASE_GROUP_DELETE_SUCCESS',
    API_CASE_GROUP_DELETE_FAILED: 'API_CASE_GROUP_DELETE_FAILED',
    API_CASE_GROUP_SUCCESS: 'API_CASE_GROUP_SUCCESS',
    API_CASE_GROUP_FAILED: 'API_CASE_GROUP_FAILED',
    API_CASE_GROUPS_SUCCESS: 'API_CASE_GROUPS_SUCCESS',
    API_CASE_GROUPS_FAILED: 'API_CASE_GROUPS_FAILED',

};

export const createCase = (data) => (dispatch) => {
    postFromApi(API_CASES, CasesActions.API_CASE_CREATE_SUCCESS, CasesActions.API_CASE_CREATE_FAILED, data, dispatch);
};

export const getCases = (data) => (dispatch) => {
    getFromApi(API_CASES, CasesActions.API_CASES_SUCCESS, CasesActions.API_CASES_FAILED, data, dispatch);
};

export const getCase = (id, data) => (dispatch) => {
    getFromApi(API_CASES + '/' + id, CasesActions.API_CASE_SUCCESS, CasesActions.API_CASE_FAILED, data, dispatch);
};

export const deleteCase = (id, data) => (dispatch) => {
    deleteFromApi(API_CASES + '/' + id, CasesActions.API_CASE_DELETE_SUCCESS, CasesActions.API_CASE_DELETE_FAILED, data, dispatch);
};

export const createCaseGroup = (data) => (dispatch) => {
    postFromApi(API_CASE_GROUP, CasesActions.API_CASE_CREATE_GROUPS_SUCCESS, CasesActions.API_CASE_CREATE_GROUPS_FAILED, data, dispatch);
};

export const getCaseGroups = (data) => (dispatch) => {
    getFromApi(API_CASE_GROUP, CasesActions.API_CASE_GROUPS_SUCCESS, CasesActions.API_CASE_GROUPS_FAILED, data, dispatch);
};

export const getCaseGroup = (id, data) => (dispatch) => {
    getFromApi(API_CASE_GROUP + '/' + id, CasesActions.API_CASE_GROUP_SUCCESS, CasesActions.API_CASE_GROUP_FAILED, data, dispatch);
};

export const deleteCaseGroups = (id, data) => (dispatch) => {
    deleteFromApi(API_CASE_GROUP + '/' + id, CasesActions.API_CASE_GROUP_DELETE_SUCCESS, CasesActions.API_CASE_GROUP_DELETE_FAILED, data, dispatch);
};


