import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types/componentsTypes';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
  }

  componentDidCatch(error: Error) {
    console.error(error);
  }

  updateErrors = (newEr: boolean) => {
    this.setState({ hasError: newEr });
  };

 closeDetail = () => {
  this.props.updateError(false);
  localStorage.setItem('inputValue', '');
  this.props.updateInput('');
  this.props.updateNavigation(1);
  };


  render() {
    if (this.props.error) {
      return <>
        <div className="error-container">Ошибка</div>
        <button className="btn-close" type="button" onClick={this.closeDetail}>
        Назад
        </button>
      </>
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
