import cookie from "react-cookies";
import {DIA_LOGIN_PAGE} from "./ScpApi";

export function getFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('GET', url, ok, failed, data, dispatch, true);
}

export function postFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('POST', url, ok, failed, data, dispatch, true);
}

export function deleteFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('DELETE', url, ok, failed, data, dispatch, false);
}

export function putFromApi(url, ok, failed, data, dispatch) {
    const token = cookie.load('jwt_token');
    fetch(url, {
        method: 'PUT',
        body: data,
        headers:{
            'Authorization':decodeURI(token),
        }
    })
        .then(response => {
            if (!response.ok) {
                if(response.status===401){
                    window.location.href = DIA_LOGIN_PAGE;
                }
                response.json().then(data => {
                    console.log("!ok:", data);
                    dispatch({
                        type: failed,
                        payload: {
                            status: false,
                            message: data.message,
                            data: []
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
                    data: []
                }
            })
        });
}


function ajaxApi(METHOD, url, ok, failed, data, dispatch, haveContent) {
    const token = cookie.load('jwt_token');
    fetch(url, {
        method: METHOD,
        headers: {
            'Authorization':decodeURI(token),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                if(response.status===401){
                    window.location.href = DIA_LOGIN_PAGE;
                }
                if (haveContent) {
                    response.json().then(data => {
                        console.log("!ok:", data);
                        dispatch({
                            type: failed,
                            payload: {
                                status: false,
                                message: data.message,
                                data: []
                            }
                        });
                    });
                } else {
                    dispatch({
                        type: failed,
                        payload: {
                            status: false,
                            message: url,
                            data: null
                        }
                    });
                }
            } else {
                if (haveContent) {
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
                } else {
                    dispatch({
                        type: ok,
                        payload: {
                            status: true,
                            message: url,
                            data: null
                        }
                    });
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            dispatch({
                type: failed,
                payload: {
                    status: false,
                    message: error.message,
                    data: []
                }
            })
        });
}


