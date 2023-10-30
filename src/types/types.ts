import { ReactNode } from "react";

export interface IPeople {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}

export interface IPerson {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface MyComponentState {
    inputValue: string;
    data: IPerson[]; 
    loading: boolean;
    arrAllPages: number[]; 
    page: number;
    error: boolean,
}

export interface IInputNew {
  input: string;
  updateInput: (newInput: string) => void;
}

export interface IButtonSearch {
  input: string;
  updateLoading: (newLoading: boolean) => void;
  updateData: (newData: IPerson[]) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
}

export interface IItemPerson {
  data: IPerson[]
}

export interface IButtonPage {
  arrAllPages: number[];
  page: number;
  input: string;
  updateLoading: (newLoading: boolean) => void;
  updateData: (newData: IPerson[]) => void;
  updateArrAllPages: (newArrAllPages: number[]) => void;
  updatePage: (newPage: number) => void;
}

export interface ErrorBoundaryProps {
  error: boolean;
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface IErrorButton {
  updateError: (newEr: boolean) => void
}