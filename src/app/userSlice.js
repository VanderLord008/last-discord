import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userEmail: null,
    isLoggedIn: false,
  },
  reducers: {
    logIn(state, action) {
      state.userEmail = action.payload;
      state.isLoggedIn = true;
    },
    logOut(state, action) {
      state.userEmail = null;
      state.isLoggedIn = false;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
