import axios from 'axios'
import {DRINK_LIST_REQUEST, DRINK_LIST_SUCCESSFUL, DRINK_LIST_FAILED, DRINK_DETAIL_REQUEST, DRINK_DETAIL_SUCCESSFUL, DRINK_DETAIL_FAILED} from '../constants/drinkConst'

export const listOfDrinks = () => async (dispatch) =>{
    dispatch({
        type: DRINK_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/drink/list');
        dispatch({type: DRINK_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DRINK_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};


export const detailsOfDrink = (drinkId) => async(dispatch) =>{
    dispatch({type: DRINK_DETAIL_REQUEST, payload: drinkId});
    try{
        const {data} = await axios.get(`/api/drink/${drinkId}`);
        dispatch({type: DRINK_DETAIL_SUCCESSFUL, payload: data});
    }catch(error)
    {
        dispatch({type: DRINK_DETAIL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
            //payload: error.message
        });
    }
};