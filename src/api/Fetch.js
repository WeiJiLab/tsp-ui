
export function getFromApi(url, ok, failed, data, dispatch) {
    ajaxApi('GET', url, ok, failed, data, dispatch);
}

export function postFromApi(url, ok, failed, data, dispatch) {
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


