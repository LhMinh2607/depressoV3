import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESSFUL, ALL_NOTIFICATION_LIST_FAILED, ALL_NOTIFICATION_LIST_REQUEST, ALL_NOTIFICATION_LIST_SUCCESSFUL, EDIT_NOTIFICATION_FAILED, EDIT_NOTIFICATION_REQUEST, EDIT_NOTIFICATION_SUCCESSFUL, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESSFUL } from "../constants/NotificationConsts";

export const notificationAddingReducers = (state = {}, action)=>{
    switch(action.type){
        case ADD_NOTIFICATION_REQUEST:
            return {loading: true, sucess: false};
        case ADD_NOTIFICATION_SUCCESSFUL:
            return {loading: false, success: true};
        case ADD_NOTIFICATION_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const notificationEditingReducers = (state = {}, action)=>{
    switch(action.type){
        case EDIT_NOTIFICATION_REQUEST:
            return {loading: true, sucess: false};
        case EDIT_NOTIFICATION_SUCCESSFUL:
            return {loading: false, success: true};
        case EDIT_NOTIFICATION_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const notificationListReducers = (state = {}, action)=>{
    switch(action.type){
        case NOTIFICATION_LIST_REQUEST:
            return {loading: true};
        case NOTIFICATION_LIST_SUCCESSFUL:
            return {loading: false, notifications: action.payload};
        case NOTIFICATION_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const allNotificationListReducers = (state = {}, action)=>{
    switch(action.type){
        case ALL_NOTIFICATION_LIST_REQUEST:
            return {loading: true};
        case ALL_NOTIFICATION_LIST_SUCCESSFUL:
            return {loading: false, allNotifications: action.payload};
        case ALL_NOTIFICATION_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};