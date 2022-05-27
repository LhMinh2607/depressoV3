import {  CREATE_POST_COMMENT_FAILED, 
    CREATE_POST_COMMENT_REQUEST, 
    CREATE_POST_COMMENT_SUCCESSFUL, 
    CREATE_POST_FAILED, 
    CREATE_POST_REQUEST, 
    CREATE_POST_SUCCESSFUL,   
    DELETE_POST_COMMENT_FAILED,   
    DELETE_POST_COMMENT_REQUEST,   
    DELETE_POST_COMMENT_SUCCESSFUL,   
    DELETE_POST_FAILED,  
    DELETE_POST_REQUEST,  
    DELETE_POST_SUCCESSFUL,   
    EDIT_POST_COMMENT_FAILED,   
    EDIT_POST_COMMENT_REQUEST,   
    EDIT_POST_COMMENT_SUCCESSFUL,   
    EDIT_POST_FAILED,   
    EDIT_POST_REQUEST,   
    EDIT_POST_SUCCESSFUL,   
    FILTER_TOPIC_FAILED,   
    FILTER_TOPIC_REQUEST,   
    FILTER_TOPIC_SUCCESSFUL,   
    GET_HOME_POSTS_FAILED,   
    GET_HOME_POSTS_REQUEST,   
    GET_HOME_POSTS_SUCCESSFUL,   
    NESTED_POST_LIST_FAILED,   
    NESTED_POST_LIST_REQUEST,   
    NESTED_POST_LIST_SUCCESSFUL,   
    PIN_FAILED,   
    PIN_REQUEST,   
    PIN_SUCCESSFUL,   
    PIN_TO_HOME_FAILED,   
    PIN_TO_HOME_REQUEST,   
    PIN_TO_HOME_SUCCESSFUL,   
    POST_ADD_KEYWORD_FAILED,   
    POST_ADD_KEYWORD_REQUEST,   
    POST_ADD_KEYWORD_SUCCESSFUL,   
    POST_DETAILS_FAILED, 
    POST_DETAILS_REQUEST, 
    POST_DETAILS_SUCCESSFUL, 
    POST_REMOVE_KEYWORD_FAILED, 
    POST_REMOVE_KEYWORD_REQUEST, 
    POST_REMOVE_KEYWORD_SUCCESSFUL, 
    POST_STAT_PER_USER_FAILED, 
    POST_STAT_PER_USER_REQUEST, 
    POST_STAT_PER_USER_SUCCESSFUL, 
    RELATED_POST_LIST_FAILED, 
    RELATED_POST_LIST_REQUEST, 
    RELATED_POST_LIST_SUCCESSFUL, 
    SEARCH_POST_FAILED, 
    SEARCH_POST_REQUEST, 
    SEARCH_POST_SUCCESSFUL, 
    SHOW_POST_BY_CAT_FAILED, 
    SHOW_POST_BY_CAT_REQUEST, 
    SHOW_POST_BY_CAT_SUCCESSFUL, 
    SHOW_POST_FAILED, 
    SHOW_POST_REQUEST, 
    SHOW_POST_SUCCESSFUL, 
    SORT_POST_FAILED, 
    SORT_POST_REQUEST,
    SORT_POST_SUCCESSFUL} from "../constants/postConst";


export const postCreatingReducers = (state = {}, action)=>{
    switch(action.type){
        case CREATE_POST_REQUEST:
            return {loading: true};
        case CREATE_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case CREATE_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postEditingReducers = (state = {}, action)=>{
    switch(action.type){
        case EDIT_POST_REQUEST:
            return {loading: true};
        case EDIT_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case EDIT_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postDeletingReducers = (state = {}, action)=>{
    switch(action.type){
        case DELETE_POST_REQUEST:
            return {loading: true};
        case DELETE_POST_SUCCESSFUL:
            return {loading: false, success: true};
        case DELETE_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postListReducers = (state = {}, action)=>{
    switch(action.type){
        case SHOW_POST_REQUEST:
            return {loading: true};
        case SHOW_POST_SUCCESSFUL:
            return {loading: false, posts: action.payload};
        case SHOW_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postDetailsReducers = (state = {}, action)=>{
    switch(action.type){
        case POST_DETAILS_REQUEST:
            return {loading: true};
        case POST_DETAILS_SUCCESSFUL:
            return {loading: false, post: action.payload};
        case POST_DETAILS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentPostingReducers = (state = {}, action)=>{
    switch(action.type){
        case CREATE_POST_COMMENT_REQUEST:
            return {loading: true};
        case CREATE_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case CREATE_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentEditingReducers = (state = {}, action)=>{
    switch(action.type){
        case EDIT_POST_COMMENT_REQUEST:
            return {loading: true};
        case EDIT_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case EDIT_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postCommentDeletingReducers = (state = {}, action)=>{
    switch(action.type){
        case DELETE_POST_COMMENT_REQUEST:
            return {loading: true};
        case DELETE_POST_COMMENT_SUCCESSFUL:
            return {loading: false, success: true};
        case DELETE_POST_COMMENT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postSearchingReducers = (state = {}, action)=>{
    switch(action.type){
        case SEARCH_POST_REQUEST:
            return {loading: true};
        case SEARCH_POST_SUCCESSFUL:
            return {loading: false, searchedPosts: action.payload};
        case SEARCH_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postSortingReducers = (state = {}, action)=>{
    switch(action.type){
        case SORT_POST_REQUEST:
            return {loading: true};
        case SORT_POST_SUCCESSFUL:
            return {loading: false, sortedPosts: action.payload};
        case SORT_POST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postFilteringReducers = (state = {}, action)=>{
    switch(action.type){
        case FILTER_TOPIC_REQUEST:
            return {loading: true};
        case FILTER_TOPIC_SUCCESSFUL:
            return {loading: false, filteredPosts: action.payload};
        case FILTER_TOPIC_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postKeywordsAddingReducer = (state={}, action)=>{
    switch(action.type){
        case POST_ADD_KEYWORD_REQUEST:
            return {loading: true};
        case POST_ADD_KEYWORD_SUCCESSFUL:
            return {loading: false, success: true};
        case POST_ADD_KEYWORD_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const postKeywordsRemovingReducer = (state={}, action)=>{
    switch(action.type){
        case POST_REMOVE_KEYWORD_REQUEST:
            return {loading: true};
        case POST_REMOVE_KEYWORD_SUCCESSFUL:
            return {loading: false, success: true};
        case POST_REMOVE_KEYWORD_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const nestedPostListReducer = (state = {}, action)=>{
    switch(action.type){
        case NESTED_POST_LIST_REQUEST:
            return {loading: true};
        case NESTED_POST_LIST_SUCCESSFUL:
            return {loading: false, nestedPosts: action.payload};
        case NESTED_POST_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const relatedPostListReducer = (state = {}, action)=>{
    switch(action.type){
        case RELATED_POST_LIST_REQUEST:
            return {loading: true};
        case RELATED_POST_LIST_SUCCESSFUL:
            return {loading: false, relatedPosts: action.payload};
        case RELATED_POST_LIST_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postByCatListReducer = (state = {}, action)=>{
    switch(action.type){
        case SHOW_POST_BY_CAT_REQUEST:
            return {loading: true};
        case SHOW_POST_BY_CAT_SUCCESSFUL:
            return {loading: false, postsByCat: action.payload};
        case SHOW_POST_BY_CAT_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postPinningToHomeReducers = (state = {}, action)=>{
    switch(action.type){
        case PIN_TO_HOME_REQUEST:
            return {loading: true};
        case PIN_TO_HOME_SUCCESSFUL:
            return {loading: false, success: true};
        case PIN_TO_HOME_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const postPinningReducers = (state = {}, action)=>{
    switch(action.type){
        case PIN_REQUEST:
            return {loading: true};
        case PIN_SUCCESSFUL:
            return {loading: false, success: true};
        case PIN_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const homePostListReducers = (state = {}, action)=>{
    switch(action.type){
        case GET_HOME_POSTS_REQUEST:
            return {loading: true};
        case GET_HOME_POSTS_SUCCESSFUL:
            return {loading: false, posts: action.payload};
        case GET_HOME_POSTS_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const userPostStatReducers = (state = {}, action)=>{
    switch(action.type){
        case POST_STAT_PER_USER_REQUEST:
            return {loading: true};
        case POST_STAT_PER_USER_SUCCESSFUL:
            return {loading: false, posts: action.payload};
        case POST_STAT_PER_USER_FAILED:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};