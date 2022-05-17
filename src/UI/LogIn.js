import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../app/userSlice";
import { auth } from "../firebase";
import classes from './Login.module.css'

const LogIn = (props) => {
  const dispatch = useDispatch();
const [warning, setWarning] = useState('')
const [buttonState, setButtonState] = useState(false)

  const logInHandler = (e) => {
    e.preventDefault();
    setButtonState(true)

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
        console.log(errorCode);
        const errorMessage = error.message;
        console.log( errorMessage);
        setWarning( 'email or password is not valid');
        setButtonState(false)
        // ..
      });
  };

  return (
    <form onSubmit={logInHandler}>
      <p>Email</p>
      <input placeholder="email"></input>
      <p>{warning}</p>
      <p>Password</p>
      <input placeholder="password"></input>
      <div className={classes.loginButton}>
      <button type="submit" disabled={buttonState} className={buttonState? classes.disabledButton : classes.enabledButton }
      >{!buttonState ? `login` : `processing`}</button>
      </div>
      <div className={classes.infoText}>
        Need an account? <span onClick={props.signUpShower}>Register Now</span>
      </div>
    </form>
  );
};

export default LogIn;
