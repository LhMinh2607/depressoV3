import axios from 'axios';
import { CREATE_POST_COMMENT_FAILED, CREATE_POST_COMMENT_REQUEST, CREATE_POST_COMMENT_SUCCESSFUL, CREATE_POST_FAILED, CREATE_POST_REQUEST, CREATE_POST_SUCCESSFUL, DELETE_POST_COMMENT_FAILED, DELETE_POST_COMMENT_REQUEST, DELETE_POST_COMMENT_SUCCESSFUL, DELETE_POST_FAILED, DELETE_POST_REQUEST, DELETE_POST_SUCCESSFUL, EDIT_POST_COMMENT_FAILED, EDIT_POST_COMMENT_REQUEST, EDIT_POST_COMMENT_SUCCESSFUL, EDIT_POST_FAILED, EDIT_POST_REQUEST, EDIT_POST_SUCCESSFUL, FILTER_TOPIC_FAILED, FILTER_TOPIC_REQUEST, FILTER_TOPIC_SUCCESSFUL, GET_HOME_POSTS_FAILED, GET_HOME_POSTS_REQUEST, GET_HOME_POSTS_SUCCESSFUL, NESTED_POST_LIST_FAILED, NESTED_POST_LIST_REQUEST, NESTED_POST_LIST_SUCCESSFUL, PIN_TO_HOME_FAILED, PIN_TO_HOME_REQUEST, PIN_TO_HOME_SUCCESSFUL, POST_ACCUMULATE_FAILED, POST_ACCUMULATE_REQUEST, POST_ACCUMULATE_SUCCESSFUL, POST_ADD_KEYWORD_FAILED, POST_ADD_KEYWORD_REQUEST, POST_ADD_KEYWORD_SUCCESSFUL, POST_COMMENT_LIST_FAILED, POST_COMMENT_LIST_REQUEST, POST_COMMENT_LIST_SUCCESSFUL, POST_DETAILS_FAILED, POST_DETAILS_REQUEST, POST_DETAILS_SUCCESSFUL, POST_REMOVE_KEYWORD_FAILED, POST_REMOVE_KEYWORD_REQUEST, POST_REMOVE_KEYWORD_SUCCESSFUL, POST_STAT_FAILED, POST_STAT_PER_USER_FAILED, POST_STAT_PER_USER_REQUEST, POST_STAT_PER_USER_SUCCESSFUL, POST_STAT_REQUEST, POST_STAT_SUCCESSFUL, RELATED_POST_LIST_FAILED, RELATED_POST_LIST_REQUEST, RELATED_POST_LIST_SUCCESSFUL, SEARCH_POST_FAILED, SEARCH_POST_REQUEST, SEARCH_POST_SUCCESSFUL, SHOW_POST_BY_CAT_FAILED, SHOW_POST_BY_CAT_REQUEST, SHOW_POST_BY_CAT_SUCCESSFUL, SHOW_POST_FAILED, SHOW_POST_REQUEST, SHOW_POST_SUCCESSFUL, SORT_POST_FAILED, SORT_POST_REQUEST, SORT_POST_SUCCESSFUL } from '../constants/postConst';
// import socketIOClient from "socket.io-client";

export const createPost = (userId, title, content, category) => async (dispatch) =>{
    dispatch({
        type: CREATE_POST_REQUEST, payload: {userId, title, content, category}
    });
    try {
        const {data} = await axios.post('/api/forum/create_post', {userId, title, content, category});
        dispatch({type: CREATE_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: CREATE_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editPost = (postId, title, content, category) => async (dispatch) =>{
    dispatch({
        type: EDIT_POST_REQUEST, payload: {postId, title, content}
    });
    try {
        const {data} = await axios.put(`/api/forum/edit_post`, {postId, title, content, category});
        dispatch({type: EDIT_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: EDIT_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const deletePost = (postId) => async (dispatch) =>{
    dispatch({
        type: DELETE_POST_REQUEST, payload: {postId}
    });
    try {
        const {data} = await axios.put(`/api/forum/delete_post/${postId}`);
        dispatch({type: DELETE_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DELETE_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const createPostComment = (postId, userId, replyContent) => async (dispatch) =>{
    dispatch({
        type: CREATE_POST_COMMENT_REQUEST, payload: {postId, userId, replyContent}
    });
    try {
        const {data} = await axios.post(`/api/forum/post/${postId}/reply`, {userId, replyContent});
        dispatch({type: CREATE_POST_COMMENT_SUCCESSFUL, payload: data});
        
    } catch (error) {
        dispatch({type: CREATE_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const editPostComment = (postId, commentId, replyContent) => async (dispatch) =>{
    dispatch({
        type: EDIT_POST_COMMENT_REQUEST, payload: {postId, commentId, replyContent}
    });
    try {
        const {data} = await axios.put(`/api/forum/post/${postId}/edit_reply`, {commentId, replyContent});
        dispatch({type: EDIT_POST_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: EDIT_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const deletePostComment = (postId, commentId) => async (dispatch) =>{
    dispatch({
        type: DELETE_POST_COMMENT_REQUEST, payload: {postId, commentId}
    });
    try {
        const {data} = await axios.put(`/api/forum/post/${postId}/delete_reply`, {commentId});
        dispatch({type: DELETE_POST_COMMENT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: DELETE_POST_COMMENT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

// export const listOfPostComments = (postId) => async (dispatch) =>{
//     dispatch({
//         type: POST_COMMENT_LIST_REQUEST, payload: postId
//     });
//     try {
//         const {data} = await axios.get(`/api/forum/post/${postId}/get_replies`);
//         dispatch({type: POST_COMMENT_LIST_SUCCESSFUL, payload: data});
//     } catch (error) {
//         dispatch({type: POST_COMMENT_LIST_FAILED, 
//             payload: error.response 
//             && error.response.data.message 
//             ? error.response.data.message
//             : error.message,});
//     }
// };

export const listOfPosts = () => async (dispatch) =>{
    dispatch({
        type: SHOW_POST_REQUEST
    });
    try {
        const {data} = await axios.get('/api/forum');
        dispatch({type: SHOW_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SHOW_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSortedPosts = (topic, sorting) => async (dispatch) =>{
    dispatch({
        type: SORT_POST_REQUEST, payload: {topic, sorting}
    });
    try {
        const {data} = await axios.get(`/api/forum/sort/${sorting}/filter/${topic}`);
        dispatch({type: SORT_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SORT_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfFilteredPosts = (topic, time) => async (dispatch) =>{
    dispatch({
        type: FILTER_TOPIC_REQUEST, payload: {topic, time}
    });
    try {
        const {data} = await axios.get(`/api/forum/filter/${topic}/sort/${time}`);
        dispatch({type: FILTER_TOPIC_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: FILTER_TOPIC_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfSearchedPosts = (keyword) => async (dispatch) =>{
    dispatch({
        type: SEARCH_POST_REQUEST, payload: {keyword}
    });
    try {
        const {data} = await axios.get(`/api/forum/search/${keyword}`);
        dispatch({type: SEARCH_POST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SEARCH_POST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const detailsOfPost = (postId) => async (dispatch) =>{
    dispatch({
        type: POST_DETAILS_REQUEST, payload: {postId}
    });
    try {
        const {data} = await axios.get(`/api/forum/post/${postId}`);
        // const socket = socketIOClient(process.env.ENDPOINT);
        // socket.on("getLatestPostInfo", data => {
        //     setTimeout(()=>{
        //         dispatch({type: POST_DETAILS_SUCCESSFUL, payload: data});
        //         // socket.disconnect();
        //     }, 1000);
        // });
        localStorage.setItem('userLSP', JSON.stringify(data));
        dispatch({type: POST_DETAILS_SUCCESSFUL, payload: data});
        
    } catch (error) {
        dispatch({type: POST_DETAILS_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const addKeywordToPost = (postId, keywordContent) =>async(dispatch) => {
    dispatch({
        type: POST_ADD_KEYWORD_REQUEST, payload: {postId, keywordContent}
    });
    try {
        //alert(`/api/forum/keyword/add/${postId}`);
        const {data} = await axios.put(`/api/forum/keyword/add/${postId}`, {postId, keywordContent});
        
        dispatch({type: POST_ADD_KEYWORD_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: POST_ADD_KEYWORD_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const removeKeywordFromPost = (postId, keyword) =>async(dispatch) => {
    dispatch({
        type: POST_REMOVE_KEYWORD_REQUEST, payload: {postId, keyword}
    });
    try {
        const {data} = await axios.put(`/api/forum/keyword/remove/${postId}`, {postId, keyword});
        dispatch({type: POST_REMOVE_KEYWORD_SUCCESSFUL, payload: data});
    } catch (error) {
            dispatch({type: POST_REMOVE_KEYWORD_FAILED,
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,
        });
    }
}

export const listOfNestedPosts = (postId) => async (dispatch) =>{
    dispatch({
        type: NESTED_POST_LIST_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/forum/post/${postId}/nested`);
        dispatch({type: NESTED_POST_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: NESTED_POST_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfRelatedPosts = (postId) => async (dispatch) =>{
    dispatch({
        type: RELATED_POST_LIST_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/forum/post/${postId}/related`);
        dispatch({type: RELATED_POST_LIST_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: RELATED_POST_LIST_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfPostsByCat = (categoryId) => async (dispatch) =>{
    dispatch({
        type: SHOW_POST_BY_CAT_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/forum/post/category/${categoryId}`);
        dispatch({type: SHOW_POST_BY_CAT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: SHOW_POST_BY_CAT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const pinPostToHome = (postId) => async (dispatch) =>{
    dispatch({
        type: PIN_TO_HOME_REQUEST, payload: {postId}
    });
    try {
        const {data} = await axios.put(`/api/forum/pin_to_home/${postId}`, {postId});
        dispatch({type: PIN_TO_HOME_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: PIN_TO_HOME_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const listOfPostsInHome = () => async (dispatch) =>{
    dispatch({
        type: GET_HOME_POSTS_REQUEST
    });
    try {
        const {data} = await axios.get('/api/forum/homepost');
        dispatch({type: GET_HOME_POSTS_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: GET_HOME_POSTS_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const statOfUserPosts = (id) => async (dispatch) =>{
    dispatch({
        type: POST_STAT_PER_USER_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/forum/postby/${id}`);
        dispatch({type: POST_STAT_PER_USER_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: POST_STAT_PER_USER_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const statOfAllPosts = (id) => async (dispatch) =>{
    dispatch({
        type: POST_STAT_REQUEST
    });
    try {
        const {data} = await axios.get(`/api/forum/postStat`);
        dispatch({type: POST_STAT_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: POST_STAT_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};

export const accumulatePost = (userId, postId, type) => async (dispatch) =>{
    dispatch({
        type: POST_ACCUMULATE_REQUEST, payload: {userId, postId, type}
    });
    try {
        const {data} = await axios.put('/api/forum/accumulatePost', {userId, postId, type});
        dispatch({type: POST_ACCUMULATE_SUCCESSFUL, payload: data});
    } catch (error) {
        dispatch({type: POST_ACCUMULATE_FAILED, 
            payload: error.response 
            && error.response.data.message 
            ? error.response.data.message
            : error.message,});
    }
};