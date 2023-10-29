import React from 'react';
import { IErrorButton } from '../types/types';

class ErrorButton extends React.Component<IErrorButton> {
  constructor(props: IErrorButton) {
    super(props);
  }

  render() {
    return (
      <button className='button-error' onClick={() => this.props.updateError(true)}>Ошибка</button>
    );
  }
}

export default ErrorButton;