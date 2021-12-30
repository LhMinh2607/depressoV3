import { CATEGORY_LIST_FAILED, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESSFUL } from "../constants/categoryConst";
import axios from 'axios';

export const listOfCategories = () => async (dispatch) =>{
    dispatch({
        type: CATEGORY_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/category/list');
        dispatch({type: CATEGORY_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: CATEGORY_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};