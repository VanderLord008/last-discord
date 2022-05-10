import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import db, { auth } from "../firebase";

const SignUp = (props) => {
  const signUpHandler = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    auth.createUserWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };
  return (
    <form onSubmit={signUpHandler}>
      <p>Email</p>
      <input placeholder="email"></input>
      <p>Password</p>
      <input placeholder="password"></input>
      <button type="submit">sign Up</button>
      <span onClick={props.signUpShower}>already have an account?</span>
    </form>
  );
};

export default SignUp;
