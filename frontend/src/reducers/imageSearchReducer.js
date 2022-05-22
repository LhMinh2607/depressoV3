import { IMAGE_LIST_FAILED, IMAGE_LIST_REQUEST, IMAGE_LIST_SUCCESSFUL, USER_IMAGE_LIST_FAILED, USER_IMAGE_LIST_REQUEST, USER_IMAGE_LIST_SUCCESSFUL } from "../constants/imageSearchConst";

export const imageSearchListReducer = (state = {loading: true, imageSearchs: []}, action) =>{
    switch(action.type){
        case IMAGE_LIST_REQUEST: 
            return {loading: true};
        case IMAGE_LIST_SUCCESSFUL:
            return {loading: false, imageSearch: action.payload};
        case IMAGE_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userImageSearchListReducer = (state = {loading: true, userImageSearchs: []}, action) =>{
    switch(action.type){
        case USER_IMAGE_LIST_REQUEST: 
            return {loading: true};
        case USER_IMAGE_LIST_SUCCESSFUL:
            return {loading: false, userImageSearch: action.payload};
        case USER_IMAGE_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}