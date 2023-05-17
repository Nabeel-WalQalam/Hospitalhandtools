import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const compareSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const itemInCart = state.product.find(
        (item) => item._id === action.payload._id
      );
      if (!itemInCart) {
        state.product.push(action.payload);
      }
    },
    removeProduct: (state, action) => {
      const removeItem = state.product.filter(
        (item) => item._id !== action.payload
      );
      state.product = removeItem;
      // console.log(action.payload);
      // return state.product.filter((product) => product._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct } = compareSlice.actions;

export default compareSlice.reducer;
