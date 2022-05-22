import { CLEAR_ALL, USER_CONVERSATION_HISTORY_FAILED, USER_CONVERSATION_HISTORY_REQUEST, USER_CONVERSATION_HISTORY_SUCCESSFUL, USER_DETAIL_FAILED, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESSFUL, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESSFUL, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESSFUL, USER_SIGNOUT, USER_SIGN_UP_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESSFUL, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESSFUL } from "../constants/userConst";


export const userSignupReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_SIGN_UP_REQUEST:
            return {loading: true};
        case USER_SIGN_UP_SUCCESSFUL:
            return {loading: false, userInfo: action.payload};
        case USER_SIGN_UP_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userSigninReducer = (state = {}, action)=>{
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESSFUL:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAILED:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
};

export const userSignOutReducer = (state={}, action)=>{
    switch(action.type){
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
}

export const userListReducer = (state = {loading: true, users: []}, action) =>{
    switch(action.type){
        case USER_LIST_REQUEST: 
            return {loading: true};
        case USER_LIST_SUCCESSFUL:
            return {loading: false, users: action.payload}; //fixed from drinks, like wtf why didn't I change it?
        case USER_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDetailReducer = (state ={loading: true}, action)=>{
    switch(action.type){
        case USER_DETAIL_REQUEST:
            return {loading: true};
        case USER_DETAIL_SUCCESSFUL:
            return {loading: false, user: action.payload};
        case USER_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action)=>{
    switch(action.type)
    {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PROFILE_SUCCESSFUL:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_FAILED:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state;
    }    
};

export const userConversationHistoryReducer = (state = {loading: true, userCon: []}, action) =>{
    switch(action.type){
        case USER_CONVERSATION_HISTORY_REQUEST: 
            return {loading: true};
        case USER_CONVERSATION_HISTORY_SUCCESSFUL:
            return {loading: false, userCon: action.payload};
        case USER_CONVERSATION_HISTORY_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}