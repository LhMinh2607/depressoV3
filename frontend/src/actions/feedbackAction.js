import axios from "axios";
import { FEEDBACK_LIST_FAILED, FEEDBACK_LIST_REQUEST, FEEDBACK_LIST_SUCCESSFUL } from "../constants/feedbackConst";

export const listOfFeedbacks = () => async (dispatch) =>{
    dispatch({
        type: FEEDBACK_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/feedback/list');
        dispatch({type: FEEDBACK_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: FEEDBACK_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};