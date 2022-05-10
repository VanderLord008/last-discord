import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../app/userSlice";
import db, { auth } from "../firebase";
import classes from "./LoginPage.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import LogIn from "../UI/LogIn";
import SignUp from "../UI/SignUp";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("user is ", user);
      dispatch(userActions.logIn(user.email));
    } else {
      console.log("user is ", user);
      dispatch(userActions.logOut());
    }
  });

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogIn, setShowLogIn] = useState(true);

  const signUpShower = () => {
    setShowSignUp(!showSignUp);
    setShowLogIn(!showLogIn);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.welcomeText}>
          <p>Welcome back</p>
          <span> We're are so excited to see you again!</span>
        </div>
        <div className={classes.loginItems}>
          {showLogIn && <LogIn signUpShower={signUpShower} />}
          {showSignUp && <SignUp signUpShower={signUpShower} />}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
