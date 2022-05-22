import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { userConversationHistoryReducer, userDetailReducer, userListReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { nestedPostListReducer, postByCatListReducer, postCommentDeletingReducers, postCommentEditingReducers, postCommentPostingReducers, postCreatingReducers, postDeletingReducers, postDetailsReducers, postEditingReducers, postFilteringReducers, postKeywordsAddingReducer, postKeywordsRemovingReducer, postListReducers, postSearchingReducers, postSortingReducers, relatedPostListReducer } from './reducers/postReducer';
import { categoryListReducer } from './reducers/categoryReducer';
import { feedbackListReducer, userFeedbackListReducer } from './reducers/feedbackReducer';
import { imageSearchListReducer, userImageSearchListReducer } from './reducers/imageSearchReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [],    
        paymentMethod: 'Cash',
        shippingAddress: localStorage.getItem('shippingAddress'),
    }
};

const reducer = combineReducers({
    userSignup: userSignupReducer,
    userSignin: userSigninReducer,
    userList: userListReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,

    postCreating: postCreatingReducers,//#streak #1
    postList: postListReducers,
    postDetails: postDetailsReducers,
    postEditing: postEditingReducers,
    postDeleting: postDeletingReducers,
    postCommentPosting: postCommentPostingReducers,
    postComemntEditing: postCommentEditingReducers,
    postCommentDeleting: postCommentDeletingReducers,
    postSearching: postSearchingReducers,
    postSorting: postSortingReducers,
    postFiltering: postFilteringReducers,
    // streak 2-3: building post UI I guess
    categoryList: categoryListReducer, //streak #4? implementing text editor

    //streak #5
    postKeywordsAdding: postKeywordsAddingReducer,
    postKeywordsRemoving: postKeywordsRemovingReducer,
    nestedPostList: nestedPostListReducer,
    relatedPostList: relatedPostListReducer,

    //streak #6
    postByCatList: postByCatListReducer,

    //streak 7, 8, 9
    conversation: userConversationHistoryReducer,

    //streak ??? too many streaks on both projects (this and the chatbot), didn't count
    feedbackList: feedbackListReducer,
    userFeedbackList: userFeedbackListReducer,
    imageSearchList: imageSearchListReducer,
    userImageSearchList: userImageSearchListReducer,
    

})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
