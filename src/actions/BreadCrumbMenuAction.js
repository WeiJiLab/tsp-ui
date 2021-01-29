export const BreadCrumbMenuActions = {
    SET_BREAD_CRUMB_MEU: 'SET_BREAD_CRUMB_MEU',
};

export const setBreadCrumbMenu = (data) => (dispatch) => {
    dispatch({
        type: BreadCrumbMenuActions.SET_BREAD_CRUMB_MEU,
        payload: {
            data: data
        }
    });
}
