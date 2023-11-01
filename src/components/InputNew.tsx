import React from 'react';
import '../style/style.css';
import { IInputNew } from '../types/types';

function Input (props: IInputNew)  {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    localStorage.setItem('inputValue', newValue);
    props.updateInput(newValue);
  };

    return (
      <>
        <input
          type="text"
          onChange={handleInputChange}
          value={props.input}
          className="input"
        />
      </>
    );
}

export default Input;
