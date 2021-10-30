import { useState } from "react";

const useInput = (key, validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [successValue, setSuccessValue] = useState("")
  
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;  

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
      setSuccessValue(enteredValue)
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    successValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;