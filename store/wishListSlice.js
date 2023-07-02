import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addProductWishList: (state, action) => {
      const itemInCart = state.wishList.find(
        (item) => item._id === action.payload._id
      );
      if (!itemInCart) {
        state.wishList.push(action.payload);
      }
    },
    removeProductWishList: (state, action) => {
      console.log("payload", action.payload.$oid);
      const removeItem = state.wishList.filter(
        (item) => item._id.$oid !== action.payload
      );
      state.wishList = removeItem;
      // console.log(action.payload);
      // return state.product.filter((product) => product._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductWishList, removeProductWishList } =
  wishListSlice.actions;

export default wishListSlice.reducer;
