import React, { useState } from "react";
import Modal from "./Modal";
import { send } from "emailjs-com";

import classes from "./ContactForm.module.css";
import Success from "./Success";

function ContactForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sentEmail === false) {
      const toSend = {
        from_name: name,
        to_name: "LVD",
        message: message,
        reply_to: email,
      };
      send(
        "service_er9x52t",
        "template_cuqscfs",
        toSend,
        "user_cGRIA9XUR6BUcDj6IeZrA"
      )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          //   setName('')
          //   setEmail('')
          //   setMessage('')
          //   setSentEmail(true);
          props.onSuccess("Email was Sent Successfully");
          setSentEmail(true);
        })
        .catch((err) => {
          console.log("FAILED", err);
        });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Modal onClose={props.onClose}>
      {sentEmail === true ? (
        <Success name={name} email={email} message={message} />
      ) : (
        <form id="contact-form" onSubmit={handleSubmit} method="POST">
          <div className={classes.form_group}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              aria-describedby="name"
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="inputEmail">Email address</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              aria-describedby="email"
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              value={message}
              rows="5"
              aria-describedby="emailHelp"
              onChange={handleMessageChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </Modal>
  );
}

export default ContactForm;
