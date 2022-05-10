import { createSlice } from "@reduxjs/toolkit";

export const serverSlice = createSlice({
  name: "server",
  initialState: {
    serverId: null,
    serverName: null,
  },
  reducers: {
    setServerInfo: (state, action) => {
      state.serverId = action.payload.serverId;
      state.serverName = action.payload.serverName;
    },
  },
});

export const serverActions = serverSlice.actions;
export default serverSlice.reducer;
