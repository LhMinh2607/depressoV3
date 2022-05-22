import axios from 'axios'
import { USER_CONVERSATION_HISTORY_FAILED, USER_CONVERSATION_HISTORY_REQUEST, USER_CONVERSATION_HISTORY_SUCCESSFUL, USER_DETAIL_FAILED, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESSFUL, USER_LIST_FAILED, USER_LIST_REQUEST, USER_LIST_SUCCESSFUL, USER_SIGNIN_FAILED, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESSFUL, USER_SIGNOUT, USER_SIGN_UP_FAILED, USER_SIGN_UP_REQUEST, USER_SIGN_UP_SUCCESSFUL, USER_UPDATE_PROFILE_FAILED, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESSFUL } from '../constants/userConst';


export const signout = () => (dispatch) =>{
    localStorage.removeItem('userInfo');
    localStorage.clear();
    localStorage.removeItem('cartItems');
    dispatch({type: USER_SIGNOUT});
}

export const signup = (name, username, email, password, gender, dob, phoneNumber, address, occupation) => async(dispatch) =>{
    dispatch({type: USER_SIGN_UP_REQUEST, payload: {name, username, email, password, gender, dob, phoneNumber, address, occupation}});
    try {
        const {data} = await axios.post('/api/user/signup', {name, username, email, password, gender, dob, phoneNumber, address, occupation});
        dispatch({type: USER_SIGN_UP_SUCCESSFUL, payload: data});
        //dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        //localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGN_UP_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const signin = (email, password) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post('/api/user/signin', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};

export const listOfUsers = () => async (dispatch) =>{
    dispatch({
        type: USER_LIST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/user/list');
        dispatch({type: USER_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const detailsOfUser = (userId) => async(dispatch, getState) =>{
    dispatch({type: USER_DETAIL_REQUEST, payload: userId});
    const {userSignin: {userInfo}}= getState();
    try {
        const {data} = await axios.get(`/api/user/${userId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        
        dispatch({type: USER_DETAIL_SUCCESSFUL, payload: data});
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_DETAIL_FAILED, payload: message});
    }
};


export const updateUserProfile = (user) => async (dispatch, getState)=>{
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const {
        userSignin: {userInfo},
    } = getState();
   // console.log(user);
    try {
        const {data} = await axios.put(`/api/user/profile/update`, user, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESSFUL, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESSFUL, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message
        dispatch({type: USER_UPDATE_PROFILE_FAILED, payload: message});
    }
};

export const getUserConversationHistory = (id) => async(dispatch) =>{
    dispatch({type: USER_CONVERSATION_HISTORY_REQUEST, payload: {id}});
    try {
        const {data} = await axios.get(`/api/user/${id}/conversation/history`, {id});
        dispatch({type: USER_CONVERSATION_HISTORY_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: USER_CONVERSATION_HISTORY_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
};