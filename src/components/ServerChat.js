import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputBar from "./InputBar";
import classes from "./ServerChat.module.css";
import db from "../firebase";
import { v4 as uuid } from "uuid";

const ServerChat = () => {
  const channelName = useSelector((state) => state.channel.channelName);
  const channelId = useSelector((state) => state.channel.channelId);
  const serverName = useSelector((state) => state.server.serverName);
  const userEmail = useSelector((state) => state.user.userEmail);

  const messageAdder = (e) => {
    e.preventDefault();
    const message = e.target[0].value;

    if (channelName) {
      db.collection("servers")
        .doc(serverName)
        .collection("channels")
        .doc(channelName)
        .collection("messages")
        .add({
          message: message,
          messageId: uuid(),
          sentBy: userEmail,
        });
    }
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelName) {
      db.collection("servers")
        .doc(serverName)
        .collection("channels")
        .doc(channelName)
        .collection("messages")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelName, channelId, serverName]);

  return (
    <div className={classes.container}>
      {channelName}

      {channelName && <InputBar messageAdder={messageAdder} />}
      {channelName &&
        messages.map((message) => (
          //channel.channelName
          <li>
            content is "{message.message}" id is " {message.messageId}"{" "}
          </li>
        ))}
    </div>
  );
};

export default ServerChat;
