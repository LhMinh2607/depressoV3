import { DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED } from "../constants/drinkConst";



export const drinkListReducer = (state = {loading: true, drinks: []}, action) =>{
    switch(action.type){
        case DRINK_LIST_REQUEST: 
            return {loading: true};
        case DRINK_LIST_SUCCESSFUL:
            return {loading: false, drinks: action.payload};
        case DRINK_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const drinksDetailReducer = (
    state = { loading: true, drink: {}}, 
    action) => {
    switch (action.type){
        case DRINK_DETAIL_REQUEST:
            return {loading: true};
        case DRINK_DETAIL_SUCCESSFUL:
            return {loading: false, drink: action.payload};
        case DRINK_DETAIL_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};