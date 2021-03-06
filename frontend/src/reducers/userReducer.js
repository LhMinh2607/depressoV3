import { SEARCH_POST_REQUEST, SEARCH_POST_SUCCESSFUL } from "../constants/postConst";
import { ADD_FRIEND_FAILED, ADD_FRIEND_REQUEST, ADD_FRIEND_SUCCESSFUL, CLEAR_ALL, MESSAGE_STAT_FAILED, MESSAGE_STAT_REQUEST, MESSAGE_STAT_SUCCESSFUL, SEARCH_USER_FAILED, USER_CONVERSATION_HISTORY_FAILED, USER_CONVERSATION_HISTORY_REQUEST, USER_CONVERSATION_HISTORY_SUCCESSFUL, USER_DETAIL_BY_PHONE_FAILED, USER_DETAIL_BY_PHONE_REQUEST, USER_DETAIL_BY_PHONE_SUCCESSFUL, USER_DETAIL_FAILED, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESSFUL, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESSFUL, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESSFUL, USER_SIGNOUT, USER_SIGN_UP_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESSFUL, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESSFUL } from "../constants/userConst";


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
            return {loading: false, userInfo: action.payload, userLSP: {}};
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
            return {loading: false, users: action.payload};
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

export const messageStatReducers = (state = {loading: true, msgStat: []}, action) =>{
    switch(action.type){
        case MESSAGE_STAT_REQUEST: 
            return {loading: true};
        case MESSAGE_STAT_SUCCESSFUL:
            return {loading: false, msgStat: action.payload};
        case MESSAGE_STAT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userFriendAddingReducer = (state = {loading: true}, action) =>{
    switch(action.type){
        case ADD_FRIEND_REQUEST: 
            return {loading: true, success: false};
        case ADD_FRIEND_SUCCESSFUL:
            return {loading: false, success: true};
        case ADD_FRIEND_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userSearchReducer = (state = {loading: true, searchedUser: {}}, action) =>{
    switch(action.type){
        case SEARCH_POST_REQUEST: 
            return {loading: true};
        case SEARCH_POST_SUCCESSFUL:
            return {loading: false, searchedUser: action.payload}; 
        case SEARCH_USER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDetailByPhoneReducer = (state ={loading: true}, action)=>{
    switch(action.type){
        case USER_DETAIL_BY_PHONE_REQUEST:
            return {loading: true};
        case USER_DETAIL_BY_PHONE_SUCCESSFUL:
            return {loading: false, user: action.payload};
        case USER_DETAIL_BY_PHONE_FAILED:
            return {loading: false, error: action.payload};
        case CLEAR_ALL:
            return {};
        default:
            return state;
    }
};