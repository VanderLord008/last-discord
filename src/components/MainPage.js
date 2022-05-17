import React, { useState } from "react";
import { auth } from "../firebase";
import FriendsBar from "./FriendsBar";
import MainHeader from "./MainHeader";
import PrivareChat from "./PrivareChat";
import ServerBar from "./ServerBar";
import classes from "./MainPage.module.css";
import ChannelBar from "./ChannelBar";
import ServerChat from "./ServerChat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { friendActions } from "../app/friendSlice";

const MainPage = () => {
  const signOut = () => {
    auth.signOut().catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };
  const [showHomeLayout, setShowHomeLayout] = useState(true);
  const friendSelected = useSelector((state) => state.friend.friendSelected);
  const dispatch = useDispatch();

  const homeLayout = () => {
    setShowHomeLayout(true);
    dispatch(
      friendActions.setFriendInfo({
        friendEmail: null,
        friendSelected: false,
      })
    );
  };

  const serverLayout = () => {
    setShowHomeLayout(false);
  };
  return (
    <><div className={classes.wrapper}>
      <ServerBar showHomeLayout={homeLayout} showServerLayout={serverLayout} />
      {showHomeLayout && <FriendsBar />}
      {showHomeLayout && <PrivareChat />}
      {showHomeLayout === false && <ChannelBar />}
      {showHomeLayout === false && <ServerChat />}
    </div><button onClick={signOut}>Logout</button></>
  );
};

export default MainPage;
