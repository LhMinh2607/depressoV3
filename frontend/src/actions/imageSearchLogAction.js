
export const listOfImageSearchLogs = () => async (dispatch) =>{
    dispatch({
        type: IMAGE_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/imageSearch/list');
        dispatch({type: IMAGE_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: IMAGE_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};