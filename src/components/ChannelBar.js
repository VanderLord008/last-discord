import React, { useEffect, useState } from "react";
import db from "../firebase";
import classes from "./ChannelBar.module.css";
import { useSelector } from "react-redux";
import Channel from "./Channel";
import { v4 as uuid } from "uuid";

const ChannelBar = () => {
  const serverName = useSelector((state) => state.server.serverName);
  const serverId = useSelector((state) => state.server.serverId);
  const userEmail = useSelector((state) => state.user.userEmail);

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (serverName) {
      db.collection("servers")
        .doc(serverName)
        .collection("channels")
        .onSnapshot((snapshot) =>
          setChannels(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [serverName, serverId]);

  const addChannelHandler = () => {
    const channelName = prompt("enter a new channel");
    if (channelName) {
      db.collection("servers").doc(serverName).collection("channels").add({
        channelName: channelName,
        channelId: uuid(),
      });
    }
  };

  const serverInviteHandler = (e) => {
    const invitedPerson = prompt("who do you want to invite");

    e.preventDefault();

    const senderEmail = userEmail;

    //adding a server invite request object to the friend's firestore
    db.collection("users")
      .doc(invitedPerson)
      .collection("serverInviteRequests")
      .add({
        senderEmail: senderEmail,
        status: "pending",
        requestId: uuid(),
        InvitedServerId: serverId,
      });
  };

  return (
    <div className={classes.container}>
      <div className="addChannel" onClick={addChannelHandler}>
        +
      </div>
      {channels.map((channel) => (
        //channel.channelName
        <Channel
          channelName={channel.channelName}
          channelId={channel.channelId}
        />
      ))}
      <div className="serverInvitation">
        <button onClick={serverInviteHandler}>invite others</button>
      </div>
    </div>
  );
};

export default ChannelBar;
