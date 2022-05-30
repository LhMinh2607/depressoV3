import axios from "axios";
import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESSFUL, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESSFUL } from "../constants/NotificationConsts";

export const createNotification = (senderId, receiverId, content, type) => async (dispatch) =>{
    dispatch({
        type: ADD_NOTIFICATION_REQUEST, payload: {senderId, receiverId, content, type,}
    });
    try {
        const {data} = await axios.post(`/api/notification/add`, {senderId, receiverId, content, type,});
        dispatch({type: ADD_NOTIFICATION_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ADD_NOTIFICATION_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfNotifications = (id) => async (dispatch) =>{
    dispatch({
        type: NOTIFICATION_LIST_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/notification/user/${id}/list`);
        dispatch({type: NOTIFICATION_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: NOTIFICATION_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};