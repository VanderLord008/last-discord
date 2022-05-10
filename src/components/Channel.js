import React from "react";
import { useDispatch } from "react-redux";
import { channelActions } from "../app/channelSlice";
import classes from "./Channel.module.css";

const Channel = (props) => {
  const dispatch = useDispatch();
  const channelSelector = () => {
    dispatch(
      channelActions.setChannelInfo({
        channelId: props.channelId,
        channelName: props.channelName,
      })
    );
  };

  return (
    <div className={classes.container} onClick={channelSelector}>
      {props.channelName}
    </div>
  );
};

export default Channel;
