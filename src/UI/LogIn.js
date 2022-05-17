import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../app/userSlice";
import { auth } from "../firebase";
import classes from './Login.module.css'

const LogIn = (props) => {
  const dispatch = useDispatch();

  const logInHandler = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        // dispatch(
        //   userActions.logIn({
        //     userEmail:user.email,
        //   })
        // )
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <form onSubmit={logInHandler}>
      <p>Email</p>
      <input placeholder="email"></input>
      <p>Password</p>
      <input placeholder="password"></input>
      <div className={classes.loginButton}>
      <button type="submit">Login</button>
      </div>
      <div className={classes.infoText}>
        Need an account? <span onClick={props.signUpShower}>Register Now</span>
      </div>
    </form>
  );
};

export default LogIn;
