import { useRef, useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  };

  const setValue = (name, value) => {
    setValues({...values, [name]: value});
  };

  const onSubmit = event => {
    event && event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    setValue,
    values
  };
};

export const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => { htmlElRef.current &&  htmlElRef.current.focus() }

  return [ htmlElRef, setFocus ]
};
