import { ReactNode } from "react";

export interface ErrorBoundaryProps {
    error: boolean;
    updateError: (str: boolean) => void;
    updateInput: (str: string) => void;
    updateNavigation: (num: number) => void;
    children: ReactNode;
  }
  
  export interface ErrorBoundaryState {
    hasError: boolean;
  }