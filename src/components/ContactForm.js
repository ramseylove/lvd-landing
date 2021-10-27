import React, { useState } from "react";
import Modal from "./Modal";

import classes from "./ContactForm.module.css";

function ContactForm(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted");
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
    </Modal>
  );
}

export default ContactForm;
