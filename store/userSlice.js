import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  active: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload) {
        if (action.payload.role === "admin") {
          state.active = true;
        }
      } else {
        state.active = false;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
