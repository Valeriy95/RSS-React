import React, { useContext } from 'react';
import '../style/style.css';
import { Context } from '../App';

function Input() {

  const {inputValue, updateInput} = useContext(Context)!;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    localStorage.setItem('inputValue', newValue);
    updateInput(newValue);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputValue}
        className="input"
      />
    </>
  );
}

export default Input;
