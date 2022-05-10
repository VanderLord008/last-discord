import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import serverReducer from "./serverSlice";
import layoutReducer from "./layoutSlice";
import channelReducer from "./channelSlice";
import friendReducer from "./friendSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    server: serverReducer,
    channel: channelReducer,
    layout: layoutReducer,
    friend: friendReducer,
  },
});

export default store;
