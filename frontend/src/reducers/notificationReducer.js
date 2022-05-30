import { ADD_NOTIFICATION_FAILED, ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESSFUL, NOTIFICATION_LIST_FAILED, NOTIFICATION_LIST_REQUEST, NOTIFICATION_LIST_SUCCESSFUL } from "../constants/NotificationConsts";

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