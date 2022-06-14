import { FULL_STAT_FAILED, FULL_STAT_REQUEST, FULL_STAT_SUCCESSFUL } from "../constants/adminConst";

export const fullStatReducer = (state = {loading: true, stat: {}}, action) =>{
    switch(action.type){
        case FULL_STAT_REQUEST: 
            return {loading: true};
        case FULL_STAT_SUCCESSFUL:
            return {loading: false, stat: action.payload};
        case FULL_STAT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}