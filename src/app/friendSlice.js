import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
  name: "friend",
  initialState: {
    friendEmail: null,
    friendSelected: false,
  },
  reducers: {
    setFriendInfo: (state, action) => {
      state.friendEmail = action.payload.friendEmail;
      state.friendSelected = action.payload.friendSelected;
    },
  },
});

export const friendActions = friendSlice.actions;
export default friendSlice.reducer;
