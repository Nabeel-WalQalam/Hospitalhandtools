import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import { setCart } from "./cartSlice";
import compareSlice from "./compareSlice";
import wishListSlice from "./wishListSlice";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    compare: compareSlice,
    wishList: wishListSlice,

    applyMiddleware: [thunkMiddleware],
  },
});

export const getUserData = () => {
  return (dispatch) => {
    if (localStorage.getItem("cart")) {
      try {
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log("cart", cart, typeof cart);
        dispatch(setCart(cart));
      } catch (error) {
        // console.log("cart error", error);
        localStorage.clear();
      }
    }

    // const userData = JSON.parse(localStorage.getItem("cart"));
  };
};
