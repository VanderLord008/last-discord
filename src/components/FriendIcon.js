import React from "react";
import { useDispatch } from "react-redux";
import { friendActions } from "../app/friendSlice";
import classes from "./FriendIcon.module.css";

const FriendIcon = (props) => {
  const dispatch = useDispatch();

  const friendSelector = () => {
    dispatch(
      friendActions.setFriendInfo({
        friendEmail: props.friendEmail,

        friendSelected: true,
      })
    );
  };

  return (
    <div className={classes.container} onClick={friendSelector}>
      {props.friendEmail}
    </div>
  );
};

export default FriendIcon;
