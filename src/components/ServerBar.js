import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layoutActions } from "../app/layoutSlice";
import db, { auth } from "../firebase";
import classes from "./ServerBar.module.css";
import ServerIcon from "./ServerIcon";
import { v4 as uuid } from "uuid";
import { logDOM } from "@testing-library/react";

const ServerBar = (props) => {
  const userEmail = useSelector((state) => state.user.userEmail);

  const addServerHandler = () => {
    const serverName = prompt("enter a new server");
    if (serverName) {
      const user = auth.currentUser;
      db.collection("servers").add({
        serverName: serverName,
        serverId: uuid(),
        createdBy: userEmail,
        members: [userEmail],
      });
    }
  };

  const [servers, setServers] = useState([]);

  //dont ask me how it works. it just does. DO NOT DELETE
  var sad = db.collection("servers").get();

  useEffect(() => {
    db.collection("servers")
      .where("members", "array-contains", userEmail)
      .get()
      .then((snapshot) =>
        setServers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            server: doc.data(),
          }))
        )
      );
  }, [userEmail, sad]);

  //   const serverRenderer=  (doc)=>{
  // console.log(doc.data());
  //  setServers({
  //   key: doc.data().serverId,
  //   id: doc.data().serverId,
  //   serverName: doc.data().serverName,
  //   serverId: doc.data().serverId,

  // }
  // )
  // console.log('servers now are');
  // console.log(servers);
  //   }

  //   useEffect(() => {

  // db.collection("servers").get().then((snapshot)=>{
  //   snapshot.docs.map((doc)=>{
  //     if(doc.data().createdBy===userEmail){

  //       serverRenderer(doc)

  //     }
  //   })
  // })
  //   }, [userEmail]);

  // await _users.doc(id).get().then((doc){
  //   if(doc.exists){
  //     doc.data().forEach((key, value) {
  //       if(key == 'field'){
  //         var valueOfField = value;
  //       }
  //     });
  //   }

  return (
    <div className={classes.container}>
      <div className="container__top"></div>
      <div className={classes.addIcon} onClick={props.showHomeLayout}>
        T
      </div>
      <div className={classes.addIcon} onClick={addServerHandler}>
        +
      </div>

      {servers.map(({ id, server }) => (
        <ServerIcon
          key={id}
          id={id}
          serverName={server.serverName}
          serverId={server.serverId}
          showServerLayout={props.showServerLayout}
        />
      ))}
    </div>
  );
};

export default ServerBar;
 