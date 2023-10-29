import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types/types';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false};
  }

  static getDerivedStateFromError(error: Error) {
    console.error(error);
  }

  componentDidCatch(error: Error) {
    console.error(error)
  }

  updateErrors = (newEr: boolean) => {
    this.setState({ hasError: newEr });
  };

  render() {
    if (this.props.error) {
      return <div className='error-container'>Ошибка</div>;
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
