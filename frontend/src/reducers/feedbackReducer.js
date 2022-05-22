import { FEEDBACK_LIST_FAILED, FEEDBACK_LIST_REQUEST, FEEDBACK_LIST_SUCCESSFUL, USER_FEEDBACK_LIST_FAILED, USER_FEEDBACK_LIST_REQUEST, USER_FEEDBACK_LIST_SUCCESSFUL } from "../constants/feedbackConst";

export const feedbackListReducer = (state = {loading: true, feedbacks: []}, action) =>{
    switch(action.type){
        case FEEDBACK_LIST_REQUEST: 
            return {loading: true};
        case FEEDBACK_LIST_SUCCESSFUL:
            return {loading: false, feedbacks: action.payload};
        case FEEDBACK_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userFeedbackListReducer = (state = {loading: true, userFeedbacks: []}, action) =>{
    switch(action.type){
        case USER_FEEDBACK_LIST_REQUEST: 
            return {loading: true};
        case USER_FEEDBACK_LIST_SUCCESSFUL:
            return {loading: false, userFeedbacks: action.payload};
        case USER_FEEDBACK_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}