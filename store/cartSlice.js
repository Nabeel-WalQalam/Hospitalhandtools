import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.Slug === action.payload.Slug
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.Slug === action.payload);
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.Slug === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state, action) => {
      localStorage.removeItem("cart");
      state.cart = [];
    },

    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.Slug !== action.payload
      );
      state.cart = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    buyNow: (state, action) => {
      state.cart = [];

      state.cart.push({ ...action.payload, quantity: 1 });

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCart,
  buyNow,
} = cartSlice.actions;

export default cartSlice.reducer;
