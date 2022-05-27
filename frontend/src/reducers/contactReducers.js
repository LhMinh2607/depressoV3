import { CONTACT_DETAIL_FAILED, CONTACT_DETAIL_REQUEST, CONTACT_DETAIL_SUCCESSFUL, CONTACT_EDIT_FAILED, CONTACT_EDIT_REQUEST, CONTACT_EDIT_SUCCESSFUL, CONTACT_LIST_FAILED, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESSFUL, CONTACT_REMOVE_FAILED, CONTACT_REMOVE_REQUEST, CONTACT_REMOVE_SUCCESSFUL, CONTACT_SAVE_FAILED, CONTACT_SAVE_REQUEST, CONTACT_SAVE_RESET, CONTACT_SAVE_SUCCESSFUL, CONTACT_SEARCH_FAILED, CONTACT_SEARCH_REQUEST, CONTACT_SEARCH_SUCCESSFUL } from "../constants/CallConsts";


export const contactSavingReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case CONTACT_SAVE_REQUEST:
            return {loading: true, contact: {}};
        case CONTACT_SAVE_SUCCESSFUL:
            return {loading: false, contact: action.payload};
        case CONTACT_SAVE_FAILED:
            return {loading: false, error: action.payload};
        case CONTACT_SAVE_RESET:
            return {};
        default:
            return state;
    }
}

export const contactListReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case CONTACT_LIST_REQUEST:
            return {loading: true, contacts: {}};
        case CONTACT_LIST_SUCCESSFUL:
            return {loading: false, contacts: action.payload};
        case CONTACT_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const contactDetailReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case CONTACT_DETAIL_REQUEST:
            return {loading: true, contactInfo: {}};
        case CONTACT_DETAIL_SUCCESSFUL:
            return {loading: false, contactInfo: action.payload};
        case CONTACT_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const contactEditingReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case CONTACT_EDIT_REQUEST:
            return {loading: true, contact: {}};
        case CONTACT_EDIT_SUCCESSFUL:
            return {loading: false, editedContact: action.payload};
        case CONTACT_EDIT_FAILED:
            return {loading: false, error: action.payload};
        case CONTACT_SAVE_RESET:
            return {};
        default:
            return state;
    }
}

export const contactRemovingReducer = (state = {loading: false}, action) =>{
    switch(action.type){
        case CONTACT_REMOVE_REQUEST:
            return {loading: true, success: false};
        case CONTACT_REMOVE_SUCCESSFUL:
            return {loading: false, sucess: true};
        case CONTACT_REMOVE_FAILED:
            return {loading: false, error: action.payload};
        case CONTACT_SAVE_RESET:
            return {};
        default:
            return state;
    }
}

export const contactSearchingReducer = (state = {loading: false, results: {}}, action) =>{
    switch(action.type){
        case CONTACT_SEARCH_REQUEST:
            return {loading: true, results: {}};
        case CONTACT_SEARCH_SUCCESSFUL:
            return {loading: false, results: action.payload};
        case CONTACT_SEARCH_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}