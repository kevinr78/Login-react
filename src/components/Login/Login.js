import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { emailVal: action.value, isValid: action.value.includes("@") };

    case "IS_VALID":
      return {
        emailVal: state.emailVal,
        isValid: state.emailVal.includes("@"),
      };

    default:
      return { emailVal: "", isValid: null };
  }
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return {
        passwordVal: action.value,
        isValid: action.value.trim().length > 6,
      };
    case "IS_VALID":
      return {
        passwordVal: state.passwordVal,
        isValid: state.passwordVal.trim().length > 6,
      };

    default:
      break;
  }
};

const Login = (props) => {
  /*  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(); */
  /* const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(); */
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    emailVal: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    passwordVal: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("form valid");
      setFormIsValid(emailState.isValid && password.isValid);
    }, 800);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [emailState.isValid, password.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    /*     setEmailIsValid(enteredEmail.includes("@"));
     */
    dispatchEmail({ type: "IS_VALID" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "IS_VALID" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailVal, password.passwordVal);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailVal}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password.passwordVal}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
