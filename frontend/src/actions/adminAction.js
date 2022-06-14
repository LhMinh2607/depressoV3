import { FULL_STAT_FAILED, FULL_STAT_REQUEST, FULL_STAT_SUCCESSFUL } from "../constants/adminConst";
import axios from 'axios';

export const statOfEverything = () => async (dispatch) =>{
    dispatch({
        type: FULL_STAT_REQUEST
    });
    try {
        const {data} = await axios.get('/api/admin/stat');
        dispatch({type: FULL_STAT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: FULL_STAT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};