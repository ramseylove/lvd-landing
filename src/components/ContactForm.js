import React, { useState } from "react";
import useInput from "../hooks/useInput";
import Modal from "./Modal";
import { send } from "emailjs-com";

import classes from "./ContactForm.module.css";
import Success from "./Success";

const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line


function ContactForm(props) {
  const {
    value: enteredName,
    successValue: successName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueInputChangeHandler: nameChangeHandler,
    valueInputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput("name", (value) => value.trim() !== "");

  const {
    value: enteredEmail,
    successValue: successEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput("email", (value) => emailValidator.test(value));

  const {
    value: enteredMessage,
    successValue: successMessage,
    isValid: enteredMessageIsValid,
    hasError: messageInputHasError,
    valueInputChangeHandler: messageChangeHandler,
    valueInputBlurHandler: messageBlurHandler,
    reset: resetMessageinput,
  } = useInput('message', (value) => value.length < 1000);

  // const [formIsValid, setFormIsValid] = useState(false)
  const [sentEmail, setSentEmail] = useState(false);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredMessageIsValid){
    formIsValid = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sentEmail === false && formIsValid) {
      const toSend = {
        from_name: enteredName,
        to_name: "LVD",
        message: enteredMessage,
        reply_to: enteredEmail,
      };
      send(
        "service_er9x52t",
        "template_cuqscfs",
        toSend,
        "user_cGRIA9XUR6BUcDj6IeZrA"
      )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          props.onSuccess("Email was Sent Successfully");
          setSentEmail(true);
          resetNameInput();
          resetEmailInput();
          resetMessageinput();
        })
        .catch((err) => {
          console.log("FAILED", err);
        });
    }
  };

  const nameInputClasses = !nameInputHasError
    ? classes.form_control
    : classes.form_control + ' ' + classes.invalid;

  const emailInputClasses = !emailInputHasError
    ? classes.form_control
    : classes.form_control + ' ' + classes.invalid;

  const messageInputClasses = !messageInputHasError
    ? classes.form_control
    : classes.form_control + ' ' + classes.invalid;

  return (
    <Modal onClose={props.onClose}>
      {sentEmail === true ? (
        <Success name={successName} email={successEmail} message={successMessage} />
      ) : (
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <div className={nameInputClasses}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              aria-describedby="name"
            />
          </div>
          {nameInputHasError && (
        <p className={classes.error_text}>Name must not be empty</p>
          )}
          <div className={emailInputClasses}>
            <label htmlFor="inputEmail">Email address</label>
            <input
              name="email"
              type="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              aria-describedby="email"
            />
          </div>
          {emailInputHasError && <p className={classes.error_text}>This email is not valid</p>}
          <div className={messageInputClasses}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={enteredMessage}
              rows="5"
              aria-describedby="messageField"
              onChange={messageChangeHandler}
              onBlur={messageBlurHandler}
            ></textarea>
          </div>
          {messageInputHasError && <p className={classes.error_text}>Message has too many Characters. 1000 max</p>}
          <div className={classes.actions}>
          <button type="submit" className={classes.submitButton}>
            Submit
          </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export default ContactForm;
