import { useState } from 'react';

const useCustomForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return [values, handleInputChange, reset];
};

export default useCustomForm;
