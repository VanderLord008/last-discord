import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    friendsLayout: true,
    serverLayout: false,
  },
  reducers: {
    setLayout: (state, action) => {
      state.friendsLayout = action.payload.friendsLayout;
      state.serverLayout = action.payload.serverLayout;
    },
  },
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
