import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import db from "../firebase";
import classes from "./PrivateChat.module.css";

const PrivareChat = () => {
  //getting the current user's email from the redux store
  const userEmail = useSelector((state) => state.user.userEmail);
  console.log(userEmail);

  const friendRequestHandler = (e) => {
    e.preventDefault();
    const friendEmail = e.target[0].value;
    const senderEmail = userEmail;

    //adding a friend request object to the friend's firestore
    db.collection("users").doc(friendEmail).collection("friendRequests").add({
      senderEmail: senderEmail,
      status: "pending",
      requestId: uuid(),
    });
  };

  //setting up the state for the requests
  const [requests, setRequests] = useState([]);

  //reflecting any changes in the users friendship collection on the firestore
  useEffect(() => {
    db.collection("users")
      .doc(userEmail)
      .collection("friendRequests")
      .onSnapshot((snapshot) =>
        setRequests(snapshot.docs.map((doc) => doc.data()))
      );
  }, [userEmail]);

  //accepting the request
  const requestAccepter = (props) => {
    //updating the requests status from pending to accepted
    db.collection("users")
      .doc(userEmail)
      .collection("friendRequests")
      .where("requestId", "==", props.requestId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.update({
          status: "accepted",
        });
      });

    //adding that request sender to the users friend list
    db.collection("users").doc(userEmail).collection("friends").add({
      friendEmail: props.senderEmail,
    });
    //adding user to the request sender's friend list
    db.collection("users").doc(props.senderEmail).collection("friends").add({
      friendEmail: userEmail,
    });

    // db.collection("users").doc(userEmail).collection("friends").doc(props.senderEmail).add({
    //   messages:
    // })
  };

  //declining the request
  const requestDecliner = (props) => {
    //deleting the request after finding the request with the help of a where clause
    db.collection("users")
      .doc(userEmail)
      .collection("friendRequests")
      .where("requestId", "==", props.requestId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  };
  const friendSelected = useSelector((state) => state.friend.friendEmail);

  const dmSender = (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    console.log(friendSelected);
    //adding the message to the senders firestore
    db.collection("users")
      .doc(userEmail)
      .collection("friends")
      .doc(friendSelected)
      .collection("messages")
      .add({
        message: message,
        sentBy: userEmail,
        sentTo: friendSelected,
      });

    db.collection("users")
      .doc(friendSelected)
      .collection("friends")
      .doc(userEmail)
      .collection("messages")
      .add({
        message: message,
        sentBy: userEmail,
        sentTo: friendSelected,
      });
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (friendSelected) {
      db.collection("users")
        .doc(userEmail)
        .collection("friends")
        .doc(friendSelected)
        .collection("messages")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [friendSelected, userEmail]);

  const [serverInvites, setServerInvites] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(userEmail)
      .collection("serverInviteRequests")
      .onSnapshot((snapshot) =>
        setServerInvites(snapshot.docs.map((doc) => doc.data()))
      );
  }, [userEmail]);

  const [mmembers, setMmembers] = useState([]);

  const serverInviteAccepter = (props) => {
    //updating the requests status from pending to accepted
    // db.collection("users")
    // .doc(userEmail)
    // .collection("serverInviteRequests")
    // .where("requestId", "==", props.requestId)
    // .get()
    // .then((querySnapshot) => {
    //   querySnapshot.docs[0].ref.update({
    //     status: "accepted",
    //   });
    // });

    db.collection("servers")
      .where("serverId", "==", props.InvitedServerId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0]
          .data()
          .members.forEach((memb) => setMmembers(mmembers.push(memb)));
      });

    setMmembers(mmembers.push(userEmail));

    console.log("now are ", mmembers);

    db.collection("servers")
      .where("serverId", "==", props.InvitedServerId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.update({
          members: mmembers,
        });
      });
  };

  // useEffect(() => {
  //   db.collection("servers")
  //     .doc(serverSelected)
  //     .collection("serverInviteRequests")
  //     .onSnapshot((snapshot) =>
  //       setServerInvites(snapshot.docs.map((doc) => doc.data()))
  //     );
  // }, [userEmail]);

  const serverInviteDecliner = () => {};

  return (
    <>
      <div className={classes.container}>
        PrivareChat
        {!friendSelected && (
          <div className="friendRequestModal">
            <form onSubmit={friendRequestHandler}>
              who do you want to a friend request? enter their email here
              <input type="text" placeholder="email" />
            </form>
            <div className="requests">
              pending requests are
              {requests.map(
                (request) =>
                  request.status === "pending" && (
                    <div className="">
                      <li>
                        sender's email is {request.senderEmail} status is{" "}
                        {request.status}
                      </li>
                      <button onClick={() => requestAccepter(request)}>
                        Accept
                      </button>
                      <button onClick={() => requestDecliner(request)}>
                        Decline
                      </button>
                    </div>
                  )
              )}
            </div>
            <div className="serverInvites">
              your pending server invites are
              {serverInvites.map(
                (invite) =>
                  invite.status === "pending" && (
                    <div className="">
                      <li>
                        sender's email is {invite.senderEmail} status is{" "}
                        {invite.status}
                      </li>
                      <button onClick={() => serverInviteAccepter(invite)}>
                        Accept
                      </button>
                      <button onClick={() => serverInviteDecliner(invite)}>
                        Decline
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        {/* if a friend is selected */}
        {friendSelected && (
          <div className="div">
            you are talking to {friendSelected}
            <form onSubmit={dmSender}>
              <input type="text" />
            </form>
            {messages.map((message) => (
              <li>
                {" "}
                {message.sentBy} said to {message.sentTo} : {message.message}{" "}
              </li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PrivareChat;
