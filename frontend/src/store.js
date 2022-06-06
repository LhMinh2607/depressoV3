import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { botMessageCountReducer, messageStatReducers, userConversationHistoryReducer, userDetailReducer, userFriendAddingReducer, userListReducer, userMessageCountReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { homePostListReducers, nestedPostListReducer, postAccumulatingReducers, postByCatListReducer, postCommentDeletingReducers, postCommentEditingReducers, postCommentPostingReducers, postCreatingReducers, postDeletingReducers, postDetailsReducers, postEditingReducers, postFilteringReducers, postKeywordsAddingReducer, postKeywordsRemovingReducer, postListReducers, postPinningReducers, postPinningToHomeReducers, postSearchingReducers, postSortingReducers, postStatReducers, relatedPostListReducer, userPostStatReducers } from './reducers/postReducer';
import { categoryListReducer } from './reducers/categoryReducer';
import { feedbackListReducer, userFeedbackListReducer } from './reducers/feedbackReducer';
import { imageSearchListReducer, userImageSearchListReducer } from './reducers/imageSearchReducer';
import { cancelCallReducer, historyListReducer, loggingACallReducer, makingACallReducer, updatingACallReducer } from './reducers/callingReducers';
import { contactDetailReducer, contactEditingReducer, contactListReducer, contactRemovingReducer, contactSavingReducer, contactSearchingReducer } from './reducers/contactReducers';
import { notificationAddingReducers, notificationListReducers } from './reducers/notificationReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    // postDetails: {
    //     post: localStorage.getItem('userLSP')
    //     ? JSON.parse(localStorage.getItem('userLSP'))
    //     : "nothing",
    // }
    
    // cart:{
    //     cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [],    
    //     paymentMethod: 'Cash',
    //     shippingAddress: localStorage.getItem('shippingAddress'),
    // }
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

    //STEREAK??
    postPinningToHome: postPinningToHomeReducers,
    postPinning: postPinningReducers,
    homePostList: homePostListReducers,
    messageStat: messageStatReducers, //a full report of message statistic
    userPostStat: userPostStatReducers, //a full report of user posts statistic


    //
    callingStatus: makingACallReducer,
    loggingACall: loggingACallReducer,
    cancelingCall: cancelCallReducer,
    contactSaving: contactSavingReducer,
    contactList: contactListReducer,
    contactDetail: contactDetailReducer,
    historyList: historyListReducer,
    updatingACall: updatingACallReducer,
    contactEditing: contactEditingReducer,
    contactRemoving: contactRemovingReducer,
    contactSearching: contactSearchingReducer,

    //
    postStat: postStatReducers,

    //
    notificationAdding: notificationAddingReducers,
    notificationList: notificationListReducers,
    userFriendAdding: userFriendAddingReducer,

    //
    postAccumulating: postAccumulatingReducers,
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
