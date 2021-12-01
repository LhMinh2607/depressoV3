import { CART_ADDED_ITEM, CART_ADDED_ITEM_FAILED, CART_EMPTY, CART_REMOVED_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConst";

  export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
      case CART_ADDED_ITEM:
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.drink === item.drink);
        if (existItem) {
          return {
            ...state,
            error: '',
            cartItems: state.cartItems.map((x) =>
              x.drink === existItem.drink ? item : x
            ),
          };
        } else {
          return { ...state, error: '', cartItems: [...state.cartItems, item] };
        }
      case CART_REMOVED_ITEM:
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.filter((x) => x.drink !== action.payload),
        };
      case CART_SAVE_SHIPPING_ADDRESS:
        return { ...state, shippingAddress: action.payload };
      case CART_SAVE_PAYMENT_METHOD:
        return { ...state, paymentMethod: action.payload };
      case CART_ADDED_ITEM_FAILED:
        return { ...state, error: action.payload };
      case CART_EMPTY:
        return { ...state, error: '', cartItems: [] };
      default:
        return state;
    }
  };