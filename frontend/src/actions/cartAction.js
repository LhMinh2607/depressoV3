import Axios from 'axios';
import { CART_ADDED_ITEM, CART_ADDED_ITEM_FAILED, CART_REMOVED_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConst';
import {
} from '../constants/cartConst';

export const addToCart = (drinkId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/drink/${drinkId}`);
  const {
    cart: { cartItems },
  } = getState(); 
    dispatch({
      type: CART_ADDED_ITEM,
      payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        //countInStock: data.countInStock,
        drink: data._id,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
};

export const removeFromCart = (drinkId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVED_ITEM, payload: drinkId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};