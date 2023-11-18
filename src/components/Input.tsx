import React from 'react';
import '../style/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setInputCurrentValue } from '../slices/appSlice';

function Input() {
  const dispatch = useDispatch();
  const inputCurrentValue = useSelector((state: RootState) => state.app.inputCurrentValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    dispatch(setInputCurrentValue(newValue));
  };

  return (
    <>
      <input
        type="text"
        onChange={handleInputChange}
        value={inputCurrentValue}
        className="input"
      />
    </>
  );
}

export default Input;
