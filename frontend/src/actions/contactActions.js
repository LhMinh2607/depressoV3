import axios from 'axios';
// import JsSIP from "jssip";
import { CONTACT_DETAIL_FAILED, CONTACT_DETAIL_REQUEST, CONTACT_DETAIL_SUCCESSFUL, CONTACT_EDIT_FAILED, CONTACT_EDIT_REQUEST, CONTACT_EDIT_SUCCESSFUL, CONTACT_LIST_FAILED, CONTACT_LIST_REQUEST, CONTACT_LIST_SUCCESSFUL, CONTACT_REMOVE_FAILED, CONTACT_REMOVE_REQUEST, CONTACT_REMOVE_SUCCESSFUL, CONTACT_SAVE_FAILED, CONTACT_SAVE_REQUEST, CONTACT_SAVE_SUCCESSFUL, CONTACT_SEARCH_FAILED, CONTACT_SEARCH_REQUEST, CONTACT_SEARCH_SUCCESSFUL } from '../constants/CallConsts';

export const getAllContact = () => async (dispatch) =>{
    dispatch({type: CONTACT_LIST_REQUEST});
    try{
        const {data} = await axios.get(`/api/contact/`);
        dispatch({type: CONTACT_LIST_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const saveAContact = (phoneNumber, name) => async (dispatch) =>{
    dispatch({type: CONTACT_SAVE_REQUEST, payload: {phoneNumber, name}});
    try{
        const {data} = await axios.post(`/api/contact/save`, {phoneNumber, name});
        dispatch({type: CONTACT_SAVE_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_SAVE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const getAContact = (num) => async (dispatch) =>{
    dispatch({type: CONTACT_DETAIL_REQUEST, phoneNumber: num});
    try{
        const {data} = await axios.get(`/api/contact/number/${num}`);
        dispatch({type: CONTACT_DETAIL_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_DETAIL_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editAContact = (phoneNumber, name, id) => async (dispatch) =>{
    dispatch({type: CONTACT_EDIT_REQUEST, payload: {phoneNumber, name, id}});
    try{
        const {data} = await axios.put(`/api/contact/edit/${id}`, {phoneNumber, name, id});
        dispatch({type: CONTACT_EDIT_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_EDIT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const removeAContact = (id) => async (dispatch) =>{
    dispatch({type: CONTACT_REMOVE_REQUEST, payload: {id}});
    try{
        const {data} = await axios.put(`/api/contact/remove/${id}`);
        dispatch({type: CONTACT_REMOVE_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_REMOVE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const searchContact = (keyword) => async (dispatch) =>{
    dispatch({type: CONTACT_SEARCH_REQUEST, payload: {keyword}});
    try{
        const {data} = await axios.get(`/api/contact/search/${keyword}`);
        dispatch({type: CONTACT_SEARCH_SUCCESSFUL, payload: data});
    }catch(error){
        dispatch({type: CONTACT_SEARCH_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};