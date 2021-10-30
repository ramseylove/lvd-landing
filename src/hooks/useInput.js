import { useEffect, useState } from "react";


const useInput = (key, validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(enteredValue)
//   const [valueIsValid, setValueIsValid] = useState(false)

//   useEffect(() => {
//       const timerId = setTimeout(() => {
//         if (validateValue(enteredValue)){
//             setValueIsValid(true)
//         }
//       }, 500)
//       return () => {
//           clearTimeout(timerId)
//       }
//   }, [enteredValue])
  
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;  

  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError: hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;