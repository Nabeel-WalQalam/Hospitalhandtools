import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";

const initialState = {
  searchProduct: [],
  query: "",
  category: "",
};

export const searchProductSlice = createSlice({
  name: "searechPoduct",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      // console.log("reducer", action.payload);
      state.searchProduct = action.payload;
    },
    setquery: (state, action) => {
      console.log("reducer", action.payload);
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct, setquery, setCategory } = searchProductSlice.actions;

export default searchProductSlice.reducer;
