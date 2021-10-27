import React from "react";
// import Modal from "./Modal";

import styles from "./Success.module.css";

const Success = (props) => {
  return (
    <div>
      <h2>Email Sent Successfully</h2>
      <p>Name: {props.name}</p>
      <p>Email: {props.email}</p>
      <p>Your Message: {props.message}</p>
    </div>
  );
};

export default Success;
