export function getFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('GET', url, ok, failed, data, dispatch, true);
}

export function postFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('POST', url, ok, failed, data, dispatch, true);
}

export function deleteFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('DELETE', url, ok, failed, data, dispatch, false);
}


function ajaxApi(METHOD, url, ok, failed, data, dispatch, haveContent) {
    fetch(url, {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
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


