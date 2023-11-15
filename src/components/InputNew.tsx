import React from 'react';
import '../style/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setInputValue } from '../slices/appSlice';

function Input() {
  const dispatch = useDispatch();
  const inputValue = useSelector((state: RootState) => state.app.inputValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    localStorage.setItem('inputValue', newValue);
    dispatch(setInputValue(newValue));
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
