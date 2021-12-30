import { CATEGORY_LIST_FAILED, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESSFUL } from "../constants/categoryConst";


export const categoryListReducer = (state = {loading: true, categories: []}, action) =>{
    switch(action.type){
        case CATEGORY_LIST_REQUEST: 
            return {loading: true};
        case CATEGORY_LIST_SUCCESSFUL:
            return {loading: false, categories: action.payload};
        case CATEGORY_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}