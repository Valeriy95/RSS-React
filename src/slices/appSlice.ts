import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import store from '../store/store';
import { IAppState } from './types/appSliceTypes';
import { IPokemonsResults, Pokemon } from '../API/types/apiTypes';

const initialState: IAppState = {
  inputValue: localStorage.getItem('inputValue') || '',
  inputCurrentValue: localStorage.getItem('inputValue') || '',
  detailData: null,
  data: [],
  loading: false,
  arrAllPages: [],
  page: 1,
  itemAllPages: 10,
  lastPage: 130,
  error: false,
  isClosed: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setDetailData: (state, action: PayloadAction<Pokemon | null>) => {
      state.detailData = action.payload;
    },
    setData: (
      state,
      action: PayloadAction<IPokemonsResults[] | Pokemon>,
    ) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setArrAllPages: (state, action: PayloadAction<number[]>) => {
      state.arrAllPages = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setItemAllPages: (state, action: PayloadAction<number>) => {
      state.itemAllPages = action.payload;
    },
    setLastPage: (state, action: PayloadAction<number>) => {
      state.lastPage = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setIsClosed: (state, action: PayloadAction<boolean>) => {
      state.isClosed = action.payload;
    },
    setInputCurrentValue: (state, action: PayloadAction<string>) => {
      state.inputCurrentValue = action.payload;
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const {
  setInputValue,
  setDetailData,
  setData,
  setLoading,
  setArrAllPages,
  setPage,
  setItemAllPages,
  setLastPage,
  setError,
  setIsClosed,
  setInputCurrentValue,
} = appSlice.actions;

export default appSlice.reducer;
