import React from 'react';
import '../style/style.css';
import { IInputNew } from '../types/types';

class Input extends React.Component<IInputNew> {
  constructor(props: IInputNew) {
    super(props);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    this.props.updateInput(newValue);
  };

  render() {
    return (
      <>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.props.input}
          className="input"
        />
      </>
    );
  }
}

export default Input;
