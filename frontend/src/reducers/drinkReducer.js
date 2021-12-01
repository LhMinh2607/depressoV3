import { DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED, SHOW_RELATED_DRINK_REQUEST, SHOW_RELATED_DRINK_SUCCESSFUL, SHOW_RELATED_DRINK_FAILED } from "../constants/drinkConst";



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

export const relatedDrinkListReducer = (state={}, action)=>{
    switch(action.type){
        case SHOW_RELATED_DRINK_REQUEST:
            return {loading: true};
        case SHOW_RELATED_DRINK_SUCCESSFUL:
            return {loading: false, relatedDrinks: action.payload};
        case SHOW_RELATED_DRINK_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};