import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {drinkListReducer, drinksDetailReducer} from './reducers/drinkReducer';
import { userDetailReducer, userListReducer, userSigninReducer, userSignupReducer, userUpdateProfileReducer } from './reducers/userReducer';
import {cartReducer} from './reducers/cartReducer';

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
    drinkList: drinkListReducer,
    userSignup: userSignupReducer,
    userSignin: userSigninReducer,
    userList: userListReducer,
    cart: cartReducer,
    drinkDetail: drinksDetailReducer,
    userDetail: userDetailReducer,
    userUpdateProfile: userUpdateProfileReducer,
    
})


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk)));

export default store;
