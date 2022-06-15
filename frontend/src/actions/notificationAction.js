import axios from "axios";
import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESSFUL, ALL_NOTIFICATION_LIST_FAILED, ALL_NOTIFICATION_LIST_REQUEST, ALL_NOTIFICATION_LIST_SUCCESSFUL, EDIT_NOTIFICATION_FAILED, EDIT_NOTIFICATION_REQUEST, EDIT_NOTIFICATION_SUCCESSFUL, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESSFUL } from "../constants/NotificationConsts";

export const createNotification = (senderId, receiverId, content, type, postId) => async (dispatch) =>{
    dispatch({
        type: ADD_NOTIFICATION_REQUEST, payload: {senderId, receiverId, content, type, postId}
    });
    try {
        const {data} = await axios.post(`/api/notification/add`, {senderId, receiverId, content, type, postId});
        dispatch({type: ADD_NOTIFICATION_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ADD_NOTIFICATION_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editNotification = (notifId) => async (dispatch) =>{
    dispatch({
        type: EDIT_NOTIFICATION_REQUEST, payload: {notifId}
    });
    try {
        const {data} = await axios.put(`/api/notification/edit`, {notifId});
        dispatch({type: EDIT_NOTIFICATION_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: EDIT_NOTIFICATION_FAILED, 
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

export const listOfAllNotifications = () => async (dispatch) =>{
    dispatch({
        type: ALL_NOTIFICATION_LIST_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/notification/list`);
        dispatch({type: ALL_NOTIFICATION_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: ALL_NOTIFICATION_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};