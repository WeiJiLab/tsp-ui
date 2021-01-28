import {API_PROJECTS} from "../api/ScpApi";

export const ProjectsActions = {
    API_PROJECTS_SUCCESS: 'API_PROJECTS_SUCCESS',
    API_PROJECTS_FAILED: 'API_PROJECTS_FAILED',
};

export const getProjects = (data) => (dispatch) => {
    getFromApi(API_PROJECTS, ProjectsActions.API_PROJECTS_SUCCESS, ProjectsActions.API_PROJECTS_FAILED, data, dispatch);
};

function getFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('GET', url, ok, failed, data, dispatch);
}

function postFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('POST', url, ok, failed, data, dispatch);
}


function ajaxApi(METHOD, url, ok, failed, data, dispatch) {
    fetch(url, {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                response.text().then(data => {
                    console.log("!ok:", data);
                    dispatch({
                        type: failed,
                        payload: {
                            status: false,
                            message: data.message,
                            data: null
                        }
                    });
                });
            } else {
                response.json().then(data => {
                    console.log("ok:", data);
                    dispatch({
                        type: ok,
                        payload: {
                            status: true,
                            message: data.message,
                            data: data
                        }
                    });
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            dispatch({
                type: failed,
                payload: {
                    status: false,
                    message: error.message,
                    data: null
                }
            })
        });
}


