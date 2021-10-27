import { useState } from "react";
import "./App.css";
import "./ContactForm";
import ContactForm from "./ContactForm";

function App() {
  const [contactIsShown, setContactIsShown] = useState(false);

  const showConactFormHandler = () => {
    setContactIsShown(true);
  };
  const hideContactFormHandler = () => {
    setContactIsShown(false);
  };

  const handleContactFormSuccess = (message) => {
    console.log(message);
  };

  return (
    <div>
      {contactIsShown && (
        <ContactForm
          onClose={hideContactFormHandler}
          onSuccess={handleContactFormSuccess}
        />
      )}
      <div className="background"></div>
      <div className="heading__container">
        <div className="heading">L. Valentine Designs</div>
        <h2 className="sub_heading">Coming Soon</h2>

        <button onClick={showConactFormHandler}>Contact Me</button>
      </div>
    </div>
  );
}

export default App;
